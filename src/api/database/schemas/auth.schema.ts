import * as t from "drizzle-orm/pg-core";
import { pgTable as table } from "drizzle-orm/pg-core";

const users = table("users", {
  id: t.uuid("id").primaryKey().defaultRandom(),
  name: t.text("name").notNull(),
  email: t.text("email").notNull().unique(),
  emailVerified: t.boolean("email_verified").default(false).notNull(),
  image: t.text("image"),
  createdAt: t.timestamp("created_at").defaultNow().notNull(),
  updatedAt: t
    .timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

const sessions = table(
  "sessions",
  {
    id: t.uuid("id").primaryKey().defaultRandom(),
    expiresAt: t.timestamp("expires_at").notNull(),
    token: t.text("token").notNull().unique(),
    createdAt: t.timestamp("created_at").defaultNow().notNull(),
    updatedAt: t
      .timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: t.text("ip_address"),
    userAgent: t.text("user_agent"),
    userId: t
      .uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (table) => [t.index("sessions_userId_idx").on(table.userId)],
);

const accounts = table(
  "accounts",
  {
    id: t.uuid("id").primaryKey().defaultRandom(),
    accountId: t.text("account_id").notNull(),
    providerId: t.text("provider_id").notNull(),
    userId: t
      .uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    accessToken: t.text("access_token"),
    refreshToken: t.text("refresh_token"),
    idToken: t.text("id_token"),
    accessTokenExpiresAt: t.timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: t.timestamp("refresh_token_expires_at"),
    scope: t.text("scope"),
    password: t.text("password"),
    createdAt: t.timestamp("created_at").defaultNow().notNull(),
    updatedAt: t
      .timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [t.index("accounts_userId_idx").on(table.userId)],
);

const verifications = table(
  "verifications",
  {
    id: t.uuid("id").primaryKey().defaultRandom(),
    identifier: t.text("identifier").notNull(),
    value: t.text("value").notNull(),
    expiresAt: t.timestamp("expires_at").notNull(),
    createdAt: t.timestamp("created_at").defaultNow().notNull(),
    updatedAt: t
      .timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [t.index("verifications_identifier_idx").on(table.identifier)],
);

export { users, sessions, accounts, verifications };
