// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";

// export default function DashboardPage() {
//   const [budget, setBudget] = useState(0);
//   const [expenses, setExpenses] = useState([]);
//   const [amount, setAmount] = useState("");
//   const [description, setDescription] = useState("");
//   const [editingId, setEditingId] = useState(null);
//   const [editAmount, setEditAmount] = useState("");
//   const [category, setCategory] = useState("");
//   const [editDescription, setEditDescription] = useState("");
//   const [editCategory, setEditCategory] = useState("");

//   const totalSpent = expenses.reduce((acc, cur) => acc + cur.amount, 0);
//   const remaining = budget - totalSpent;
//   const percentUsed = budget > 0 ? (totalSpent / budget) * 100 : 0;

//   useEffect(() => {
//     fetchBudget();
//     fetchExpenses();
//   }, []);

//   const fetchBudget = async () => {
//     const res = await fetch("/api/budget");
//     const data = await res.json();
//     setBudget(data.budget);
//   };

//   const fetchExpenses = async () => {
//     const res = await fetch("/api/expenses");
//     const data = await res.json();
//     setExpenses(data);
//   };

//   const handleAddExpense = async () => {
//     if (!amount || !category) return;
//     if (amount <= 0) return;

//     const res = await fetch("/api/expenses", {
//       method: "POST",
//       body: JSON.stringify({
//         amount: parseInt(amount),
//         description,
//         category,
//       }),
//     });

//     if (res.ok) {
//       setAmount(0);
//       setDescription("");
//       setCategory("");
//       fetchExpenses();

//       Swal.fire({
//         icon: "success",
//         title: "Berhasil!",
//         text: "Pengeluaran telah ditambahkan",
//         confirmButtonColor: "#22c55e",
//         timer: 2000,
//         showConfirmButton: true,
//       });
//     }
//   };

//   const startEdit = (expense) => {
//     setEditingId(expense.id);
//     setEditAmount(expense.amount.toString());
//     setEditDescription(expense.description);
//     setEditCategory(expense.category || "");
//   };

//   const cancelEdit = () => {
//     setEditingId(null);
//     setEditAmount("");
//     setEditDescription("");
//   };

//   const handleSaveEdit = async (id) => {
//     const res = await fetch("/api/expenses", {
//       method: "PATCH",
//       body: JSON.stringify({
//         id,
//         amount: editAmount,
//         description: editDescription,
//         category: editCategory,
//       }),
//     });

//     if (res.ok) {
//       cancelEdit();
//       fetchExpenses();
//       Swal.fire({
//         icon: "success",
//         title: "Berhasil!",
//         text: "Pembaruan Berhasil Dilakukan",
//         confirmButtonColor: "#22c55e",
//         timer: 2000,
//         showConfirmButton: true,
//       });
//     }
//   };

//   const handleDelete = async (id) => {
//     const res = await fetch("/api/expenses", {
//       method: "DELETE",
//       body: JSON.stringify({ id }),
//     });

//     if (res.ok) {
//       fetchExpenses();

//       Swal.fire({
//         icon: "success",
//         title: "Berhasil!",
//         text: "Riwayat Berhasil Dihapus",
//         confirmButtonColor: "#22c55e",
//         timer: 2000,
//         showConfirmButton: true,
//       });
//     }
//   };

//   const getBudgetStatus = () => {
//     const percentLeft = (remaining / budget) * 100;
//     if (percentLeft > 30) {
//       return { label: "Aman", color: "bg-gray-200 text-gray-800" };
//     } else if (percentLeft > 10) {
//       return { label: "Waspada", color: "bg-yellow-200 text-yellow-800" };
//     } else {
//       return { label: "Kritis", color: "bg-red-200 text-red-800" };
//     }
//   };

//   return (
//     <main className="p-8">
//       {/* <h1 className="text-3xl font-bold">BudgetBuddy Dashboard</h1>
//       <p className="mb-4 text-gray-600">
//         Kelola pengeluaran dan pantau budget Anda
//       </p> */}

