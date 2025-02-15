/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Container, Row, Col, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import { API_URL, blogAPI } from "../api/api";

interface Blog {
    _id: string;
    title: string;
    content: string;
    image?: string;
    userId: string; // Assuming this is the author ID
    author?: { _id: string }; // Add this if the API response includes an author object
}

export default function BlogList() {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const loggedInUserId = localStorage.getItem("user_id"); // Get the logged-in user ID from storage or context
    console.log("loggedInUsDDDDDDerId", loggedInUserId);
    console.log("blogsddd", blogs);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await blogAPI.getBlogs();
                setBlogs(data);
            } catch (err) {
                setError("Failed to load blogs");
            }
        };
        fetchBlogs();
    }, []);

    const handleDelete = async (id: string, userId: string) => {
        console.log("userId", userId);
        if (loggedInUserId !== userId) {
            toast.error("You 6can't delete this blog!");
            return;
        }

        try {
            await blogAPI.deleteBlog(id);
            toast.success("Blog deleted successfully!");
            setBlogs(blogs.filter((blog) => blog._id !== id)); // Remove deleted blog from state
        } catch (err) {
            toast.error("Failed to delete blog");
        }
    };

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between mb-4">
                <h2>My Blogs</h2>
                <Link to="/create">
                    <Button variant="success">Create New</Button>
                </Link>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            {blogs.length === 0 ? (
                <div className="text-center mt-5">
                    <h3>No blogs here! Create one 👑</h3>
                </div>
            ) : (
                <Row>
                    {blogs.map((blog) => (
                        <Col md={6} lg={4} className="mb-4" key={blog._id}>
                            <Card className="h-100 shadow">
                                {blog.image && (
                                    <Card.Img
                                        variant="top"
                                        src={`${
                                            API_URL
                                        }/${blog.image.replace(/\\/g, "/")}`}
                                        style={{
                                            height: "200px",
                                            objectFit: "cover",
                                        }}
                                    />
                                )}
                                <Card.Body>
                                    <Card.Title>{blog.title}</Card.Title>
                                    <Card.Text>
                                        {blog.content.slice(0, 100)}...
                                    </Card.Text>
                                    <div className="d-flex gap-2">
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            onClick={() => {
                                                if (
                                                    loggedInUserId !==
                                                    blog.author?._id
                                                ) {
                                                    toast.error(
                                                        "You can't edit this blog!"
                                                    );
                                                    return;
                                                }
                                                navigate(`/edit/${blog._id}`);
                                            }}
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => {
                                                if (
                                                    window.confirm(
                                                        "Are you sure you want to delete this blog? This action cannot be undone."
                                                    )
                                                ) {
                                                    handleDelete(
                                                        blog._id,
                                                        blog.author?._id ?? ""
                                                    );
                                                }
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}
