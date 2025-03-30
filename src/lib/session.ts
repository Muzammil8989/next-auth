import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

/**
 * Retrieves the session and ensures the user is authenticated
 * Redirects to signin if no session is found
 */
export async function getSessionOrRedirect() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/signin");
  }

  return session;
}

/**
 * Retrieves the session and ensures the user has the required role
 * Redirects to dashboard if the user doesn't have the required role
 */
export async function getSessionWithRoleOrRedirect(allowedRoles: string[]) {
  const session = await getSessionOrRedirect();

  if (!allowedRoles.includes(session.user.role)) {
    redirect("/dashboard");
  }

  return session;
}

/**
 * Clears all auth cookies
 */
export async function clearAuthCookies() {
  const cookieStore = await cookies();

  // Clear NextAuth.js cookies
  cookieStore.delete("next-auth.session-token");
  cookieStore.delete("next-auth.csrf-token");
  cookieStore.delete("next-auth.callback-url");

  // Clear any custom cookies
  cookieStore.delete("user-session");
}

/**
 * Checks if the current session is valid and refreshes if needed
 */
export async function validateSession() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  return session;
}
