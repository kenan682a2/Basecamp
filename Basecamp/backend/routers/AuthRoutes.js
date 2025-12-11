import express from "express";
import { AuthController } from "../controller/AuthController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { verifyAdmin } from "../middlewares/adminMiddleware.js";

export const authRouter = express.Router();

// Public routes
authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);

// Protected routes
authRouter.post("/logout", verifyToken, AuthController.logout);
authRouter.get("/user/:id", verifyToken, AuthController.getUser);
authRouter.delete("/user/:id", verifyToken, verifyAdmin, AuthController.deleteUser);

// Admin routes
authRouter.get("/users", verifyToken, verifyAdmin, AuthController.getAllUsers);
authRouter.patch("/user/:id/setadmin", verifyToken, verifyAdmin, AuthController.setAdmin);
authRouter.patch("/user/:id/removeadmin", verifyToken, verifyAdmin, AuthController.removeAdmin);
