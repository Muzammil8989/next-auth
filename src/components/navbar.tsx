"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRole } from "@/types/db";
import { LogOut, Settings, User } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Don't show navbar on auth pages
  if (pathname === "/signin" || pathname === "/signup") {
    return null;
  }

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold">
            Auth System
          </Link>

          {session && (
            <nav className="hidden md:flex">
              <ul className="flex items-center gap-6">
                <li>
                  <Link
                    href="/dashboard"
                    className={`text-sm ${
                      pathname === "/dashboard"
                        ? "text-primary font-medium"
                        : "text-muted-foreground"
                    } transition-colors hover:text-primary`}
                  >
                    Dashboard
                  </Link>
                </li>
                {(session.user?.role === UserRole.ADMIN ||
                  session.user?.role === UserRole.MANAGER) && (
                  <li>
                    <Link
                      href="/admin"
                      className={`text-sm ${
                        pathname === "/admin"
                          ? "text-primary font-medium"
                          : "text-muted-foreground"
                      } transition-colors hover:text-primary`}
                    >
                      Admin
                    </Link>
                  </li>
                )}
                {session.user?.role === UserRole.ADMIN && (
                  <li>
                    <Link
                      href="/admin/settings"
                      className={`text-sm ${
                        pathname === "/admin/settings"
                          ? "text-primary font-medium"
                          : "text-muted-foreground"
                      } transition-colors hover:text-primary`}
                    >
                      Settings
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">{session.user?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/signin">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