//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-3xl font-bold text-green-600">
//             BudgetBuddy Dashboard
//           </h1>
//           <p className="text-gray-600">
//             Kelola pengeluaran dan pantau budget Anda
//           </p>
//         </div>

//         {/* Tombol Profil */}
//         <Link href="/profile">
//           <button className="inline-flex items-center justify-center w-10 h-10 rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
//             <span className="text-lg">👤</span>
//           </button>
//         </Link>
//       </div>

//       <div className="grid grid-cols-3 gap-4 mb-6">
//         <div className="bg-white p-4 rounded-xl shadow">
//           <h3 className="text-gray-600">Total Budget</h3>
//           <p className="text-xl font-bold text-green-600">
//             IDR {budget.toLocaleString()}
//           </p>
//         </div>
//         <div className="bg-white p-4 rounded-xl shadow">
//           <h3 className="text-gray-600">Total Pengeluaran</h3>
//           <p className="text-xl font-bold text-red-500">
//             IDR {totalSpent.toLocaleString()}
//           </p>
//         </div>
//         <div className="bg-white p-4 rounded-xl shadow-lg">
//           <h3 className="text-gray-600">Sisa Budget</h3>
//           <p
//             className={`text-xl font-bold ${
//               remaining < 0 ? "text-red-500" : "text-green-600"
//             }`}
//           >
//             IDR {remaining.toLocaleString()}
//           </p>
//           <div
//             className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
//               getBudgetStatus().color
//             }`}
//           >
//             {getBudgetStatus().label}
//           </div>
//         </div>
//       </div>

//       <div className="mb-4 bg-white p-4 rounded-xl shadow">
//         <h1 className="font-semibold mb-2">Progress Budget</h1>
//         <p className="text-sm text-right mt-1 mb-3">
//           {percentUsed.toFixed(1)}% terpakai
//         </p>
//         <div className="w-full bg-gray-200 h-6 rounded-xl overflow-hidden">
//           <div
//             className="h-4 bg-green-500 rounded-xl transition-all duration-300"
//             style={{ width: `${Math.min(percentUsed, 100)}%` }} // ⬅️ dibatasi 100%
//           ></div>
//         </div>
//         <p className="text-sm mt-2 text-right">IDR {budget.toLocaleString()}</p>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div className="bg-white p-6 rounded-xl shadow-md">
//           <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
//             <span className="text-xl">➕</span> Tambah Pengeluaran
//           </h3>

//           {/* Jumlah + Kategori */}
//           <div className="grid grid-cols-2 gap-4 mb-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Jumlah (IDR)
//               </label>
//               <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
//                 <span className="text-gray-400 mr-2">💲</span>
//                 <input
//                   type="number"
//                   className="bg-transparent outline-none w-full"
//                   placeholder="0"
//                   value={amount}
//                   onChange={(e) => {
//                     const val = e.target.value;
//                     if (val === "" || /^[1-9][0-9]*$/.test(val)) {
//                       setAmount(val);
//                     }
//                   }}
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Kategori</label>
//               <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
//                 <span className="text-gray-400 mr-2">🏷️</span>
//                 <select
//                   className="px-3 py-1 w-full"
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                 >
//                   <option value="">Pilih kategori</option>
//                   <option value="makanan">Makanan</option>
//                   <option value="transportasi">Transportasi</option>
//                   <option value="hiburan">Hiburan</option>
//                   <option value="lainnya">Lainnya</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Deskripsi */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1">
//               Deskripsi (Opsional)
//             </label>
//             <input
//               type="text"
//               className="w-full border rounded-lg px-3 py-2 bg-gray-50"
//               placeholder="Deskripsi pengeluaran"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </div>

