"use client";
import { usePuterStore } from "@/lib/puter";
import { useEffect, ReactNode } from "react";

interface PuterProviderProps {
  children: ReactNode;
}

export function PuterProvider({ children }: PuterProviderProps) {
  const { init } = usePuterStore();

  useEffect(() => {
    init();
  }, [init]);

  return <>{children}</>;
}
