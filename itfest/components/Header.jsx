"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-4 md:px-8 py-4 bg-white shadow-lg border-b border-gray-100">
      <div className="text-2xl font-bold text-green-600">BudgetBuddy</div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
        <Link href="#" className="hover:text-green-600 transition">
          Tentang
        </Link>
        <Link href="#" className="hover:text-green-600 transition">
          Fitur
        </Link>
        <Link href="#" className="hover:text-green-600 transition">
          Layanan
        </Link>
        <Link href="#" className="hover:text-green-600 transition">
          Kontak
        </Link>
      </nav>

      {/* Desktop Button */}
      <Link href="/login" className="hidden md:block">
        <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-900 transition">
          For User →
        </button>
      </Link>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden flex flex-col gap-1 p-2"
        aria-label="Toggle menu"
      >
        <span
          className={`w-6 h-0.5 bg-gray-700 transition-transform ${
            isMenuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span
          className={`w-6 h-0.5 bg-gray-700 transition-opacity ${
            isMenuOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`w-6 h-0.5 bg-gray-700 transition-transform ${
            isMenuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden z-50 border-t">
          <nav className="flex flex-col p-4 space-y-4">
            <Link
              href="#"
              className="text-gray-700 font-medium hover:text-green-600 transition"
            >
              Tentang
            </Link>
            <Link
              href="#"
              className="text-gray-700 font-medium hover:text-green-600 transition"
            >
              Fitur
            </Link>
            <Link
              href="#"
              className="text-gray-700 font-medium hover:text-green-600 transition"
            >
              Layanan
            </Link>
            <Link
              href="#"
              className="text-gray-700 font-medium hover:text-green-600 transition"
            >
              Kontak
            </Link>
            <Link href="/login">
              <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-900 transition w-full">
                For User →
              </button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
