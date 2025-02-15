Blog Screen Project

Overview

This project implements a Blog Screen with user authentication, CRUD operations, image uploads, and dynamic content.

Features

1. Authentication

Login and Signup using Node.js and MongoDB

Password encryption using bcryptjs

JSON Web Token (JWT) for secure authentication

.........................................................................................................................................................................................................

2. CRUD Operations

Create: Users can create blog posts (title, body, images)

Read: Users can view all blog posts dynamically

Update: Users can edit their own blog posts

Delete: Users can delete their own blog posts

.........................................................................................................................................................................................................

3. Image Uploads

File uploads using Multer

Images stored in a local directory with paths saved in the database

.........................................................................................................................................................................................................

4. Dynamic Content Rendering

Frontend: Uses React to fetch and display blogs dynamically

Backend: Provides structured API responses using Express.js

.........................................................................................................................................................................................................

Tech Stack

Frontend

HTML, CSS, typescript ,

React.js (for dynamic content rendering)

.........................................................................................................................................................................................................

Backend

Node.js with Express.js,Typescript

MongoDB with Mongoose

bcryptjs (password hashing)

JSON Web Token (JWT)

Multer (file uploads)

.........................................................................................................................................................................................................

Steps to Run the Project

**Clone the repository**

git clone https://github.com/Sri-Nivas007/triton_blog

.........................................................................................................................................................................................................

Run the Frontend

cd client
npm install
npm run dev

.........................................................................................................................................................................................................

Run the Backend

cd server
npm install
npm run dev

.........................................................................................................................................................................................................

Set up environment variables

Create a .env file in the root directory and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

.........................................................................................................................................................................................................

Create a .env file for React in the frontend directory:

VITE_API_BASE_URL=your_backend_url

.........................................................................................................................................................................................................

API Endpoints

Authentication

POST /auth/signup - Register a new user

POST /auth/login - Authenticate user and return JWT

.........................................................................................................................................................................................................

Blog Operations

POST /blogs - Create a new blog post

GET /blogs - Get all blog posts || /blogs/id -Get individual blog post

PUT /blogs/:id - Update a blog post

DELETE /blogs/:id - Delete a blog post


