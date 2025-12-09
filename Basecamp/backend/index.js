import express from "express";
const app = express();
import { projectRouter } from "./routers/ProjectRoutes.js";

app.use(express.json());

app.use("/projects", projectRouter);

app.listen(3000, () => console.log("Server running on port 3000"));
