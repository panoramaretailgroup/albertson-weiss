"use client";

import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient, User, Session } from "@supabase/supabase-js";
import type { UserRole } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  role: UserRole | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ role: UserRole | null }>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    phone?: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  const supabase = useMemo<SupabaseClient | null>(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    return createBrowserClient(url, key);
  }, []);

  const fetchRole = useCallback(
    async (userId: string): Promise<UserRole | null> => {
      if (!supabase) return null;
      const { data } = await supabase
        .from("users")
        .select("role")
        .eq("id", userId)
        .single();
      return (data?.role as UserRole) ?? null;
    },
    [supabase]
  );

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const initSession = async () => {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();

      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (currentSession?.user) {
        const userRole = await fetchRole(currentSession.user.id);
        setRole(userRole);
      }

      setLoading(false);
    };

    initSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);

      if (newSession?.user) {
        const userRole = await fetchRole(newSession.user.id);
        setRole(userRole);
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, fetchRole]);

  const handleSignIn = useCallback(
    async (email: string, password: string) => {
      if (!supabase) throw new Error("Supabase not configured");

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      let userRole: UserRole | null = null;
      if (data.user) {
        userRole = await fetchRole(data.user.id);
        setRole(userRole);
      }

      return { role: userRole };
    },
    [supabase, fetchRole]
  );

  const handleSignUp = useCallback(
    async (
      email: string,
      password: string,
      fullName: string,
      phone?: string
    ) => {
      if (!supabase) throw new Error("Supabase not configured");

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone || null,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        const { error: profileError } = await supabase.from("users").insert({
          id: data.user.id,
          email,
          full_name: fullName,
          phone: phone || null,
          role: "investor",
        });

        if (profileError) throw profileError;
      }
    },
    [supabase]
  );

  const handleSignOut = useCallback(async () => {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setRole(null);
  }, [supabase]);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        role,
        loading,
        signIn: handleSignIn,
        signUp: handleSignUp,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
