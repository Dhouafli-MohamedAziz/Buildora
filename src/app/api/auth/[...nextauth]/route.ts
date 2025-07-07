import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import mysql from "mysql2";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || undefined,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

export const config = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // 1. Validate credentials
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // 2. Query database
        const [users] = await pool.execute(
          "SELECT * FROM users WHERE email = ?",
          [credentials.email]
        );

        if (users.length === 0) {
          throw new Error("User not found");
        }

        const user = users[0];

        // 3. Verify password
        const isValid = await bcrypt.compare(
  credentials.password as string, // Force TypeScript to treat as string
  user.password as string
);

        if (!isValid) {
          throw new Error("Invalid password");
        }

        // 4. Return user object without password
        return {
          id: user.id,
          name: user.name,
          email: user.email
        };
      }
    })
    // Add other providers like GitHub here if needed
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",  // Custom sign-in page
    error: "/auth/error" // Error page
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  debug: process.env.NODE_ENV === "development"
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);