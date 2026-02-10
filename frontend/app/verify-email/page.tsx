"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Image from "next/image";

export default function VerifyEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const [isVerifying, setIsVerifying] = useState(true);
  const [verifyError, setVerifyError] = useState("");
  const [showVerifySuccess, setShowVerifySuccess] = useState(false);
  const [showVerifyError, setShowVerifyError] = useState(false);

  useEffect(() => {
    if (!token) {
      setIsVerifying(false);
      setVerifyError("No verification token provided");
      setShowVerifyError(true);
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/verify-email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Email verification failed");
        }

        // Handle successful verification
        console.log("Email verification successful:", data);
        setShowVerifySuccess(true);
        
        // Redirect to register page with email verified param after 2 seconds
        setTimeout(() => {
          router.push("/?emailVerified=true");
        }, 2000);
        
      } catch (error) {
        setVerifyError(error instanceof Error ? error.message : "An error occurred during verification");
        setShowVerifyError(true);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="h-screen w-full flex items-center justify-center px-4 py-4 sm:p-6 bg-gradient-to-br from-[#8B2846] via-[#6B2137] to-[#4A1828] relative overflow-hidden">
      {/* Decorative gradient elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#B03060]/30 to-[#8B2846]/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#8B2846]/30 to-[#6B2137]/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-[#B03060]/10 via-transparent to-[#6B2137]/10"></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo/Brand Area */}
        <div className="text-center mb-6">
          <div className="inline-block px-3 py-0.5 sm:px-3 sm:py-0.5 bg-white/5 backdrop-blur-xl rounded-3xl mb-4 border border-white/10 shadow-2xl">
            <Image
              src="/logo.png"
              alt="Logo"
              width={120}
              height={120}
              className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
              priority
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow-lg">Verify Email</h1>
          <p className="text-white/70 text-sm drop-shadow">We're verifying your email address</p>
        </div>

        {isVerifying ? (
          <Card className="border border-white/10 bg-white backdrop-blur-xl shadow-2xl rounded-lg overflow-hidden">
            <CardContent className="flex flex-col items-center justify-center space-y-6 p-8">
              <Loader2 className="h-12 w-12 text-[#7d1d3d] animate-spin" />
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Verifying your email...</h2>
                <p className="text-sm text-gray-600">Please wait while we confirm your email address</p>
              </div>
            </CardContent>
          </Card>
        ) : verifyError ? (
          <Card className="border border-white/10 bg-white backdrop-blur-xl shadow-2xl rounded-lg overflow-hidden">
            <CardContent className="flex flex-col items-center justify-center space-y-6 p-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <AlertCircle className="h-10 w-10 text-red-600" />
              </div>
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Verification Failed</h2>
                <p className="text-sm text-gray-600 mb-4">{verifyError}</p>
              </div>
              <Button 
                onClick={() => router.push("/")}
                className="w-full bg-gradient-to-r from-[#7d1d3d] to-[#5a0a1f] hover:from-[#6a1834] hover:to-[#4a0919] text-white font-bold h-12"
              >
                Back to Login
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="border border-white/10 bg-white backdrop-blur-xl shadow-2xl rounded-lg overflow-hidden">
            <CardContent className="flex flex-col items-center justify-center space-y-6 p-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Email Verified!</h2>
                <p className="text-sm text-gray-600">Your email has been successfully verified. Redirecting you to login...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <p className="text-center text-white/80 text-xs sm:text-sm mt-5 pb-2 font-medium drop-shadow">
          © 2026 MINSU BSIT INTERN. All rights reserved.
        </p>
      </div>

      {/* Email Verified Success Modal (shown on login page) */}
      <Dialog open={showVerifySuccess} onOpenChange={setShowVerifySuccess}>
        <DialogContent className="w-[90%] max-w-[380px] rounded-2xl">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
            </div>
            <DialogTitle className="text-center text-xl sm:text-2xl font-bold text-gray-900">
              Email Verified!
            </DialogTitle>
            <DialogDescription className="text-center text-sm sm:text-base text-gray-600 px-2">
              Your email has been successfully verified. Please wait for the admin approval to access your account.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => setShowVerifySuccess(false)}
            className="w-full bg-gradient-to-r from-[#7d1d3d] to-[#5a0a1f] hover:from-[#6a1834] hover:to-[#4a0919] h-11 sm:h-12"
          >
            Continue to Login
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
