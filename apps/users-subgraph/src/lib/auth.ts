import { betterAuth } from "better-auth";


export const auth = betterAuth({
  database: {
    // Better Auth will use its own DB adapter.
    // For the users-subgraph, we connect to PostgreSQL.
    // Better Auth's built-in tables (user, session, account) will be managed here.
    type: "pg",
    host: process.env.DB_HOST || "localhost",
    port: 5432,
    user: process.env.DB_USER || "users_db_user",
    password: process.env.DB_PASSWORD || "users_db_password",
    database: process.env.DB_NAME || "users_db",
  },
  emailAndPassword: {
    enabled: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24, // 1 day
    },
  },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
