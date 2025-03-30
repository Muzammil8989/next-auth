import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserRole } from "@/types/db";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Next.js Auth System</h1>
          <p className="mt-2 text-muted-foreground">
            Role-based authentication with MongoDB and Prisma
          </p>
        </div>

        <div className="space-y-4 rounded-lg border p-6 shadow-md">
          {session ? (
            <div className="space-y-4">
              <div className="rounded-md bg-muted p-4">
                <p className="font-medium">Signed in as:</p>
                <p>{session.user?.email}</p>
                <p className="text-sm text-muted-foreground">
                  Role: {session.user?.role}
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="text-lg font-medium">Protected Pages:</h2>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <Link href="/dashboard" className="w-full">
                    <Button variant="outline" className="w-full justify-start">
                      Dashboard (All Users)
                    </Button>
                  </Link>
                  {(session.user?.role === UserRole.ADMIN ||
                    session.user?.role === UserRole.MANAGER) && (
                    <Link href="/admin" className="w-full">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        Admin (Admin & Manager)
                      </Button>
                    </Link>
                  )}
                  {session.user?.role === UserRole.ADMIN && (
                    <Link href="/admin/settings" className="w-full">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        Settings (Admin Only)
                      </Button>
                    </Link>
                  )}
                </div>
              </div>

              <Link href="/api/auth/signout" className="w-full">
                <Button className="w-full">Sign Out</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-center">
                Please sign in to access the application
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Link href="/signin" className="w-full">
                  <Button variant="default" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup" className="w-full">
                  <Button variant="outline" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
