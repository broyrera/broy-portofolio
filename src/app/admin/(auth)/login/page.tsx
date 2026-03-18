"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createAuthClient, signInWithPassword, isAdmin } from "@/lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let client;
      try {
        client = createAuthClient();
      } catch (clientErr) {
        console.error("Client init error:", clientErr);
        setError("Failed to initialize authentication client. Please check your configuration.");
        setLoading(false);
        return;
      }
      const { data, error: signInError } = await signInWithPassword(
        client,
        email,
        password
      );

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      if (!data.user) {
        setError("Login failed. Please try again.");
        setLoading(false);
        return;
      }

      // Check if admin by looking up in admins table
      if (!data.user.email) {
        setError("Unable to verify email. Please try again.");
        await client.auth.signOut();
        setLoading(false);
        return;
      }

      const isAdminUser = await isAdmin(client, data.user.email);
      if (!isAdminUser) {
        setError("You are not authorized to access admin dashboard.");
        await client.auth.signOut();
        setLoading(false);
        return;
      }

      // Success - redirect to admin dashboard
      router.push("/admin");
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <div className="text-center mb-8">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          broy.dev
        </Link>
        <p className="text-gray-500 mt-2">Admin Dashboard</p>
      </div>

      {/* Login Form */}
      <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
        <h1 className="text-xl font-semibold text-gray-900 mb-6">
          Sign in to your account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>

      {/* Back to website */}
      <div className="text-center mt-6">
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          ← Back to website
        </Link>
      </div>
    </div>
  );
}