//           {/* Tombol */}
//           <button
//             onClick={handleAddExpense}
//             disabled={!amount || !category}
//             className={`py-2 w-full rounded-lg flex items-center justify-center gap-2 font-semibold ${
//               !amount || !category
//                 ? "bg-gray-300 text-gray-400 cursor-not-allowed"
//                 : "bg-green-300 hover:bg-green-400 text-green-900"
//             }`}
//           >
//             <span>➕</span> Tambah Pengeluaran
//           </button>
//         </div>

//         <div className="bg-white p-4 rounded-xl shadow">
//           <h3 className="font-bold mb-2">Riwayat Pengeluaran</h3>
//           {expenses.length === 0 ? (
//             <div className="flex flex-col items-center justify-center text-center text-gray-500 py-10">
//               <div className="text-4xl mb-2">💸</div>{" "}
//               {/* Bisa pakai icon SVG juga */}
//               <p className="text-lg font-semibold text-gray-700 mb-1">
//                 Belum ada pengeluaran
//               </p>
//               <p className="text-sm text-gray-500">
//                 Tambahkan pengeluaran pertama Anda di form sebelah kiri
//               </p>
//             </div>
//           ) : (
//             <ul className="space-y-4">
//               {expenses.map((e) => (
//                 <li
//                   key={e.id}
//                   className="bg-gray-50 p-4 rounded-xl shadow-sm flex justify-between items-start"
//                 >
//                   {editingId === e.id ? (
//                     // MODE EDIT
//                     <div className="w-full">
//                       <div className="grid grid-cols-2 gap-4 mb-2">
//                         <input
//                           type="number"
//                           className="border rounded px-3 py-1 w-full"
//                           value={editAmount}
//                           onChange={(e) => setEditAmount(e.target.value)}
//                           placeholder="Jumlah baru"
//                         />
//                         <input
//                           type="text"
//                           className="border rounded px-3 py-1 w-full"
//                           value={editDescription}
//                           onChange={(e) => setEditDescription(e.target.value)}
//                           placeholder="Deskripsi baru"
//                         />
//                       </div>
//                       <div className="flex justify-end gap-2">
//                         <button
//                           onClick={() => handleSaveEdit(e.id)}
//                           className="text-sm text-green-600 hover:text-green-800"
//                         >
//                           Simpan
//                         </button>
//                         <button
//                           onClick={cancelEdit}
//                           className="text-sm text-gray-600 hover:text-gray-800"
//                         >
//                           Batal
//                         </button>
//                       </div>
//                     </div>
//                   ) : (
//                     // MODE BACA (NORMAL)
//                     <>
//                       <div>
//                         <div className="flex items-center gap-2 mb-1">
//                           <span className="capitalize bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">
//                             {e.category || "Lainnya"}
//                           </span>
//                           <span className="text-gray-500 text-sm flex items-center gap-1">
//                             📅 {new Date().toLocaleDateString("id-ID")}
//                           </span>
//                         </div>
//                         <p className="text-sm text-gray-700">
//                           {e.description || "(Tanpa deskripsi)"}
//                         </p>
//                         <p className="text-lg font-bold text-red-500 mt-1">
//                           IDR {e.amount.toLocaleString()}
//                         </p>
//                       </div>

//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => startEdit(e)}
//                           className="text-blue-500 hover:text-blue-700 text-xl"
//                           title="Edit"
//                         >
//                           ✏️
//                         </button>
//                         <button
//                           onClick={() => handleDelete(e.id)}
//                           className="text-red-500 hover:text-red-700 text-xl"
//                           title="Hapus"
//                         >
//                           🗑️
//                         </button>
//                       </div>
//                     </>
//                   )}
//                 </li>
//               ))}
//               <div className="border-t pt-2 mt-8 flex justify-between font-semibold">
//                 <span className="mt-3">Total Pengeluaran:</span>
//                 <span className="mt-3 text-red-600">
//                   IDR {totalSpent.toLocaleString()}
//                 </span>
//               </div>
//             </ul>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }
