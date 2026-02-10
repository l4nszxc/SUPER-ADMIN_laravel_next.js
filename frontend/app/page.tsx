"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showEmailVerifiedModal, setShowEmailVerifiedModal] = useState(false);
  const [defaultTab, setDefaultTab] = useState<"login" | "register">("login");
  
  // Login form states
  const [email, setEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  
  // Registration form states
  const [fullName, setFullName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");
  
  // Success modal states
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const [showRegisterSuccess, setShowRegisterSuccess] = useState(false);
  const [registrationEmail, setRegistrationEmail] = useState("");
  const [showEmailNotVerified, setShowEmailNotVerified] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState("");

  useEffect(() => {
    // Check if coming from email verification
    if (searchParams.get('emailVerified') === 'true') {
      setShowEmailVerifiedModal(true);
      setDefaultTab('register');
      // Clean up the URL
      window.history.replaceState({}, '', '/');
    }
  }, [searchParams]);

  const validatePassword = (pwd: string) => {
    if (pwd.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (!/[A-Z]/.test(pwd)) {
      return "Password must contain at least 1 uppercase letter";
    }
    if (!/[a-z]/.test(pwd)) {
      return "Password must contain at least 1 lowercase letter";
    }
    if (!/[0-9]/.test(pwd)) {
      return "Password must contain at least 1 number";
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");

    try {
      const res = await fetch(
        `/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email, password: loginPassword }),
        }
      );

      const data = await res.json();

      // Handle 403 - Not verified/approved or email not verified
      if (res.status === 403) {
        // Clear authentication
        localStorage.removeItem('user_role');
        
        // Check if it's email not verified
        if (data.message && data.message.toLowerCase().includes("email") && data.message.toLowerCase().includes("verif")) {
          setUnverifiedEmail(email);
          setShowEmailNotVerified(true);
          return;
        }
        
        // Store email verification status if available
        if (data.email_verified_at) {
          localStorage.setItem('email_verified', 'true');
        } else {
          localStorage.setItem('email_verified', 'false');
        }
        
        // Otherwise redirect to approval pending page
        router.push('/super-admin/approval-pending');
        return;
      }

      // Handle 409 - Already logged in
      if (res.status === 409) {
        throw new Error("You are already logged in. Please logout first.");
      }

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Handle successful login - Check if user is approved
      console.log("Login successful:", data);

      // Check if user is approved by admin
      if (!data.is_approved && !data.approved) {
        // Store email verification status
        if (data.email_verified_at) {
          localStorage.setItem('email_verified', 'true');
        } else {
          localStorage.setItem('email_verified', 'false');
        }
        
        // Clear authentication
        localStorage.removeItem('user_role');
        // User not approved, redirect to approval pending page
        router.push('/super-admin/approval-pending');
        return;
      }

      // Store user role in localStorage (safe to store non-sensitive data)
      if (data.role) {
        localStorage.setItem('user_role', data.role);
      }

      setShowLoginSuccess(true);
      
      setTimeout(() => {
        switch (data.role) {
          case 'admin':
            router.push('/admin');
            break;
          case 'admin_assistant':
            router.push('/admin-assistant');
            break;
          case 'accounting_head':
            router.push('/super-admin');
            break;
          case 'accounting_assistant':
            router.push('/super-admin');
            break;
          default:
            router.push('/admin');
        }
      }, 2000);
      
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegisterLoading(true);
    setRegisterError("");

    // Validate password match
    if (password !== confirmPassword) {
      setRegisterError("Passwords do not match");
      setIsRegisterLoading(false);
      return;
    }

    // Validate password requirements
    if (passwordError) {
      setRegisterError("Please fix password requirements");
      setIsRegisterLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: fullName,
            email: regEmail,
            password: password,
            password_confirmation: confirmPassword,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Handle successful registration
      console.log("Registration successful:", data);
      setRegistrationEmail(regEmail);
      setShowRegisterSuccess(true);
      // Don't redirect, keep the modal showing
      // User will click verification link in their email
      
    } catch (error) {
      setRegisterError(error instanceof Error ? error.message : "An error occurred during registration");
    } finally {
      setIsRegisterLoading(false);
    }
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

        <Tabs defaultValue={defaultTab} className="w-full">
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
            <Card className="border border-white/10 bg-white backdrop-blur-xl shadow-2xl rounded-lg overflow-hidden">
              <CardHeader className="space-y-1 p-4 sm:p-6 border-b border-gray-100">
                <CardTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#7d1d3d] to-[#3d0814] bg-clip-text text-transparent">
                  Sign In
                </CardTitle>
                <CardDescription className="text-gray-600 text-sm">
                  Enter your email and password to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                {loginError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {loginError}
                  </div>
                )}
                <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
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
                      disabled={isLoading}
                      className="border-2 border-gray-200 focus:border-[#7d1d3d] focus:ring-2 focus:ring-[#7d1d3d]/20 rounded-lg h-11 transition-all placeholder:italic"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-800 font-semibold text-sm">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showLoginPassword ? "text" : "password"}
                        placeholder="Input Password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                        disabled={isLoading}
                        className="border-2 border-gray-200 focus:border-[#7d1d3d] focus:ring-2 focus:ring-[#7d1d3d]/20 rounded-lg h-11 pr-10 transition-all placeholder:italic"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-2 border-gray-300 text-[#7d1d3d] focus:ring-[#7d1d3d]/20 transition-all"
                    />
                    <span className="text-gray-600 group-hover:text-gray-800 transition-colors">Remember me</span>
                  </label>
                  <button 
                    type="button"
                    onClick={() => router.push('/forgot-password')} 
                    className="text-[#7d1d3d] hover:text-[#5a0a1f] font-semibold transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[#7d1d3d] to-[#5a0a1f] hover:from-[#6a1834] hover:to-[#4a0919] text-white font-bold h-12 sm:h-13 text-sm sm:text-base shadow-xl rounded-lg transition-all duration-200 hover:shadow-2xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register">
            <Card className="border border-white/10 bg-white backdrop-blur-xl shadow-2xl rounded-lg overflow-hidden">
              <CardHeader className="space-y-1 p-4 sm:p-6 border-b border-gray-100">
                <CardTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#7d1d3d] to-[#3d0814] bg-clip-text text-transparent">
                  Create Account
                </CardTitle>
                <CardDescription className="text-gray-600 text-sm">
                  Fill in your details to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                {registerError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {registerError}
                  </div>
                )}
                <form onSubmit={handleRegister} className="space-y-3 sm:space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullname" className="text-gray-800 font-semibold text-sm">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullname"
                      type="text"
                      placeholder="e.g. Juan Dela Cruz"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      disabled={isRegisterLoading}
                      className="border-2 border-gray-200 focus:border-[#7d1d3d] focus:ring-2 focus:ring-[#7d1d3d]/20 rounded-lg h-11 transition-all placeholder:italic"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email" className="text-gray-800 font-semibold text-sm">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="name@example.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      required
                      disabled={isRegisterLoading}
                      className="border-2 border-gray-200 focus:border-[#7d1d3d] focus:ring-2 focus:ring-[#7d1d3d]/20 rounded-lg h-11 transition-all placeholder:italic"
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
                        placeholder="Input Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        disabled={isRegisterLoading}
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
                      ✓ Minimum 8 characters
                    </p>
                    <p className={`${/[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-500'} transition-colors`}>
                      ✓ 1 uppercase letter
                    </p>
                    <p className={`${/[a-z]/.test(password) ? 'text-green-600' : 'text-gray-500'} transition-colors`}>
                      ✓ 1 lowercase letter
                    </p>
                    <p className={`${/[0-9]/.test(password) ? 'text-green-600' : 'text-gray-500'} transition-colors`}>
                      ✓ 1 number
                    </p>
                    <p className={`${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-green-600' : 'text-gray-500'} transition-colors`}>
                      ✓ 1 special character
                    </p>
                  </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-gray-800 font-semibold text-sm">
                      Confirm Password <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        disabled={isRegisterLoading}
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
                    disabled={isRegisterLoading || !!passwordError}
                    className="w-full bg-gradient-to-r from-[#7d1d3d] to-[#5a0a1f] hover:from-[#6a1834] hover:to-[#4a0919] text-white font-bold h-12 sm:h-13 text-sm sm:text-base shadow-xl rounded-lg transition-all duration-200 hover:shadow-2xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isRegisterLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <p className="text-center text-white/80 text-xs sm:text-sm mt-3 sm:mt-5 pb-2 font-medium drop-shadow">
          © 2026 MINSU BSIT INTERN. All rights reserved.
        </p>
      </div>

      {/* Login Success Modal */}
      <Dialog open={showLoginSuccess} onOpenChange={setShowLoginSuccess}>
        <DialogContent className="w-[90%] max-w-[380px] rounded-2xl">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
            </div>
            <DialogTitle className="text-center text-xl sm:text-2xl font-bold text-gray-900">
              Login Successful!
            </DialogTitle>
            <DialogDescription className="text-center text-sm sm:text-base text-gray-600 px-2">
              Welcome back! You have successfully logged into your account.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => setShowLoginSuccess(false)}
            className="w-full bg-gradient-to-r from-[#7d1d3d] to-[#5a0a1f] hover:from-[#6a1834] hover:to-[#4a0919] h-11 sm:h-12"
          >
            Continue
          </Button>
        </DialogContent>
      </Dialog>

      {/* Register Success Modal */}
      <Dialog open={showRegisterSuccess} onOpenChange={setShowRegisterSuccess}>
        <DialogContent className="w-[90%] max-w-[380px] rounded-2xl">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-blue-100">
              <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600" />
            </div>
            <DialogTitle className="text-center text-xl sm:text-2xl font-bold text-gray-900">
              Registration Successful!
            </DialogTitle>
            <DialogDescription className="text-center text-sm sm:text-base text-gray-600 px-2 space-y-3 py-3">
              <p>
                A verification email has been sent to <span className="font-semibold text-gray-900">{registrationEmail}</span>
              </p>
              <p>
                Please check your email and click the verification link to confirm your account. After verification, please wait for admin approval to access your account.
              </p>
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => {
              setShowRegisterSuccess(false);
              setFullName("");
              setRegEmail("");
              setPassword("");
              setConfirmPassword("");
            }}
            className="w-full bg-gradient-to-r from-[#7d1d3d] to-[#5a0a1f] hover:from-[#6a1834] hover:to-[#4a0919] h-11 sm:h-12"
          >
            OK
          </Button>
        </DialogContent>
      </Dialog>

      {/* Email Not Verified Modal */}
      <Dialog open={showEmailNotVerified} onOpenChange={setShowEmailNotVerified}>
        <DialogContent className="w-[90%] max-w-[380px] rounded-2xl">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-amber-100">
              <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10 text-amber-600" />
            </div>
            <DialogTitle className="text-center text-xl sm:text-2xl font-bold text-gray-900">
              Email Not Verified
            </DialogTitle>
            <DialogDescription className="text-center text-sm sm:text-base text-gray-600 px-2 space-y-3 py-3">
              <p>
                Your email address hasn't been verified yet.
              </p>
              <p>
                Please check your inbox for a verification email sent to <span className="font-semibold text-gray-900">{unverifiedEmail}</span> and click the verification link to confirm your account.
              </p>
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => setShowEmailNotVerified(false)}
            className="w-full bg-gradient-to-r from-[#7d1d3d] to-[#5a0a1f] hover:from-[#6a1834] hover:to-[#4a0919] h-11 sm:h-12"
          >
            OK
          </Button>
        </DialogContent>
      </Dialog>

      {/* Email Verified Successfully Modal */}
      <Dialog open={showEmailVerifiedModal} onOpenChange={setShowEmailVerifiedModal}>
        <DialogContent className="w-[90%] max-w-[380px] rounded-2xl">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
            </div>
            <DialogTitle className="text-center text-xl sm:text-2xl font-bold text-gray-900">
              Email Verified Successfully!
            </DialogTitle>
            <DialogDescription className="text-center text-sm sm:text-base text-gray-600 px-2 space-y-3 py-3">
              <p>
                Your email has been successfully verified.
              </p>
              <p>
                Your account is now pending admin approval. You will be able to login once the admin approves your account.
              </p>
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => setShowEmailVerifiedModal(false)}
            className="w-full bg-gradient-to-r from-[#7d1d3d] to-[#5a0a1f] hover:from-[#6a1834] hover:to-[#4a0919] h-11 sm:h-12"
          >
            OK
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
