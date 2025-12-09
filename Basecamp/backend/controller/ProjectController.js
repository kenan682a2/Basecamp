import { db } from "../config/db.js";
import { ProjectModel } from "../models/ProjectModel.js";
import { eq } from "drizzle-orm";

export const ProjectController = {
  createProject: async (req, res) => {
    const { name, description, owner_Id } = req.body;

    try {
      const result = await db.insert(ProjectModel).values({
        name,
        description,
        owner_Id,
      });

      res.status(201).json({ message: "Project created", result });
    } catch (err) {
      if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
        return res.status(400).json({ error: "Project name must be unique" });
      }
      console.log(err);
      res.status(500).json({ error: "Something went wrong" });
    }
  },
  getAllProject: async (req, res) => {
    try {
      const projects = await db.select().from(ProjectModel);
      res.status(200).json(projects);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  },
  getProject: async (req, res) => {
    try {
      const { id } = req.params;
      const project = await db
        .select()
        .from(ProjectModel)
        .where(eq(ProjectModel.id, Number(id)));

      if (!project.length) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.status(200).json(project[0]);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  },
  deleteProject: async (req, res) => {
    try {
      const { id } = req.params;
      await db.delete(ProjectModel).where(eq(ProjectModel.id, Number(id)));
      res.status(200).json({ message: "Project deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  },
  deleteAllProjects: async (req, res) => {
    try {
      const result = await db.delete(ProjectModel);
      res.status(200).json({ message: `Deleted ${result} projects` });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  },
  updateProject: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      await db   
        .update(ProjectModel)
        .set({ name, description })
        .where(eq(ProjectModel.id, Number(id)));
      res.status(201).json("Project updated");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  },
};
