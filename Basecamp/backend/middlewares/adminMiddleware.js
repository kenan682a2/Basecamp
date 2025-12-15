import { db } from "../config/db.js";
import { UserModel } from "../models/UserModel.js";
import { eq } from "drizzle-orm";

export const verifyAdmin = (req, res, next) => {
  if (!req.isAdmin) return res.status(403).json({ error: "Admin only" });
  return next();
};
