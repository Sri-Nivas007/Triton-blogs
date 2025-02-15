import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const signup = async (req: Request, res: Response) => {
    const { email, username, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        const user = new User({ email, username, password });
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
            expiresIn: "1h",
        });

        res.status(201).json({ token, userId: user._id });
    } catch (err) {
        res.status(500).json({ message: "Signup failed" });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
            expiresIn: "1h",
        });

        res.json({ token, userId: user._id });
    } catch (err) {
        res.status(500).json({ message: "Login failed" });
    }
};
