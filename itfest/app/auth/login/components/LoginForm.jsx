"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Check credentials and determine role
      let role = null;

      if (formData.email === "member@gmail.com" && formData.password === "123") {
        role = "user";
      } else if (formData.email === "admin@gmail.com" && formData.password === "1234") {
        role = "admin";
      } else {
        throw new Error("Email atau password salah");
      }

      // Create a simple JWT-like payload
      const payload = {
        email: formData.email,
        role: role,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
      };

      // Set cookie (simplified - in production use httpOnly cookies)
      document.cookie = `token=${btoa(JSON.stringify(payload))}; path=/; max-age=86400`;

      // Redirect based on role
      if (role === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/user");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-8 lg:px-12 lg:py-0">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 lg:mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Selamat Datang Kembali
          </h2>
          <p className="text-gray-600 text-sm lg:text-base">
            Baru di BudgetBuddy?{" "}
            <Link
              href="/auth/register"
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Daftar Sekarang
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-xs lg:text-sm font-medium text-gray-700 mb-2"
            >
              EMAIL
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="nama@email.com"
              className="w-full px-3 py-2 lg:px-4 lg:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors text-sm lg:text-base text-black placeholder:text-gray-400"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs lg:text-sm font-medium text-gray-700 mb-2"
            >
              PASSWORD
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan password"
                className="w-full px-3 py-2 lg:px-4 lg:py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors text-sm lg:text-base text-black placeholder:text-gray-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white font-semibold py-2.5 lg:py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm lg:text-base"
          >
            {isLoading ? "Masuk..." : "Masuk"}
          </button>
        </form>

        <div className="mt-6 lg:mt-8 text-center">
          <p className="text-gray-500 text-xs lg:text-sm">
            Kelola budget Anda dengan aman dan mudah
          </p>
        </div>
      </div>
    </div>
  );
}
