'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const router = useRouter()

  const validatePassword = (password) => {
    const minLength = password.length >= 8
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    
    return {
      isValid: minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar,
      errors: {
        minLength,
        hasUppercase,
        hasLowercase,
        hasNumber,
        hasSpecialChar
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nama lengkap wajib diisi'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = 'Email wajib diisi'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Masukkan alamat email yang valid'
    }

    // Password validation
    const passwordValidation = validatePassword(formData.password)
    if (!formData.password) {
      newErrors.password = 'Password wajib diisi'
    } else if (!passwordValidation.isValid) {
      newErrors.password = 'Password tidak memenuhi persyaratan'
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password wajib diisi'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSuccessMessage('')

    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          password: formData.password
        })
      })

      const data = await response.json()

      if (response.ok) {
        setSuccessMessage('Akun berhasil dibuat! Mengalihkan ke halaman login...')
        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: ''
        })
        setErrors({})
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          router.push('/auth/login')
        }, 2000)
        
      } else {
        // Handle specific error cases
        if (response.status === 409) {
          setErrors({ email: 'Email sudah terdaftar' })
        } else if (response.status === 400) {
          setErrors({ submit: data.error || 'Semua bidang wajib diisi' })
        } else {
          setErrors({ submit: data.error || 'Pendaftaran gagal. Silakan coba lagi.' })
        }
      }
      
    } catch (error) {
      console.error('Registration error:', error)
      setErrors({ submit: 'Terjadi kesalahan jaringan. Periksa koneksi dan coba lagi.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const passwordValidation = validatePassword(formData.password)

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-8 lg:px-12 lg:py-0">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 lg:mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Buat Akun Baru</h2>
          <p className="text-gray-600 text-sm lg:text-base">
            Sudah punya akun?{' '}
            <Link href="/auth/login" className="text-green-600 hover:text-green-700 font-medium">
              Masuk Sekarang
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">
              NAMA LENGKAP
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              className={`w-full px-3 py-2 lg:px-4 lg:py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-sm lg:text-base text-black placeholder:text-gray-400 ${
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">
              EMAIL
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="nama@email.com"
              className={`w-full px-3 py-2 lg:px-4 lg:py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-sm lg:text-base text-black placeholder:text-gray-400 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">
              PASSWORD
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Buat password"
                className={`w-full px-3 py-2 lg:px-4 lg:py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-sm lg:text-base text-black placeholder:text-gray-400 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
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
            {formData.password && (
              <div className="mt-2 space-y-1">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${passwordValidation.errors.minLength ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className={`text-xs ${passwordValidation.errors.minLength ? 'text-green-600' : 'text-gray-500'}`}>
                    Minimal 8 karakter
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${passwordValidation.errors.hasUppercase ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className={`text-xs ${passwordValidation.errors.hasUppercase ? 'text-green-600' : 'text-gray-500'}`}>
                    Satu huruf besar
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${passwordValidation.errors.hasLowercase ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className={`text-xs ${passwordValidation.errors.hasLowercase ? 'text-green-600' : 'text-gray-500'}`}>
                    Satu huruf kecil
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${passwordValidation.errors.hasNumber ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className={`text-xs ${passwordValidation.errors.hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                    Satu angka
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${passwordValidation.errors.hasSpecialChar ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className={`text-xs ${passwordValidation.errors.hasSpecialChar ? 'text-green-600' : 'text-gray-500'}`}>
                    Satu karakter khusus
                  </span>
                </div>
              </div>
            )}
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-xs lg:text-sm font-medium text-gray-700 mb-2">
              KONFIRMASI PASSWORD
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Konfirmasi password"
                className={`w-full px-3 py-2 lg:px-4 lg:py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-sm lg:text-base text-black placeholder:text-gray-400 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}

          {successMessage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-600">{successMessage}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full font-semibold py-2.5 lg:py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm lg:text-base ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isSubmitting ? 'Membuat Akun...' : 'Buat Akun'}
          </button>
        </form>

        <div className="mt-6 lg:mt-8 text-center">
          <p className="text-gray-500 text-xs lg:text-sm">
            Dengan membuat akun, Anda menyetujui Syarat dan Ketentuan kami
          </p>
        </div>
      </div>
    </div>
  )
}
