'use client'

export default function UserDashboard() {
  return (
    <div className="mt-6">
      {/* Welcome Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Selamat Datang! 👋
            </h2>
            <p className="text-gray-600">
              Selamat datang di dashboard Anda. Kelola semua aktivitas dan informasi akun Anda di sini.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-4xl">🏠</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <span className="text-2xl">📊</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Dashboard</h3>
              <p className="text-gray-600 text-sm">Kelola aktivitas Anda</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <span className="text-2xl">📈</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">History</h3>
              <p className="text-gray-600 text-sm">Lihat riwayat transaksi</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <span className="text-2xl">💬</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Testimoni</h3>
              <p className="text-gray-600 text-sm">Berikan testimoni Anda</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
