import React from "react";

export const metadata = {
  title: "Joblyzer | Auth",
  description: "Login or Register to access Joblyzer",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="auth-layout">{children}</div>;
}
