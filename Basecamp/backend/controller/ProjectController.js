import { db } from "../config/db.js";
import { ProjectModel } from "../models/ProjectModel.js";
import { eq, and } from "drizzle-orm";

export const ProjectController = {
  createProject: async (req, res) => {
    const { name, description } = req.body;
    const owner_Id = req.userId;

    try {
      const result = await db.insert(ProjectModel).values({
        name,
        description,
        owner_Id,
        isAdminOnly: false,
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
      const userId = req.userId;
      const isAdmin = req.isAdmin;

      let projects;
      if (isAdmin) {
        projects = await db.select().from(ProjectModel);
      } else {
        projects = await db
          .select()
          .from(ProjectModel)
          .where(eq(ProjectModel.isAdminOnly, false));
      }
      res.status(200).json(projects);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  },
  getProject: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.userId;
      const isAdmin = req.isAdmin;

      let whereCondition;
      if (isAdmin) {
        whereCondition = eq(ProjectModel.id, Number(id));
      } else {
        whereCondition = and(
          eq(ProjectModel.id, Number(id)),
          eq(ProjectModel.owner_Id, userId)
        );
      }

      const project = await db
        .select()
        .from(ProjectModel)
        .where(whereCondition);

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
      const userId = req.userId;
      const isAdmin = req.isAdmin;

      let whereCondition;
      if (isAdmin) {
        whereCondition = eq(ProjectModel.id, Number(id));
      } else {
        whereCondition = and(
          eq(ProjectModel.id, Number(id)),
          eq(ProjectModel.owner_Id, userId)
        );
      }

      await db
        .delete(ProjectModel)
        .where(whereCondition);
      res.status(200).json({ message: "Project deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  },
  deleteAllProjects: async (req, res) => {
    try {
      const userId = req.userId;
      const result = await db
        .delete(ProjectModel)
        .where(eq(ProjectModel.owner_Id, userId));
      res.status(200).json({ message: `Deleted ${result} projects` });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  },
  updateProject: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, isAdminOnly } = req.body;
      const userId = req.userId;
      const isAdmin = req.isAdmin;

      const updateData = { name, description };
      if (isAdmin) {
        updateData.isAdminOnly = isAdminOnly;
      }

      await db
        .update(ProjectModel)
        .set(updateData)
        .where(eq(ProjectModel.id, Number(id)));
      res.status(201).json("Project updated");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  },
};
