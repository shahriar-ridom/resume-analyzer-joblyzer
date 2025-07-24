import React from "react";

export const metadata = {
  title: "Review Your Resume | Joblyzer",
  description: "Review and edit your resume before applying for jobs",
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="!p-0">{children}</div>;
}
