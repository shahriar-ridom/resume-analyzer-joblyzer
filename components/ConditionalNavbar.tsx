"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export function ConditionalNavbar() {
  const pathname = usePathname();

  // Don't show navbar on auth pages
  if (pathname.startsWith("/auth")) {
    return null;
  }

  return <Navbar />;
}
