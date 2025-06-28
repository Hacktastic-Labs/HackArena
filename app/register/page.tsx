"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, Phone, Calendar, GraduationCap, Users, Github, Linkedin } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [userType, setUserType] = useState<'student' | 'mentor'>('student')

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#A63D00] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-gray-900">Synora</span>
                  <span className="text-sm text-gray-500 ml-2">by Hacktastic</span>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="border-2 border-dashed border-gray-300 text-gray-700 hover:border-[#A63D00] hover:text-[#A63D00] bg-transparent"
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
                  ? "Sign in to continue your learning journey" 
                  : "Start your mentorship journey today"
                }
              </p>
            </div>

            {/* Toggle Buttons */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  !isLogin 
                    ? "bg-[#A63D00] text-white shadow-sm" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Register
              </button>
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  isLogin 
                    ? "bg-[#A63D00] text-white shadow-sm" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Login
              </button>
            </div>

            <form className="space-y-6">
              {!isLogin && (
                <>
                  {/* First Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">First Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Enter your first name"
                        className="pl-10 border-2 border-gray-200 focus:border-[#A63D00] focus:ring-[#A63D00]/20"
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Enter your last name"
                        className="pl-10 border-2 border-gray-200 focus:border-[#A63D00] focus:ring-[#A63D00]/20"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="tel"
                        placeholder="Enter your phone number"
                        className="pl-10 border-2 border-gray-200 focus:border-[#A63D00] focus:ring-[#A63D00]/20"
                      />
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="date"
                        className="pl-10 border-2 border-gray-200 focus:border-[#A63D00] focus:ring-[#A63D00]/20"
                      />
                    </div>
                  </div>

                  {/* User Type Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">I am a...</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setUserType('student')}
                        className={`flex items-center justify-center space-x-2 p-4 rounded-lg border-2 transition-all ${
                          userType === 'student'
                            ? 'border-[#A63D00] bg-[#A63D00]/10 text-[#A63D00]'
                            : 'border-gray-200 hover:border-[#A63D00]/50 text-gray-600 hover:text-[#A63D00]'
                        }`}
                      >
                        <GraduationCap className="h-5 w-5" />
                        <span className="font-medium">Student</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setUserType('mentor')}
                        className={`flex items-center justify-center space-x-2 p-4 rounded-lg border-2 transition-all ${
                          userType === 'mentor'
                            ? 'border-[#A63D00] bg-[#A63D00]/10 text-[#A63D00]'
                            : 'border-gray-200 hover:border-[#A63D00]/50 text-gray-600 hover:text-[#A63D00]'
                        }`}
                      >
                        <Users className="h-5 w-5" />
                        <span className="font-medium">Mentor</span>
                      </button>
                    </div>
                  </div>

                  {/* GitHub URL */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">GitHub URL (Optional)</label>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="url"
                        placeholder="https://github.com/yourusername"
                        className="pl-10 border-2 border-gray-200 focus:border-[#A63D00] focus:ring-[#A63D00]/20"
                      />
                    </div>
                  </div>

                  {/* LinkedIn URL */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">LinkedIn URL (Optional)</label>
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="url"
                        placeholder="https://linkedin.com/in/yourprofile"
                        className="pl-10 border-2 border-gray-200 focus:border-[#A63D00] focus:ring-[#A63D00]/20"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 border-2 border-gray-200 focus:border-[#A63D00] focus:ring-[#A63D00]/20"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 border-2 border-gray-200 focus:border-[#A63D00] focus:ring-[#A63D00]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password (Register only) */}
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="pl-10 pr-10 border-2 border-gray-200 focus:border-[#A63D00] focus:ring-[#A63D00]/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-[#A63D00] hover:bg-[#A63D00]/90 text-white py-3 text-lg font-bold border-4 border-black shadow-[6px_6px_0px_0px_#FFB74D,14px_14px_0px_0px_#000000] hover:shadow-[3px_3px_0px_0px_#FFB74D,7px_7px_0px_0px_#000000] hover:translate-x-1 hover:translate-y-1 transition-all duration-150 uppercase tracking-wider"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                className="border-2 border-gray-200 hover:border-[#A63D00] hover:text-[#A63D00] bg-white"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>
            </div>

            {/* Terms and Privacy */}
            {!isLogin && (
              <p className="text-xs text-gray-500 text-center">
                By creating an account, you agree to our{" "}
                <Link href="#" className="text-[#A63D00] hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link href="#" className="text-[#A63D00] hover:underline">Privacy Policy</Link>
              </p>
            )}
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#FFE8CC] to-[#F4D4A7] items-center justify-center p-12">
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
                  ? "Continue your learning journey with expert mentors and peers"
                  : "Connect with mentors, learn new skills, and grow your career"
                }
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#A63D00] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-[#A63D00] font-medium">AI-powered mentor matching</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#A63D00] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-[#A63D00] font-medium">Personalized learning paths</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#A63D00] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-[#A63D00] font-medium">Real-time progress tracking</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#A63D00] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-[#A63D00] font-medium">Community support network</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 