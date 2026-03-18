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
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 fixed h-full z-10">
          <div className="p-6 border-b border-gray-100">
            <Link href="/" className="text-lg font-bold text-gray-900">
              broy.dev
            </Link>
            <p className="text-xs text-gray-500 mt-1">Admin Dashboard</p>
          </div>
          <nav className="p-4">
            <ul className="space-y-1">
              <li>
                <Link
                  href="/admin"
                  className="block px-4 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/projects"
                  className="block px-4 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/experiences"
                  className="block px-4 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Experiences
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/skills"
                  className="block px-4 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/guestbook"
                  className="block px-4 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Guestbook
                </Link>
              </li>
            </ul>
          </nav>
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 space-y-2">
            <button
              onClick={handleSignOut}
              className="block w-full px-4 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors text-left"
            >
              Sign Out
            </button>
            <Link
              href="/"
              className="block px-4 py-2.5 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 transition-colors text-center"
            >
              ← Back to Website
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">{children}</main>
      </div>
    </AuthContext.Provider>
  );
}
