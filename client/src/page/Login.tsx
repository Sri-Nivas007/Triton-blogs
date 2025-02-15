/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Card, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import { authAPI } from "../api/api";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await authAPI.login(email, password);
            console.log('data', data)
            localStorage.setItem("token", data.token);
            localStorage.setItem("user_id", data.userId);
            toast.success("Login successful!");
            navigate("/blogs");
        } catch (err) {
            setError("Invalid credentials");
            toast.error("Login failed!");
        }
    };

    return (
        <Container className="mt-5" style={{ maxWidth: "400px" }}>
            <Card className="p-4 shadow">
                <h2 className="text-center mb-4">Login</h2>
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
                        Login
                    </Button>
                    <Button
                        variant="link"
                        className="w-100"
                        onClick={() => navigate("/signup")}
                    >
                        Create New Account
                    </Button>
                </Form>
            </Card>
        </Container>
    );
}
