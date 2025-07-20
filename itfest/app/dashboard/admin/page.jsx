// 'use client'

// import { useState } from "react";
// import AdminDashboardOverview from "./components/AdminDashboardOverview";

// // Helper function untuk memformat tanggal ke YYYY-MM-DD
// const formatDateForInput = (date) => date.toISOString().split('T')[0];

// const getDefaultDateRange = () => {
//   const now = new Date();
//   // Tanggal pertama di bulan ini
//   const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
//   // Tanggal terakhir di bulan ini
//   const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
//   return {
//     startDate: formatDateForInput(startDate),
//     endDate: formatDateForInput(endDate),
//   };
// };

// export default function AdminHomePage() {
//   // State untuk rentang tanggal, diinisialisasi dengan bulan ini sebagai default
//   const [dateRange, setDateRange] = useState(getDefaultDateRange());

//   // Handler yang akan dipanggil oleh komponen DateRangeFilter
//   const handleDateChange = (newRange) => {
//     setDateRange(newRange);
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold mb-1 text-black">Welcome, Admin!</h1>
//         <p className="text-black">
//           This is your admin dashboard. You can monitor key metrics below.
//         </p>
//       </div>

//       {/* Kirim state tanggal ke komponen overview */}
//       <AdminDashboardOverview dateRange={dateRange} />
//     </div>
//   );
// }
