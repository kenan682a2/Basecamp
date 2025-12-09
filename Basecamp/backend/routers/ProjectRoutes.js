import express from "express";
import { ProjectController } from "../controller/ProjectController.js";

export const projectRouter = express.Router();

projectRouter.post("/", ProjectController.createProject);
projectRouter.get("/",ProjectController.getAllProject)
projectRouter.get("/:id",ProjectController.getProject)
projectRouter.delete("/:id", ProjectController.deleteProject);
projectRouter.delete("/", ProjectController.deleteAllProjects);
projectRouter.patch("/:id", ProjectController.updateProject);
