"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    // UI-only: pretend we sent a reset link and navigate to reset page
    setSent(true)
    setTimeout(() => {
      router.push(`/reset-password?email=${encodeURIComponent(email)}`)
    }, 900)
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
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 drop-shadow-lg">Forgot Password</h1>
          <p className="text-white/70 text-xs sm:text-sm drop-shadow">We'll help you reset your password</p>
        </div>

        <Card className="border border-white/10 bg-white backdrop-blur-xl shadow-2xl rounded-lg overflow-hidden">
          <CardHeader className="space-y-1 p-4 sm:p-6 border-b border-gray-100">
            <CardTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#7d1d3d] to-[#3d0814] bg-clip-text text-transparent">
              Reset Your Password
            </CardTitle>
            <CardDescription className="text-gray-600 text-sm">
              Enter your email and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-800 font-semibold text-sm">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={sent}
                  className="border-2 border-gray-200 focus:border-[#7d1d3d] focus:ring-2 focus:ring-[#7d1d3d]/20 rounded-lg h-11 transition-all placeholder:italic"
                />
              </div>

              <Button 
                type="submit"
                disabled={sent}
                className="w-full bg-gradient-to-r from-[#7d1d3d] to-[#5a0a1f] hover:from-[#6a1834] hover:to-[#4a0919] text-white font-bold h-12 sm:h-13 text-sm sm:text-base shadow-xl rounded-lg transition-all duration-200 hover:shadow-2xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sent ? "Sending..." : "Send Reset Link"}
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
