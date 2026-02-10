"use client"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import Image from "next/image"

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const emailFromQuery = searchParams.get("email") || ""

  const [email] = useState(emailFromQuery)
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    setError("")
  }, [password, confirm])

  const validatePassword = (pwd: string) => {
    if (pwd.length < 8) {
      return "Password must be at least 8 characters"
    }
    if (!/[A-Z]/.test(pwd)) {
      return "Password must contain at least 1 uppercase letter"
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) {
      return "Password must contain at least 1 special character"
    }
    return ""
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const validationError = validatePassword(password)
    if (validationError) {
      setError(validationError)
      return
    }
    if (password !== confirm) {
      setError("Passwords do not match")
      return
    }
    // UI-only: show success state
    setSubmitted(true)
    setTimeout(() => {
      router.push("/")
    }, 1200)
  }

  return (
    <div className="h-screen w-full flex items-center justify-center px-4 py-4 sm:p-6 bg-gradient-to-br from-[#8B2846] via-[#6B2137] to-[#4A1828] relative overflow-hidden">
      {/* Decorative gradient elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#B03060]/30 to-[#8B2846]/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#8B2846]/30 to-[#6B2137]/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-[#B03060]/10 via-transparent to-[#6B2137]/10"></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo/Brand Area */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-block px-3 py-0.5 sm:px-3 sm:py-0.5 bg-white/5 backdrop-blur-xl rounded-3xl mb-2 sm:mb-4 border border-white/10 shadow-2xl">
            <Image
              src="/logo.png"
              alt="Logo"
              width={120}
              height={120}
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
              priority
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 drop-shadow-lg">Reset Password</h1>
          <p className="text-white/70 text-xs sm:text-sm drop-shadow">Create a new secure password</p>
        </div>

        <Card className="border border-white/10 bg-white backdrop-blur-xl shadow-2xl rounded-lg overflow-hidden">
          <CardHeader className="space-y-1 p-4 sm:p-6 border-b border-gray-100">
            <CardTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#7d1d3d] to-[#3d0814] bg-clip-text text-transparent">
              Create New Password
            </CardTitle>
            <CardDescription className="text-gray-600 text-sm">
              Set a new password for {email || "your account"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-800 font-semibold text-sm">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={submitted}
                    className="border-2 border-gray-200 focus:border-[#7d1d3d] focus:ring-2 focus:ring-[#7d1d3d]/20 rounded-lg h-11 pr-10 transition-all placeholder:italic"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="text-xs space-y-1 mt-2">
                  <p className={`${password.length >= 8 ? 'text-green-600' : 'text-gray-500'} transition-colors`}>
                    ✓ Minimum of 8 characters
                  </p>
                  <p className={`${/[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-500'} transition-colors`}>
                    ✓ 1 uppercase letter
                  </p>
                  <p className={`${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-green-600' : 'text-gray-500'} transition-colors`}>
                    ✓ 1 special character
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm" className="text-gray-800 font-semibold text-sm">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirm"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                    disabled={submitted}
                    className="border-2 border-gray-200 focus:border-[#7d1d3d] focus:ring-2 focus:ring-[#7d1d3d]/20 rounded-lg h-11 pr-10 transition-all placeholder:italic"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit"
                disabled={submitted}
                className="w-full bg-gradient-to-r from-[#7d1d3d] to-[#5a0a1f] hover:from-[#6a1834] hover:to-[#4a0919] text-white font-bold h-12 sm:h-13 text-sm sm:text-base shadow-xl rounded-lg transition-all duration-200 hover:shadow-2xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitted ? "Resetting..." : "Reset Password"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => router.push('/')}
                className="inline-flex items-center gap-2 text-[#7d1d3d] hover:text-[#5a0a1f] font-semibold text-sm transition-colors"
              >
                <ArrowLeft size={16} />
                Back to login
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
