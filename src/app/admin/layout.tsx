"use client";

import { useEffect, useState, createContext, useContext } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createAuthClient, getUser, isAdmin, signOut } from "@/lib/auth";
import type { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const isAuthRoute = pathname === "/admin/login";

  const navItems = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/projects", label: "Projects" },
    { href: "/admin/experiences", label: "Experiences" },
    { href: "/admin/skills", label: "Skills" },
    { href: "/admin/tech", label: "Tech Master" },
    { href: "/admin/guestbook", label: "Guestbook" },
  ];

  useEffect(() => {
    if (isAuthRoute) {
      setLoading(false);
      setInitializing(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const client = createAuthClient();
        const currentUser = await getUser(client);
        
        if (currentUser && currentUser.email) {
          const adminStatus = await isAdmin(client, currentUser.email);
          if (adminStatus) {
            setUser(currentUser);
          } else {
            router.push("/admin/login");
            return;
          }
        } else {
          router.push("/admin/login");
          return;
        }
      } catch (error) {
        console.error("Auth error:", error);
        router.push("/admin/login");
        return;
      } finally {
        setLoading(false);
        setInitializing(false);
      }
    };

    checkAuth();
  }, [isAuthRoute, router]);

  const handleSignOut = async () => {
    try {
      const client = createAuthClient();
      await signOut(client);
      router.push("/admin/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (initializing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (isAuthRoute) {
    return <>{children}</>;
  }

  // Not authenticated - don't render anything (will redirect)
  if (!user) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, loading: false, signOut: handleSignOut }}>
      <div className="admin-bg min-h-screen">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-72 p-5 hidden lg:block">
            <div className="admin-card rounded-3xl h-[calc(100vh-2.5rem)] sticky top-5 p-5 flex flex-col">
              <div className="pb-5 border-b border-black/10">
                <Link href="/" className="text-2xl font-black tracking-tight text-text">
                  broy<span className="text-primary">.dev</span>
                </Link>
                <p className="text-xs admin-subtle mt-1">Portfolio Control Center</p>
              </div>

              <nav className="pt-5 flex-1">
                <ul className="space-y-1.5">
                  {navItems.map((item) => {
                    const isActive =
                      item.href === "/admin"
                        ? pathname === "/admin"
                        : pathname.startsWith(item.href);

                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                            isActive
                              ? "bg-primary text-white shadow-lg shadow-primary/20"
                              : "text-text/75 hover:bg-black/5"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="pt-5 border-t border-black/10 space-y-2">
                <div className="px-3 py-2 rounded-xl bg-black/[0.03] border border-black/5">
                  <p className="text-xs text-text/50">Signed in as</p>
                  <p className="text-sm font-medium text-text truncate">
                    {user?.email || "admin"}
                  </p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="block w-full px-4 py-2.5 text-sm font-medium text-red-700 rounded-xl hover:bg-red-50 transition-colors text-left border border-red-100"
                >
                  Sign Out
                </button>
                <Link
                  href="/"
                  className="block px-4 py-2.5 text-sm font-medium text-text/70 rounded-xl hover:bg-black/5 transition-colors text-center border border-black/10"
                >
                  Back to Website
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="lg:hidden admin-card rounded-2xl p-3 mb-4 overflow-x-auto">
              <div className="flex gap-2 min-w-max">
                {navItems.map((item) => {
                  const isActive =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap ${
                        isActive ? "bg-primary text-white" : "bg-black/5 text-text/70"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <section className="admin-card rounded-3xl min-h-[calc(100vh-4rem)] p-5 sm:p-7 lg:p-8">
              {children}
            </section>
          </main>
        </div>
      </div>
    </AuthContext.Provider>
  );
}
