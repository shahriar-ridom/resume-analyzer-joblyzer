"use client";
import { usePuterStore } from "@/lib/puter";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";

  // Track if user was redirected here (has 'next' param) vs manually navigated
  const wasRedirected = useRef(searchParams.has("next"));
  const hasRedirected = useRef(false);

  useEffect(() => {
    // Only redirect if:
    // 1. User is authenticated
    // 2. User was redirected here (has 'next' param)
    // 3. We haven't already redirected (prevent redirect loops)
    if (
      auth.isAuthenticated &&
      wasRedirected.current &&
      !hasRedirected.current
    ) {
      hasRedirected.current = true;
      router.push(next);
    }
  }, [auth.isAuthenticated, next, router]);

  const handleGoHome = () => {
    router.push(next);
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>Welcome</h1>
            {auth.isAuthenticated ? (
              <h2>You are logged in!</h2>
            ) : (
              <h2>Login to Continue Analyzing Resume</h2>
            )}
          </div>
          <div className="flex flex-col gap-4">
            {isLoading ? (
              <button className="auth-button animate-pulse" disabled>
                Signing you in...
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <>
                    <button className="auth-button" onClick={handleGoHome}>
                      Go to Dashboard
                    </button>
                    <button
                      className="auth-button bg-red-500 hover:bg-red-600"
                      onClick={auth.signOut}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button className="auth-button" onClick={auth.signIn}>
                    Login
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Auth;
