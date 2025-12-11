import { db } from "../config/db.js";
import { UserModel } from "../models/UserModel.js";
import { eq } from "drizzle-orm";

export const verifyAdmin = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const rows = await db.select().from(UserModel).where(eq(UserModel.id, userId));
    const user = rows[0];
    if (!user) return res.status(404).json({ error: "User not found" });

    if (!user.isAdmin) return res.status(403).json({ error: "Admin only" });

    req.admin = user;
    return next();
  } catch (error) {
    console.error("verifyAdmin:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
