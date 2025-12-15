import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const ProjectModel = sqliteTable(
  "projects",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    description: text("description"),
    owner_Id: integer("owner_Id"),
    isAdminOnly: integer("isAdminOnly", { mode: "boolean" }).default(false),
  },
  (table) => ({
    uniqueName: uniqueIndex("projects_name_unique").on(table.name),
  })
);
