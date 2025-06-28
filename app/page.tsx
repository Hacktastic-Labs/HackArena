import { Button } from "@/components/ui/button"
import { ArrowRight, Copy, Github, Users, BookOpen, MessageSquare, TrendingUp, Star, Calendar } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#A63D00] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900">Synora</span>
                <span className="text-sm text-gray-500 ml-2">by StudentMentor</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="border-2 border-dashed border-gray-300 text-gray-700 hover:border-[#A63D00] hover:text-[#A63D00] bg-transparent"
              >
                <Link href="/dashboard" className="flex items-center">
                  Go to Dashboard
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-2 border-dashed border-gray-300 text-gray-700 hover:border-[#A63D00] hover:text-[#A63D00] bg-transparent"
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-6xl md:text-7xl font-bold text-gray-900 leading-tight">
                  The AI Student
                  <br />
                  Mentorship Platform
                </h1>
                <p className="text-xl text-gray-600 max-w-lg">
                  Synora makes it easy for both students and mentors to connect, learn, and grow together through
                  intelligent matching
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-[#A63D00] hover:bg-[#A63D00] text-white px-8 py-4 text-lg font-black border-4 border-black shadow-[8px_8px_0px_0px_#000000] hover:shadow-[4px_4px_0px_0px_#000000] hover:translate-x-1 hover:translate-y-1 transition-all duration-150 uppercase tracking-wider"
                >
                  <Link href="/register" className="flex items-center">
                    GET STARTED
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <div className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                  <code className="text-gray-800 font-mono">synora connect-mentor</code>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* 3D Illustration */}
            <div className="relative flex justify-center items-center">
              <div className="relative">
                {/* Main cube stack */}
                <div className="relative">
                  {/* Top cube - Knowledge */}
                  <div className="w-32 h-32 bg-[#FFE8CC] border-2 border-[#A63D00]/20 rounded-lg transform rotate-12 shadow-lg relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-[#A63D00]" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#A63D00] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">K</span>
                    </div>
                  </div>

                  {/* Middle cube - Mentorship */}
                  <div className="w-36 h-36 bg-[#A63D00] border-2 border-gray-200 rounded-lg transform -rotate-6 shadow-xl relative -mt-16 ml-8">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Users className="h-14 w-14 text-white" />
                    </div>
                    <div className="absolute -top-2 -left-2 w-6 h-6 bg-[#FFE8CC] rounded-full flex items-center justify-center">
                      <span className="text-[#A63D00] text-xs font-bold">M</span>
                    </div>
                  </div>

                  {/* Bottom cube - Growth */}
                  <div className="w-40 h-40 bg-gradient-to-br from-[#FFE8CC] to-[#A63D00]/20 border-2 border-[#A63D00]/30 rounded-lg transform rotate-3 shadow-2xl relative -mt-20 -ml-4">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <TrendingUp className="h-16 w-16 text-[#A63D00]" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#A63D00] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">G</span>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-8 -left-8 w-16 h-16 bg-white border-2 border-dashed border-[#A63D00]/30 rounded-lg flex items-center justify-center shadow-lg">
                  <MessageSquare className="h-6 w-6 text-[#A63D00]" />
                </div>

                <div className="absolute -bottom-4 -right-8 w-12 h-12 bg-[#A63D00] rounded-full flex items-center justify-center shadow-lg">
                  <Star className="h-6 w-6 text-white" />
                </div>

                <div className="absolute top-1/2 -right-12 w-14 h-14 bg-[#FFE8CC] border-2 border-[#A63D00]/20 rounded-lg flex items-center justify-center shadow-lg">
                  <Calendar className="h-6 w-6 text-[#A63D00]" />
                </div>

                {/* Connecting lines */}
                <div className="absolute inset-0 pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 300 300">
                    <defs>
                      <pattern id="dots" patternUnits="userSpaceOnUse" width="20" height="20">
                        <circle cx="10" cy="10" r="1" fill="#A63D00" opacity="0.3" />
                      </pattern>
                    </defs>
                    <path
                      d="M50 100 Q150 50 250 150"
                      stroke="#A63D00"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      fill="none"
                      opacity="0.4"
                    />
                    <path
                      d="M100 200 Q200 150 280 220"
                      stroke="#A63D00"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      fill="none"
                      opacity="0.4"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-4 grid-rows-2 gap-4 h-80">
            {/* Large box - Active Students */}
            <div className="col-span-2 row-span-2 bg-gradient-to-br from-[#A63D00] to-[#8B3400] rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <div className="text-5xl font-black mb-3">2,500+</div>
                <div className="text-xl font-medium opacity-90">Active Students</div>
                <div className="text-sm opacity-75 mt-2">Growing every day</div>
              </div>
            </div>

            {/* Top right - Expert Mentors */}
            <div className="col-span-2 bg-gradient-to-br from-[#FFE8CC] to-[#F4D4A7] rounded-2xl p-6 text-[#A63D00] relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#A63D00]/10 rounded-full translate-y-12 -translate-x-12"></div>
              <div className="relative z-10">
                <div className="text-4xl font-black mb-2">850+</div>
                <div className="text-lg font-medium">Expert Mentors</div>
              </div>
            </div>

            {/* Bottom left - Problems Solved */}
            <div className="bg-gradient-to-br from-[#FF6B35] to-[#E55A2B] rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full -translate-y-10 translate-x-10"></div>
              <div className="relative z-10">
                <div className="text-3xl font-black mb-2">15K+</div>
                <div className="text-sm font-medium">Problems Solved</div>
              </div>
            </div>

            {/* Bottom right - Success Rate */}
            <div className="bg-gradient-to-br from-[#4ECDC4] to-[#44B3AC] rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/20 rounded-full translate-y-8 -translate-x-8"></div>
              <div className="relative z-10">
                <div className="text-3xl font-black mb-2">98%</div>
                <div className="text-sm font-medium">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything you need to succeed</h2>
            <p className="text-xl text-gray-600">Comprehensive tools for modern mentorship</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 border-2 border-dashed border-gray-200 rounded-xl hover:border-[#A63D00] transition-colors">
              <div className="w-12 h-12 bg-[#FFE8CC] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#A63D00] transition-colors">
                <BookOpen className="h-6 w-6 text-[#A63D00] group-hover:text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Knowledge Base</h3>
              <p className="text-gray-600">AI-powered search and categorization with semantic matching</p>
            </div>

            <div className="group p-8 border-2 border-dashed border-gray-200 rounded-xl hover:border-[#A63D00] transition-colors">
              <div className="w-12 h-12 bg-[#FFE8CC] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#A63D00] transition-colors">
                <Users className="h-6 w-6 text-[#A63D00] group-hover:text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Mentor Matching</h3>
              <p className="text-gray-600">Intelligent suggestions based on expertise and compatibility</p>
            </div>

            <div className="group p-8 border-2 border-dashed border-gray-200 rounded-xl hover:border-[#A63D00] transition-colors">
              <div className="w-12 h-12 bg-[#FFE8CC] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#A63D00] transition-colors">
                <MessageSquare className="h-6 w-6 text-[#A63D00] group-hover:text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-time Communication</h3>
              <p className="text-gray-600">Seamless chat and video integration for instant help</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#A63D00]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to transform your learning?</h2>
          <p className="text-xl text-[#FFE8CC] mb-8">Join thousands of students and mentors already using Synora</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#A63D00] hover:bg-[#FFE8CC] px-8 py-4 text-lg">
              <Link href="/register">Start Learning Today</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#A63D00] bg-transparent px-8 py-4 text-lg"
            >
              <Link href="/mentors">Become a Mentor</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-[#A63D00] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="text-2xl font-bold">Synora</span>
              </div>
              <p className="text-gray-400">Empowering students through intelligent mentorship connections.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/knowledge" className="hover:text-white transition-colors">
                    Knowledge Base
                  </Link>
                </li>
                <li>
                  <Link href="/mentors" className="hover:text-white transition-colors">
                    Find Mentors
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="hover:text-white transition-colors">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Synora. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
