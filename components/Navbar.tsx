import { LogOut } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href={"/"} className="text-2xl font-bold text-gradient">
        Joblyzer
      </Link>
      <div className="flex items-center justify-center gap-4">
        <Link href={"/upload"} className="primary-button w-fit">
          Upload Resume
        </Link>
        <Link href={"/auth"} className="w-fit">
          <LogOut />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
