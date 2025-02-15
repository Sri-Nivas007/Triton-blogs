/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Card, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import { authAPI } from "../api/api";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await authAPI.signup(email, username, password);
            localStorage.setItem("token", data.token);
            toast.success("Signup successful!");
            navigate("/");
        } catch (err) {
            setError("Registration failed");
            toast.error("Signup failed!");
        }
    };

    return (
        <Container className="mt-5" style={{ maxWidth: "400px" }}>
            <Card className="p-4 shadow">
                <h2 className="text-center mb-4">Sign Up</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        className="w-100 mb-3"
                    >
                        Sign Up
                    </Button>
                    <Button
                        variant="link"
                        className="w-100"
                        onClick={() => navigate("/")}
                    >
                        Already have an account? Login
                    </Button>
                </Form>
            </Card>
        </Container>
    );
}
