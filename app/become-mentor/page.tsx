"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, Star, Award, Clock, MessageSquare, Video, Calendar, TrendingUp, Heart, Zap, Target, CheckCircle, ArrowRight, GraduationCap, Globe, Shield } from "lucide-react"
import Link from "next/link"

export default function BecomeMentorPage() {
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

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#FFE8CC] to-[#F4D4A7]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-[#A63D00] text-white px-4 py-2 text-sm font-medium">
                  Join Our Mentor Community
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Become a
                  <br />
                  <span className="text-[#A63D00]">Mentor</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-lg">
                  Share your expertise, inspire the next generation, and make a lasting impact on students' careers while growing your professional network.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-[#A63D00] hover:bg-[#A63D00]/90 text-white px-8 py-4 text-lg font-bold border-4 border-black shadow-[4px_4px_0px_0px_#000000] hover:shadow-[2px_2px_0px_0px_#000000] hover:translate-x-1 hover:translate-y-1 transition-all duration-150 uppercase tracking-wider"
                >
                  <Link href="/register" className="flex items-center">
                    Apply Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#A63D00] text-[#A63D00] hover:bg-[#A63D00] hover:text-white px-8 py-4 text-lg font-medium"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Illustration */}
            <div className="relative flex justify-center items-center">
              <div className="relative">
                {/* Main mentor icon */}
                <div className="w-48 h-48 bg-[#A63D00] rounded-full flex items-center justify-center shadow-2xl">
                  <Users className="h-24 w-24 text-white" />
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center shadow-lg">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#4ECDC4] rounded-full flex items-center justify-center shadow-lg">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <div className="absolute top-1/2 -left-8 w-12 h-12 bg-[#FFE8CC] rounded-full flex items-center justify-center shadow-lg border-2 border-[#A63D00]/20">
                  <Heart className="h-6 w-6 text-[#A63D00]" />
                </div>
                <div className="absolute top-1/2 -right-8 w-12 h-12 bg-[#FFE8CC] rounded-full flex items-center justify-center shadow-lg border-2 border-[#A63D00]/20">
                  <Zap className="h-6 w-6 text-[#A63D00]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#A63D00] mb-2">850+</div>
              <div className="text-gray-600">Active Mentors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#A63D00] mb-2">2,500+</div>
              <div className="text-gray-600">Students Helped</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#A63D00] mb-2">4.9</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#A63D00] mb-2">15K+</div>
              <div className="text-gray-600">Sessions Completed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Become a Mentor?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our community of experienced professionals and discover the rewards of mentorship
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-[#A63D00]/20 hover:shadow-lg transition-shadow bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-[#A63D00] rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Make an Impact</CardTitle>
                <CardDescription>
                  Help shape the future of tech by guiding students through their learning journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-[#A63D00]" />
                    <span>Share your knowledge and experience</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-[#A63D00]" />
                    <span>Inspire the next generation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-[#A63D00]" />
                    <span>Build meaningful relationships</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-[#A63D00]/20 hover:shadow-lg transition-shadow bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-[#FF6B35] rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Grow Your Network</CardTitle>
                <CardDescription>
                  Connect with other professionals and expand your industry connections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-[#A63D00]" />
                    <span>Meet fellow mentors</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-[#A63D00]" />
                    <span>Access exclusive events</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-[#A63D00]" />
                    <span>Join professional communities</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-[#A63D00]/20 hover:shadow-lg transition-shadow bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-[#4ECDC4] rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Earn Recognition</CardTitle>
                <CardDescription>
                  Get recognized for your contributions and build your professional reputation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-[#A63D00]" />
                    <span>Earn badges and certifications</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-[#A63D00]" />
                    <span>Featured mentor opportunities</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-[#A63D00]" />
                    <span>Professional recommendations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-[#A63D00]/20 hover:shadow-lg transition-shadow bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-[#8B3400] rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Flexible Schedule</CardTitle>
                <CardDescription>
                  Mentor on your own time with our flexible scheduling system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-[#A63D00]" />
                    <span>Set your own availability</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-[#A63D00]" />
                    <span>Choose session duration</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-[#A63D00]" />
                    <span>Remote or in-person options</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-[#A63D00]/20 hover:shadow-lg transition-shadow bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-[#FFE8CC] rounded-lg flex items-center justify-center mb-4 border-2 border-[#A63D00]/20">
                  <Globe className="h-6 w-6 text-[#A63D00]" />
                </div>
                <CardTitle className="text-xl">Global Reach</CardTitle>
                <CardDescription>
                  Connect with students from around the world and share diverse perspectives
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-[#A63D00]" />
                    <span>Students from 50+ countries</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-[#A63D00]" />
                    <span>Cultural exchange opportunities</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-[#A63D00]" />
                    <span>International networking</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-[#A63D00]/20 hover:shadow-lg transition-shadow bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-[#FF6B35] rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Full Support</CardTitle>
                <CardDescription>
                  Get comprehensive support and resources to be the best mentor possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-[#A63D00]" />
                    <span>Mentor training programs</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-[#A63D00]" />
                    <span>24/7 platform support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-[#A63D00]" />
                    <span>Resource library access</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-gray-900">Mentor Requirements</h2>
                <p className="text-xl text-gray-600">
                  We're looking for passionate professionals who want to make a difference. Here's what we expect from our mentors:
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#A63D00] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Experience</h3>
                    <p className="text-gray-600">Minimum 3+ years of industry experience in your field of expertise</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#A63D00] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Communication Skills</h3>
                    <p className="text-gray-600">Excellent verbal and written communication abilities</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#A63D00] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Passion for Teaching</h3>
                    <p className="text-gray-600">Genuine interest in helping others learn and grow</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#A63D00] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Time Commitment</h3>
                    <p className="text-gray-600">Ability to dedicate at least 2-4 hours per month to mentoring</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#A63D00] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">5</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Background Check</h3>
                    <p className="text-gray-600">Successful completion of our verification process</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Process */}
            <div className="bg-gradient-to-br from-[#FFE8CC] to-[#F4D4A7] rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[#A63D00] mb-6">Application Process</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-[#A63D00] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Submit Application</h4>
                    <p className="text-sm text-gray-600">Fill out our comprehensive mentor application form</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-[#A63D00] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Review & Interview</h4>
                    <p className="text-sm text-gray-600">Our team reviews your application and conducts an interview</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-[#A63D00] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Training & Onboarding</h4>
                    <p className="text-sm text-gray-600">Complete our mentor training program and platform orientation</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-[#A63D00] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Start Mentoring</h4>
                    <p className="text-sm text-gray-600">Begin connecting with students and making an impact</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#A63D00]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our community of mentors and help shape the future of technology. Your expertise can change lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#A63D00] hover:bg-gray-100 px-8 py-4 text-lg font-bold border-4 border-black shadow-[4px_4px_0px_0px_#000000] hover:shadow-[2px_2px_0px_0px_#000000] hover:translate-x-1 hover:translate-y-1 transition-all duration-150 uppercase tracking-wider"
            >
              <Link href="/register" className="flex items-center">
                Apply to Become a Mentor
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#A63D00] px-8 py-4 text-lg font-medium bg-transparent"
            >
              <Link href="/mentors" className="flex items-center">
                Meet Our Mentors
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 