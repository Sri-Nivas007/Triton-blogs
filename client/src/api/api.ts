import axios from "axios";

export const API_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add JWT token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle 401 unauthorized errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);

export const authAPI = {
    login: (email: string, password: string) =>
        api.post("/auth/login", { email, password }),
    signup: (email: string, username: string, password: string) =>
        api.post("/auth/signup", { email, username, password }),
};

export const blogAPI = {
    getBlogs: () => api.get("/blogs"),
    createBlog: (formData: FormData) =>
        api.post("/blogs", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }),
    updateBlog: (id: string, formData: FormData) =>
        api.put(`/blogs/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }),
    deleteBlog: (id: string) => api.delete(`/blogs/${id}`),
    getBlog: (id: string) => api.get(`/blogs/${id}`),
};
