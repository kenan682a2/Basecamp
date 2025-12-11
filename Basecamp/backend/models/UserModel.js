import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const UserModel = sqliteTable(
  "users",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    email: text("email").notNull(),
    password: text("password").notNull(),
    isAdmin: integer("isAdmin", { mode: "boolean" }).default(false),
  },
  (table) => ({
    uniqueEmail: uniqueIndex("users_email_unique").on(table.email),
  })
);
