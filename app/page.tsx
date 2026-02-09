"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (pwd: string) => {
    if (pwd.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (!/[A-Z]/.test(pwd)) {
      return "Password must contain at least 1 uppercase letter";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) {
      return "Password must contain at least 1 special character";
    }
    return "";
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(validatePassword(newPassword));
  };
  return (
    <div className="h-screen w-full flex items-center justify-center px-4 py-4 sm:p-6 bg-gradient-to-br from-[#8B2846] via-[#6B2137] to-[#4A1828] relative overflow-hidden">
      {/* Decorative gradient elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#B03060]/30 to-[#8B2846]/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#8B2846]/30 to-[#6B2137]/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-[#B03060]/10 via-transparent to-[#6B2137]/10"></div>
      
      <div className="w-full max-w-md relative z-10 overflow-y-auto max-h-[calc(100vh-2rem)] scrollbar-hide">
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
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 drop-shadow-lg">Welcome</h1>
          <p className="text-white/70 text-xs sm:text-sm drop-shadow">Enter your credentials to continue</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[#3d0814]/50 backdrop-blur-xl border border-white/10 mb-3 sm:mb-5 p-1 shadow-xl">
            <TabsTrigger 
              value="login" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7d1d3d] data-[state=active]:to-[#5a0a1f] data-[state=active]:text-white data-[state=active]:shadow-lg text-white/60 font-medium transition-all duration-200"
            >
              Login
            </TabsTrigger>
            <TabsTrigger 
              value="register"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7d1d3d] data-[state=active]:to-[#5a0a1f] data-[state=active]:text-white data-[state=active]:shadow-lg text-white/60 font-medium transition-all duration-200"
            >
              Register
            </TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <Card className="border border-white/10 bg-white backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden">
              <CardHeader className="space-y-1 p-4 sm:p-6 border-b border-gray-100">
                <CardTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#7d1d3d] to-[#3d0814] bg-clip-text text-transparent">
                  Sign In
                </CardTitle>
                <CardDescription className="text-gray-600 text-sm">
                  Enter your email and password to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-800 font-semibold text-sm">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="border-2 border-gray-200 focus:border-[#7d1d3d] focus:ring-2 focus:ring-[#7d1d3d]/20 rounded-lg h-11 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-800 font-semibold text-sm">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="border-2 border-gray-200 focus:border-[#7d1d3d] focus:ring-2 focus:ring-[#7d1d3d]/20 rounded-lg h-11 transition-all"
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-2 border-gray-300 text-[#7d1d3d] focus:ring-[#7d1d3d]/20 transition-all"
                    />
                    <span className="text-gray-600 group-hover:text-gray-800 transition-colors">Remember me</span>
                  </label>
                  <a href="#" className="text-[#7d1d3d] hover:text-[#5a0a1f] font-semibold transition-colors">
                    Forgot password?
                  </a>
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#7d1d3d] to-[#5a0a1f] hover:from-[#6a1834] hover:to-[#4a0919] text-white font-bold h-12 sm:h-13 text-sm sm:text-base shadow-xl rounded-lg transition-all duration-200 hover:shadow-2xl hover:scale-[1.02]"
                >
                  Sign In
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register">
            <Card className="border border-white/10 bg-white backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden">
              <CardHeader className="space-y-1 p-4 sm:p-6 border-b border-gray-100">
                <CardTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#7d1d3d] to-[#3d0814] bg-clip-text text-transparent">
                  Create Account
                </CardTitle>
                <CardDescription className="text-gray-600 text-sm">
                  Fill in your details to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                <div className="space-y-2">
                  <Label htmlFor="fullname" className="text-gray-800 font-semibold text-sm">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullname"
                    type="text"
                    placeholder="John Doe"
                    className="border-2 border-gray-200 focus:border-[#7d1d3d] focus:ring-2 focus:ring-[#7d1d3d]/20 rounded-lg h-11 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-gray-800 font-semibold text-sm">
                    Role <span className="text-red-500">*</span>
                  </Label>
                  <Select>
                    <SelectTrigger className="border-2 border-gray-200 focus:border-[#7d1d3d] focus:ring-2 focus:ring-[#7d1d3d]/20 h-11 rounded-lg transition-all">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="admin-assistant">Admin Assistant</SelectItem>
                      <SelectItem value="accounting-head">Accounting Head</SelectItem>
                      <SelectItem value="accounting-assistant">Accounting Assistant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email" className="text-gray-800 font-semibold text-sm">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="name@example.com"
                    className="border-2 border-gray-200 focus:border-[#7d1d3d] focus:ring-2 focus:ring-[#7d1d3d]/20 rounded-lg h-11 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password" className="text-gray-800 font-semibold text-sm">
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="reg-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={handlePasswordChange}
                      className={`border-2 ${passwordError && password ? 'border-red-500' : 'border-gray-200'} focus:border-[#7d1d3d] focus:ring-2 focus:ring-[#7d1d3d]/20 rounded-lg h-11 pr-10 transition-all`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {passwordError && password && (
                    <p className="text-xs text-red-600 mt-1">{passwordError}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Min 8 characters, 1 uppercase, 1 special character
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-gray-800 font-semibold text-sm">
                    Confirm Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="border-2 border-gray-200 focus:border-[#7d1d3d] focus:ring-2 focus:ring-[#7d1d3d]/20 rounded-lg h-11 pr-10 transition-all"
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
                <div className="flex items-start gap-2 py-1">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-2 border-gray-300 text-[#7d1d3d] focus:ring-[#7d1d3d]/20 mt-0.5 transition-all"
                  />
                  <label className="text-sm text-gray-600 leading-tight">
                    I agree to the{" "}
                    <a href="#" className="text-[#7d1d3d] hover:text-[#5a0a1f] font-semibold transition-colors">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-[#7d1d3d] hover:text-[#5a0a1f] font-semibold transition-colors">
                      Privacy Policy
                    </a>
                  </label>
                </div>
                <Button className="w-full bg-gradient-to-r from-[#7d1d3d] to-[#5a0a1f] hover:from-[#6a1834] hover:to-[#4a0919] text-white font-bold h-12 sm:h-13 text-sm sm:text-base shadow-xl rounded-lg transition-all duration-200 hover:shadow-2xl hover:scale-[1.02]">
                  Create Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <p className="text-center text-white/80 text-xs sm:text-sm mt-3 sm:mt-5 pb-2 font-medium drop-shadow">
          © 2026 MINSU BSIT INTERN. All rights reserved.
        </p>
      </div>
    </div>
  );
}
