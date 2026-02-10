"use client";

import { CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ApprovalPending() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [emailVerified, setEmailVerified] = useState<boolean | null>(null);

  useEffect(() => {
    // If user is on this page, their email MUST be verified
    // (they would have gotten the "email not verified" error during login)
    setEmailVerified(true);
    localStorage.setItem('email_verified', 'true');

    // Clear authentication on mount
    const clearAuth = async () => {
      try {
        // Call logout endpoint to clear server-side token
        await fetch('/api/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        // Clear localStorage
        localStorage.removeItem('user_role');
      }
    };

    clearAuth();
  }, []);

  const handleBackToLogin = async () => {
    setIsLoggingOut(true);
    try {
      // Call logout to clear the token
      await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear localStorage
      localStorage.removeItem('user_role');
      // Navigate to login
      router.push("/");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center px-4 py-4 sm:p-6 bg-gradient-to-br from-[#8B2846] via-[#6B2137] to-[#4A1828] relative overflow-hidden">
      {/* Decorative gradient elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#B03060]/30 to-[#8B2846]/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#8B2846]/30 to-[#6B2137]/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-[#B03060]/10 via-transparent to-[#6B2137]/10"></div>

      <div className="w-full max-w-md relative z-10 text-center">
        {/* Status Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-amber-100">
          {emailVerified === true ? (
            <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
          ) : emailVerified === false ? (
            <AlertCircle className="h-8 w-8 sm:h-10 sm:w-10 text-red-600" />
          ) : (
            <div className="h-8 w-8 sm:h-10 sm:w-10 border-4 border-amber-300 border-t-amber-600 rounded-full animate-spin" />
          )}
        </div>

        {/* Email Verification Status */}
        <div className="mb-4">
          {emailVerified === true ? (
            <p className="text-green-400 text-sm sm:text-base font-semibold">✓ Email Verified</p>
          ) : emailVerified === false ? (
            <p className="text-red-400 text-sm sm:text-base font-semibold">✗ Email Not Verified</p>
          ) : null}
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3 drop-shadow-lg">
          Account Under Review
        </h1>

        {/* Description */}
        <p className="text-white/80 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed drop-shadow">
          Thank you for registering! Your account is currently under review by our administration team. We will verify your information and notify you once your account has been approved.
        </p>

        {/* What happens next */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <h3 className="text-white font-semibold mb-3">What happens next?</h3>
          <ul className="text-white/70 text-sm sm:text-base space-y-2 text-left">
            <li className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${emailVerified === true ? 'bg-green-400' : 'bg-amber-400'}`}></span>
              <span className={emailVerified === true ? 'text-green-300' : ''}>Your email has been verified</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
              Our team will review your registration details
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
              You will receive an email when your account is approved
            </li>
          </ul>
        </div>

        {/* Back to Login Button */}
        <Button
          onClick={handleBackToLogin}
          disabled={isLoggingOut}
          className="w-full bg-gradient-to-r from-[#7d1d3d] to-[#5a0a1f] hover:from-[#6a1834] hover:to-[#4a0919] text-white font-bold h-12 sm:h-13 text-sm sm:text-base shadow-xl rounded-lg transition-all duration-200 hover:shadow-2xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoggingOut ? "Logging out..." : "Back to Login"}
        </Button>

        {/* Footer */}
        <p className="text-center text-white/60 text-xs sm:text-sm mt-6 sm:mt-8 font-medium drop-shadow">
          © 2026 MINSU BSIT INTERN. All rights reserved.
        </p>
      </div>
    </div>
  );
}
