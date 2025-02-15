import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Login from "./page/Login";
import Signup from "./page/Signup";
import BlogList from "./page/BlogList";
import CreateBlog from "./page/CreateBlog";
import EditBlog from "./page/EditBlog";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
    return (
        <>
            <Navbar />
            <ToastContainer position="top-right" autoClose={3000} />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/blogs" element={<BlogList />} />
                    <Route path="/create" element={<CreateBlog />} />
                    <Route path="/edit/:id" element={<EditBlog />} />
                </Route>

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    );
}
