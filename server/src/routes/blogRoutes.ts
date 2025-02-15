import express from "express";
import {
    getBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    getBlog,
} from "../controllers/blogController";
import auth from "../middleware/auth";
import { upload } from "../utils/upload";

const router = express.Router();

// Routes
router.get("/", getBlogs);

router.get("/:id", getBlog);
router.post("/", auth, upload.single("image"), createBlog);
router.put("/:id", auth, upload.single("image"), updateBlog);
router.delete("/:id", auth, deleteBlog);

export default router;
