import { Response } from "express";
import { CustomRequest } from "../types/custom";
import Blog from "../models/Blog";

export const getBlogs = async (req: CustomRequest, res: Response) => {
    try {
        const blogs = await Blog.find().populate("author", "username");
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch blogs" });
    }
};

export const getBlog = async (req: CustomRequest, res: Response) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findById(id).populate("author", "username");
        if (!blog) {
            res.status(404).json({ message: "Blog not found" });
            return;
        }
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch blog" });
    }
};

export const createBlog = async (req: CustomRequest, res: Response) => {
    const { title, content } = req.body;
    console.log("req.body", req.body);
    const image = req.file?.path;

    try {
        const blog = new Blog({
            title,
            content,
            image,
            author: req.userId,
        });
        await blog.save();
        res.status(201).json(blog);
    } catch (err) {
        console.log("err", err);
        res.status(500).json({ message: "Blog creation failed" });
    }
};

export const updateBlog = async (req: CustomRequest, res: Response) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const image = req.file?.path;

    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            res.status(404).json({ message: "Blog not found" });
            return;
        }

        if (blog.author.toString() !== req.userId) {
            res.status(403).json({ message: "Not authorized" });
            return;
        }

        blog.title = title;
        blog.content = content;
        if (image) blog.image = image;

        await blog.save();
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: "Blog update failed" });
    }
};

export const deleteBlog = async (req: CustomRequest, res: Response) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            res.status(404).json({ message: "Blog not found" });
            return;
        }

        if (blog.author.toString() !== req.userId) {
            res.status(403).json({ message: "Not authorized" });
            return;
        }

        await blog.deleteOne();
        res.json({ message: "Blog deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Blog deletion failed" });
    }
};
