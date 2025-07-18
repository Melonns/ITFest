"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  // Simulasi data user
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // Simpan ke backend di sini (misal Supabase)
    console.log("Disimpan:", { name, email });
  };

  return (
    <main className="p-8 bg-green-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => router.back()}
          className="bg-white p-2 rounded-lg shadow text-gray-600 hover:bg-gray-100"
        >
          ←
        </button>
        <div>
          <h1 className="text-2xl font-extrabold text-green-600">
            Profil Saya
          </h1>
          <p className="text-gray-500 text-sm">
            Kelola informasi akun dan preferensi Anda
          </p>
        </div>
      </div>

      {/* Informasi Pribadi & Statistik */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {/* Kiri: Info Pribadi */}
        <div className="md:col-span-2 bg-white rounded-xl p-6 shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-xl flex items-center gap-2">
              👤 Informasi Pribadi
            </h2>
            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className={`px-4 py-1 ${
                isEditing
                  ? "bg-green-100 hover:bg-green-200 text-green-700"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              } text-sm rounded-lg flex items-center gap-1`}
            >
              {isEditing ? "✅ Simpan" : "⚙️ Edit"}
            </button>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-lg">
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-lg">{name}</p>
              <p className="text-sm text-gray-500">{email}</p>
              <p className="text-sm text-gray-400">
                📅 Bergabung sejak January 2024
              </p>
            </div>
          </div>

          <hr className="my-4" />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500 block mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full ${
                  isEditing ? "text-black" : "text-gray-500"
                } bg-gray-50 border rounded-lg px-3 py-2`}
              />
            </div>
            <div>
              <label className="text-sm text-gray-500 block mb-1">Email</label>
              <input
                type="email"
                disabled={!isEditing}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full ${
                  isEditing ? "text-black" : "text-gray-500"
                } bg-gray-50 border rounded-lg px-3 py-2`}
              />
            </div>
          </div>
        </div>

        {/* Statistik */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="font-bold text-xl flex items-center gap-2 mb-4">
            📈 Statistik
          </h2>
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span>Budget Aktif</span>
              <span className="text-green-600 font-semibold">
                IDR 1,000,001
              </span>
            </div>
            <div className="flex justify-between">
              <span>Status</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                Aktif
              </span>
            </div>
            <div className="flex justify-between">
              <span>Total Transaksi</span>
              <span className="font-semibold">0</span>
            </div>
            <div className="flex justify-between">
              <span>Kategori Favorit</span>
              <span>-</span>
            </div>
            <div className="flex justify-between">
              <span>Rata-rata Harian</span>
              <span className="font-semibold">IDR 0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pengaturan */}
      <div className="bg-white rounded-xl p-6 shadow space-y-4">
        <h2 className="font-bold text-xl mb-2">⚙️ Pengaturan Lainnya</h2>

        <div className="flex justify-between items-start border-b pb-4">
          <div>
            <p className="font-medium">Notifikasi Browser</p>
            <p className="text-sm text-gray-500">
              Terima notifikasi ketika mendekati batas budget
            </p>
          </div>
          <span className="bg-gray-100 text-xs px-3 py-1 rounded-full">
            Aktif
          </span>
        </div>

        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium">Mode Gelap</p>
            <p className="text-sm text-gray-500">
              Gunakan tema gelap untuk tampilan yang lebih nyaman
            </p>
          </div>
          <span className="bg-gray-100 text-xs px-3 py-1 rounded-full">
            Otomatis
          </span>
        </div>
      </div>
    </main>
  );
}
