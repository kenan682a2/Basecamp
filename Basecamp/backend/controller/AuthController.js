import { db } from "../config/db.js";
import { UserModel } from "../models/UserModel.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/authMiddleware.js";

const stripPassword = (user) => {
  const { password, ...rest } = user;
  return rest;
};

export const AuthController = {
  register: async (req, res) => {
    const { name, email, password, passwordConf } = req.body;

    try {
      if (!name || !email || !password || !passwordConf) {
        return res.status(400).json({ error: "All fields are required" });
      }

      if (password !== passwordConf) {
        return res.status(400).json({ error: "Passwords do not match" });
      }

      const existing = await db.select().from(UserModel).where(eq(UserModel.email, email));
      if (existing.length) return res.status(400).json({ error: "User already exists" });

      const hash = await bcrypt.hash(password, 10);
      await db.insert(UserModel).values({ name, email, password: hash, isAdmin: false });

      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("AuthController.register:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

      const users = await db.select().from(UserModel).where(eq(UserModel.email, email));
      if (!users.length) return res.status(401).json({ error: "Invalid email or password" });

      const user = users[0];
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(401).json({ error: "Invalid email or password" });

      const token = generateToken(user);
      return res.status(200).json({ message: "Login successful", token, user: stripPassword(user) });
    } catch (error) {
      console.error("AuthController.login:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await db.select().from(UserModel);
      return res.status(200).json(users.map(stripPassword));
    } catch (error) {
      console.error("AuthController.getAllUsers:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getUser: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const users = await db.select().from(UserModel).where(eq(UserModel.id, id));
      if (!users.length) return res.status(404).json({ error: "User not found" });
      return res.status(200).json(stripPassword(users[0]));
    } catch (error) {
      console.error("AuthController.getUser:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const id = Number(req.params.id);
      await db.delete(UserModel).where(eq(UserModel.id, id));
      return res.status(200).json({ message: "User deleted" });
    } catch (error) {
      console.error("AuthController.deleteUser:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  setAdmin: async (req, res) => {
    try {
      const id = Number(req.params.id);
      await db.update(UserModel).set({ isAdmin: true }).where(eq(UserModel.id, id));
      return res.status(200).json({ message: "User set as admin" });
    } catch (error) {
      console.error("AuthController.setAdmin:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  removeAdmin: async (req, res) => {
    try {
      const id = Number(req.params.id);
      await db.update(UserModel).set({ isAdmin: false }).where(eq(UserModel.id, id));
      return res.status(200).json({ message: "Admin removed" });
    } catch (error) {
      console.error("AuthController.removeAdmin:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  logout: async (_req, res) => {
    return res.status(200).json({ message: "Logout successful" });
  },
};
