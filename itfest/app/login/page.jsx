"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // TODO: Tambahkan logika autentikasi
    if (email && password) {
      // Simulasi login sukses
      router.push("/dashboard");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-100 via-green-50 to-white px-4">
      {/* Tombol Kembali */}
      <div className="absolute top-6 left-6 text-sm text-green-600 flex items-center gap-1 cursor-pointer">
        <span>←</span> <span>Kembali</span>
      </div>

      {/* Logo */}
      <div className="bg-green-500 rounded-full p-4 mb-4">
        <span className="text-white text-2xl">🐷</span>
      </div>

      <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-500 mb-4">
        Masuk ke BudgetBuddy
      </h1>

      {/* Card Form */}
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-xl mt-6 p-6 w-full max-w-md"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          Selamat Datang Kembali
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Masuk untuk melanjutkan tracking budget Anda
        </p>

        <label className="block mb-2 font-medium text-sm">Email</label>
        <input
          type="email"
          className="w-full mb-4 px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none"
          placeholder="nama@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2 font-medium text-sm">Password</label>
        <input
          type="password"
          className="w-full mb-6 px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none"
          placeholder="Masukkan password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-semibold py-2 rounded-lg"
        >
          Masuk
        </button>

        <p className="text-sm text-center mt-4">
          Belum punya akun?{" "}
          <a href="/register" className="text-green-600 font-semibold">
            Daftar sekarang
          </a>
        </p>
      </form>
    </main>
  );
}
