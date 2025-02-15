import { Link, useNavigate } from "react-router-dom";
import { Button, Navbar as BSNavbar, Container, Nav } from "react-bootstrap";
import { toast } from "react-toastify";

export default function Navbar() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token");

    const handleLogout = () => {
        const confirmLogout = window.confirm(
            "Are you sure you want to log out?"
        );
        if (confirmLogout) {
            localStorage.removeItem("token");
            localStorage.removeItem("user_id");
            toast.success("Logged out successfully!");
            navigate("/");
        }
    };

    return (
        <BSNavbar bg="dark" variant="dark" expand="lg" className="shadow">
            <Container>
                <BSNavbar.Brand as={Link} to="/blogs">
                    TRITON BLOGS
                </BSNavbar.Brand>
                <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BSNavbar.Collapse id="basic-navbar-nav">
                    {isLoggedIn && (
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/blogs">
                                Home
                            </Nav.Link>
                            <Nav.Link as={Link} to="/create">
                                Create Blog
                            </Nav.Link>
                        </Nav>
                    )}
                    <div className="d-flex gap-2">
                        {isLoggedIn ? (
                            <Button
                                variant="outline-danger"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        ) : (
                            <>
                                <Button
                                    variant="outline-light"
                                    onClick={() => navigate("/")}
                                >
                                    Login
                                </Button>
                                <Button
                                    variant="outline-success"
                                    onClick={() => navigate("/signup")}
                                >
                                    Sign Up
                                </Button>
                            </>
                        )}
                    </div>
                </BSNavbar.Collapse>
            </Container>
        </BSNavbar>
    );
}
