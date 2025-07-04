"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { signIn, signUp } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const [fade, setFade] = useState(true);
  const [swipeDir, setSwipeDir] = useState<'left' | 'right' | null>(null);
  const [rightFade, setRightFade] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Role selection (STUDENT by default)
  const [role, setRole] = useState<"STUDENT" | "MENTOR">("STUDENT");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const validateForm = () => {
    if (!isLogin) {
      if (!formData.username?.trim()) {
        setError("Username is required");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return false;
      }
    }

    if (!formData.email?.trim()) {
      setError("Email is required");
      return false;
    }

    if (!formData.password?.trim()) {
      setError("Password is required");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    if (!role) {
      setError("Please select a role");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (isLogin) {
        // Sign in
        const result = await signIn.email({
          email: formData.email,
          password: formData.password,
        });

        if (result.error) {
          setError(result.error.message || "Failed to sign in");
        } else {
          setSuccess("Signed in successfully!");
          // Redirect to the dashboard and let client-side routing handle role-based navigation
          router.push("/dashboard");
        }
      } else {
        // Sign up
        console.log("Attempting signup with:", {
          email: formData.email,
          name: formData.username,
        });
        const signupPayload: {
          email: string;
          password: string;
          name: string;
          role: string;
        } = {
          email: formData.email,
          password: formData.password,
          name: formData.username,
          role,
        };
        const result = await (
          signUp.email as (
            payload: typeof signupPayload
          ) => Promise<{ error?: { message: string } }>
        )(signupPayload);

        console.log("Signup result:", result);
        if (result.error) {
          console.error("Signup error:", result.error);
          setError(result.error.message || "Failed to create account");
        } else {
          setSuccess("Account created successfully! You can now sign in.");
          // Optionally auto-switch the form to Login after signup
          setTimeout(() => {
            setIsLogin(true);
            setSuccess("");
          }, 2000);
        }
      }
    } catch (err) {
      console.error("Auth error details:", err);
      setError("An unexpected error occurred. Please try again.");
    }

    setIsLoading(false);
  };

  const handleSwitch = (login: boolean) => {
    setSwipeDir(login ? 'left' : 'right');
    setFade(false);
    setRightFade(false);
    setTimeout(() => {
      setIsLogin(login);
      setFade(true);
      setRightFade(true);
      setSwipeDir(null);
      setError("");
      setSuccess("");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3">
                <img
                  src="/sfinal.png"
                  alt="Synora Logo"
                  className="w-12 h-12 rounded-md shadow object-contain p-0"
                />
                <div className="flex flex-col justify-center">
                  <span className="text-2xl font-bold text-gray-900 font-inter leading-tight">
                    Synora
                  </span>
                  <span className="text-base text-gray-400 leading-tight">
                    by Hacktastic
                  </span>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                className="bg-[#FFB74D] text-[#A63D00] font-bold border-2 border-[#A63D00] shadow-[6px_6px_0px_0px_#000000] hover:bg-[#FFF8E1] hover:shadow-[3px_3px_0px_0px_#000000] hover:translate-x-1 hover:translate-y-1 transition-all duration-150 px-6 py-2 text-base flex items-center"
              >
                <Link href="/" className="flex items-center">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                {isLogin ? "Welcome Back!" : "Join Synora"}
              </h2>
              <p className="text-gray-600">
                {isLogin
                  ? "Sign in to continue your journey"
                  : "Start your adventure with us"}
              </p>
            </div>

            {/* Success/Error Messages */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
                {success}
              </div>
            )}

            {/* Toggle Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => handleSwitch(false)}
                className={`flex-1 py-2 px-4 rounded-md text-base font-bold border-2 border-[#A63D00] shadow-[6px_6px_0px_0px_#000000] transition-all duration-150
                  ${!isLogin
                    ? 'bg-[#A63D00] text-white hover:bg-[#A63D00]/90'
                    : 'bg-[#FFF8E1] text-[#A63D00] hover:bg-white hover:shadow-[3px_3px_0px_0px_#000000] hover:translate-x-1 hover:translate-y-1'}
                `}
              >
                Register
              </button>
              <button
                type="button"
                onClick={() => handleSwitch(true)}
                className={`flex-1 py-2 px-4 rounded-md text-base font-bold border-2 border-[#A63D00] shadow-[6px_6px_0px_0px_#000000] transition-all duration-150
                  ${isLogin
                    ? 'bg-[#A63D00] text-white hover:bg-[#A63D00]/90'
                    : 'bg-[#FFF8E1] text-[#A63D00] hover:bg-white hover:shadow-[3px_3px_0px_0px_#000000] hover:translate-x-1 hover:translate-y-1'}
                `}
              >
                Login
              </button>
            </div>

            <div className={`transition-all duration-500
              ${fade ? 'opacity-100 translate-x-0' : swipeDir === 'left' ? 'opacity-0 -translate-x-16' : swipeDir === 'right' ? 'opacity-0 translate-x-16' : ''}
            `}>
              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <>
                    {/* Username */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Username *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          placeholder="Choose a unique username"
                          className="pl-10 border-2 border-gray-200 focus:border-[#A63D00] focus:ring-[#A63D00]/20"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="pl-10 border-2 border-gray-200 focus:border-[#A63D00] focus:ring-[#A63D00]/20"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 border-2 border-gray-200 focus:border-[#A63D00] focus:ring-[#A63D00]/20"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password (Register only) */}
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm your password"
                        className="pl-10 pr-10 border-2 border-gray-200 focus:border-[#A63D00] focus:ring-[#A63D00]/20"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                )}

                {/* Role Selection */}
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Select Role *
                    </label>
                    <div className="flex space-x-4">
                      <Button
                        type="button"
                        variant={role === "STUDENT" ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => setRole("STUDENT")}
                      >
                        Student
                      </Button>
                      <Button
                        type="button"
                        variant={role === "MENTOR" ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => setRole("MENTOR")}
                      >
                        Mentor
                      </Button>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-[#A63D00] hover:bg-[#A63D00]/90 text-white py-3 text-lg font-bold border-4 border-black shadow-[6px_6px_0px_0px_#FFB74D,14px_14px_0px_0px_#000000] hover:shadow-[3px_3px_0px_0px_#FFB74D,7px_7px_0px_0px_#000000] hover:translate-x-1 hover:translate-y-1 transition-all duration-150 uppercase tracking-wider"
                >
                  {isLoading
                    ? isLogin
                      ? "Signing In..."
                      : "Creating Account..."
                    : isLogin
                    ? "Sign In"
                    : "Create Account"}
                </Button>
              </form>
            </div>


            {/* Terms and Privacy */}
            {!isLogin && (
              <p className="text-xs text-gray-500 text-center">
                By creating an account, you agree to our{" "}
                <Link href="#" className="text-[#A63D00] hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-[#A63D00] hover:underline">
                  Privacy Policy
                </Link>
              </p>
            )}
          </div>
        </div>

        {/* Right Side - Illustration with fade transition */}
        <div className={`hidden lg:flex flex-1 bg-gradient-to-br from-[#FFE8CC] to-[#F4D4A7] items-center justify-center p-12 transition-opacity duration-500 ${rightFade ? 'opacity-100' : 'opacity-0'}`}>
          <div className="max-w-md text-center space-y-8">
            <div className="space-y-6">
              <div className="w-24 h-24 bg-[#A63D00] rounded-full flex items-center justify-center mx-auto">
                <User className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-[#A63D00]">
                {isLogin ? "Welcome Back!" : "Join Our Community"}
              </h3>
              <p className="text-lg text-[#A63D00]/80">
                {isLogin
                  ? "Continue your competitive programming journey"
                  : "Connect with fellow hackers and showcase your skills"}
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#A63D00] rounded-full flex items-center justify-center circle-shadow">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-[#A63D00] font-medium">
                  Join coding competitions
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#A63D00] rounded-full flex items-center justify-center circle-shadow">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-[#A63D00] font-medium">
                  Learn from expert mentors
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#A63D00] rounded-full flex items-center justify-center circle-shadow">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-[#A63D00] font-medium">
                  Track your progress
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#A63D00] rounded-full flex items-center justify-center circle-shadow">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-[#A63D00] font-medium">
                  Build your portfolio
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
