"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-lg tracking-tight text-gray-800 hover:text-blue-600 transition-colors"
        >
          IB CS Notes
        </Link>
{/* 
        <Link
          href="/"
          className={`text-sm px-3 py-1.5 rounded-md transition-colors ${
            pathname === "/"
              ? "bg-gray-100 text-gray-800 font-medium"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
          }`}
        >
          Syllabus
        </Link> */}
      </div>
    </nav>
  );
}
