import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { PuterProvider } from "@/components/puterProvider";
import { ConditionalNavbar } from "@/components/ConditionalNavbar";

const geistSans = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Joblyzer - AI Resume Analyzer",
  keywords: [
    "AI Resume Analyzer",
    "Joblyzer",
    "Resume Analysis",
    "AI Job Search",
    "Resume Optimization",
  ],
  description: `Let Joblyzer read resumes so you don’t have to.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://js.puter.com/v2/"></script>
      </head>
      <body className={`${geistSans.variable} antialiased`}>
        <PuterProvider>
          <main>
            <ConditionalNavbar />
            {children}
          </main>
        </PuterProvider>
      </body>
    </html>
  );
}
