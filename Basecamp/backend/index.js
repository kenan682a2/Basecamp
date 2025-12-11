import express from "express";
import cors from "cors";
const app = express();
import { projectRouter } from "./routers/ProjectRoutes.js";
import { authRouter } from "./routers/AuthRoutes.js";
import { verifyToken } from "./middlewares/authMiddleware.js";

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/projects", verifyToken, projectRouter);

app.listen(3000, () => console.log("Server running on port 3000"));
