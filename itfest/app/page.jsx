"use client";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <section className="text-center py-20 bg-white">
      {/* Bagian Atas */}
      <div>
        <h1 className="mt-50 text-6xl font-extrabold text-green-600">BudgetBuddy</h1>
        <p className="mt-4 text-gray-600">
          Kelola keuangan Anda dengan cerdas dan terkontrol
        </p>
        <button
          onClick={() => router.push("/login")}
          className="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg"
        >
          Mulai Tracking Budget
        </button>
        <p className="mt-4 text-gray-600">
          Gratis • Mudah digunakan • Kontrol penuh atas data Anda
        </p>
      </div>

      {/* Bagian Kedua */}
      <div className="mt-95">
        <h1 className="text-3xl font-bold text-gray-800">
          Mengapa Memilih BudgetBuddy?
        </h1>
        <h2 className="mt-2 text-xl text-gray-600">
          Fitur lengkap untuk membantu Anda mencapai tujuan finansial dengan
          lebih mudah
        </h2>

        {/* Grid Card */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 max-w-7xl mx-auto">
          {/* Card 1 */}
          <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl mb-4 mx-auto">
              🎯
            </div>
            <h3 className="font-bold text-lg text-center mb-2">
              Set Budget Limits
            </h3>
            <p className="text-gray-600 text-sm text-center">
              Tentukan batas budget sesuai dengan kebutuhan finansial Anda.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl mb-4 mx-auto">
              📊
            </div>
            <h3 className="font-bold text-lg text-center mb-2">
              Track Expenses
            </h3>
            <p className="text-gray-600 text-sm text-center">
              Catat dan kategorikan setiap pengeluaran dengan mudah dan akurat.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl mb-4 mx-auto">
              🔔
            </div>
            <h3 className="font-bold text-lg text-center mb-2">
              Smart Notifications
            </h3>
            <p className="text-gray-600 text-sm text-center">
              Dapatkan peringatan otomatis saat pengeluaran mendekati batas.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl mb-4 mx-auto">
              📈
            </div>
            <h3 className="font-bold text-lg text-center mb-2">
              Visual Analytics
            </h3>
            <p className="text-gray-600 text-sm text-center">
              Lihat progress dan analisis pengeluaran dalam grafik yang mudah
              dipahami.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
