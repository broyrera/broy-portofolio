import { createClient, SupabaseClient, User } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create auth client (different from data client - uses cookies for SSR)
export function createAuthClient(): SupabaseClient {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");
  }
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}

// Check if user is admin by looking up their email in the admins table
export async function isAdmin(client: SupabaseClient, email: string): Promise<boolean> {
  const { data, error } = await client
    .from("admins")
    .select("id")
    .eq("email", email.toLowerCase())
    .maybeSingle();
  
  if (error) {
    console.error("Error checking admin:", error);
    return false;
  }
  
  return data !== null;
}

export async function getUser(client: SupabaseClient): Promise<User | null> {
  const { data: { user }, error } = await client.auth.getUser();
  if (error || !user) return null;
  return user;
}

export async function signInWithPassword(
  client: SupabaseClient,
  email: string,
  password: string
) {
  return client.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signOut(client: SupabaseClient) {
  return client.auth.signOut();
}
