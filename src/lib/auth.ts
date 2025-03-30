import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import prisma from "@/lib/prisma";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import type { UserRole } from "@/types/db";

// Define the session max age (30 days)
const MAX_AGE = 30 * 24 * 60 * 60; // 30 days in seconds

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: MAX_AGE, // How long the session will stay valid in seconds
  },
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds
    maxAge: MAX_AGE,
  },
  pages: {
    signIn: "/signin",
    signOut: "/",
    error: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.password) {
          return null;
        }

        // Check if email is verified
        if (!user.emailVerified) {
          throw new Error("EMAIL_NOT_VERIFIED");
        }

        const passwordValid = await compare(
          credentials.password,
          user.password
        );

        if (!passwordValid) {
          return null;
        }

        // Return only the data needed for the JWT token
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role as UserRole, // Cast user.role to UserRole
        };
      },
    }),
  ],
  callbacks: {
    // JWT callback is called whenever a JWT is created or updated
    async jwt({ token, user, account, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.email = user?.email;
        token.name = user.name;
        token.role = user.role;
        token.createdAt = Date.now();
      }

      // Handle token updates when session is updated
      if (trigger === "update" && session) {
        if (session.user?.role) {
          token.role = session.user.role;
        }
        // You can update other token properties here as needed
      }

      // Check if the token needs to be refreshed
      // This is a simple example - in production you might want to use a refresh token
      const shouldRefreshTime =
        (token.createdAt as number) + 1000 * 60 * 60 * 12; // 12 hours
      if (Date.now() > shouldRefreshTime) {
        // Refresh the user data from the database
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { role: true, name: true, email: true },
        });

        if (dbUser) {
          token.role = dbUser.role as UserRole;
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.createdAt = Date.now();
        }
      }

      return token;
    },
    // Session callback is called whenever a session is checked
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  // Configure cookie settings for security
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  // Enable debug logs in development
  debug: process.env.NODE_ENV === "development",
  // Secret used to sign cookies and tokens
  secret: process.env.NEXTAUTH_SECRET,
};
