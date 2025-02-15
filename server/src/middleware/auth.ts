import { Response, NextFunction } from "express";
import { CustomRequest } from "../types/custom";
import jwt from "jsonwebtoken";

export default function auth(req: CustomRequest, res: Response, next: NextFunction){
  const token = req.headers.authorization?.split(" ")[1];
  console.log('token', token)

  if (!token) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}
