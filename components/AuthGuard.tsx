"use client";
import { usePuterStore } from "@/lib/puter";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
  redirectTo?: string;
}

export function AuthGuard({ children, redirectTo = "/auth" }: AuthGuardProps) {
  const { auth } = usePuterStore();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      const currentPath = window.location.pathname;
      router.replace(`${redirectTo}?next=${encodeURIComponent(currentPath)}`);
    }
  }, [auth.isAuthenticated, router, redirectTo]);

  if (!auth.isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Redirecting to login...</div>
      </div>
    );
  }

  return <>{children}</>;
}
