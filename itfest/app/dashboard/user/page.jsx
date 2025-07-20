// File: /app/dashboard/user/page.jsx
import UserDashboard from './components/UserDashboard';

export default function UserHomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-black">Dasbor Saya</h1>
      <p className="text-gray-600">Lihat dan kelola status langganan Anda di bawah ini.</p>
      
      {/* Cukup panggil satu komponen pintar ini */}
      <UserDashboard />
    </div>
  );
}
