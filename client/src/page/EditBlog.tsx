/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Container, Card, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import { API_URL, blogAPI } from "../api/api";

interface Blog {
    _id: string;
    title: string;
    content: string;
    image?: string;
    userId: string; // Ensure this exists in the blog response
}

export default function EditBlog() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Get logged-in user's ID (from localStorage or API)
    const loggedInUserId = localStorage.getItem("user_id");
    console.log("loggedInUs333erId", loggedInUserId);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const { data } = await blogAPI.getBlog(id!);
                console.log("data", data);
                setBlog(data);
                setTitle(data.title);
                setContent(data.content);

                // Check if the user is allowed to edit
                if (loggedInUserId !== data.author?._id) {
                    toast.error("You can't edit this blog!");
                    navigate("/blogs");
                }
            } catch (err) {
                setError("Blog not found");
                toast.error("Failed to load blog");
            }
        };
        fetchBlog();
    }, [id, loggedInUserId, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (image) formData.append("image", image);

        try {
            await blogAPI.updateBlog(id!, formData);
            toast.success("Blog updated successfully!");
            navigate("/blogs");
        } catch (err) {
            setError("Failed to update blog");
            toast.error("Blog update failed!");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!blog) return <div>Loading...</div>;

    return (
        <Container className="mt-4" style={{ maxWidth: "800px" }}>
            <Card className="p-4 shadow">
                <h2 className="mb-4">Edit Blog</h2>
                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Image (optional)</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const input = e.target as HTMLInputElement;
                                if (input.files) setImage(input.files[0]);
                            }}
                        />
                    </Form.Group>

                    {blog.image && (
                        <div className="mb-3">
                            <img
                                src={`${
                                    API_URL
                                }/${blog.image.replace(/\\/g, "/")}`}
                                alt="Current"
                                style={{ maxWidth: "200px" }}
                            />
                            <p className="text-muted mt-2">Current Image</p>
                        </div>
                    )}

                    <div className="d-flex gap-2 justify-content-end">
                        <Button
                            variant="secondary"
                            onClick={() => navigate("/blogs")}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Updating..." : "Update Blog"}
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
}
