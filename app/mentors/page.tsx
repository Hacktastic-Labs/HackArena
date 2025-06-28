"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Star, MessageSquare, Video, Calendar, MapPin, Clock, Users, Award, Loader2 } from "lucide-react"
import Link from "next/link"

interface Mentor {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  // Add other mentor-specific fields if they exist in your User model
  // For example:
  // title: string | null;
  // expertise: string[];
}

export default function MentorsPage() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/mentors");
        if (!res.ok) {
          throw new Error("Failed to fetch mentors");
        }
        const data = await res.json();
        setMentors(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMentors();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFE8CC]/20">
      {/* Navigation */}
      <nav className="border-b border-[#A63D00]/20 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#A63D00] rounded-lg flex items-center justify-center">
                  <img src="/sfinal.png" alt="Synora Logo" className="w-8 h-8 rounded-lg object-contain" />
                </div>
                <span className="text-2xl font-bold text-[#A63D00]">HackArena</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="text-gray-700 hover:text-[#A63D00] transition-colors">
                Dashboard
              </Link>
              <Link href="/problems" className="text-gray-700 hover:text-[#A63D00] transition-colors">
                My Problems
              </Link>
              <Link href="/mentors" className="text-[#A63D00] font-medium">
                Mentors
              </Link>
              <Link href="/knowledge" className="text-gray-700 hover:text-[#A63D00] transition-colors">
                Knowledge
              </Link>
              <Link href="/events" className="text-gray-700 hover:text-[#A63D00] transition-colors">
                Events
              </Link>
              <Link href="/updates" className="text-gray-700 hover:text-[#A63D00] transition-colors">
                Updates
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Mentor</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with experienced professionals who can guide you through your learning journey with personalized
            mentorship.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-[#A63D00]/20 p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search by name, skill, or expertise..." className="pl-10" />
              </div>
            </div>
            <div>
              <Button variant="outline" className="w-full border-[#A63D00] text-[#A63D00] bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Expertise
              </Button>
            </div>
            <div>
              <Button variant="outline" className="w-full border-[#A63D00] text-[#A63D00] bg-transparent">
                <Clock className="h-4 w-4 mr-2" />
                Availability
              </Button>
            </div>
          </div>
        </div>

        {/* All Mentors */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">All Mentors</h2>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-[#A63D00]" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors.map((mentor) => (
                <Card key={mentor.id} className="border-[#A63D00]/20 hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <Avatar className="h-20 w-20 mx-auto mb-4 ring-4 ring-[#A63D00]/20">
                      <AvatarImage src={mentor.image || "/placeholder.svg?height=80&width=80"} />
                      <AvatarFallback className="bg-[#A63D00] text-white text-xl">
                        {mentor.name?.charAt(0).toUpperCase() || "M"}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-xl">{mentor.name || "Mentor"}</CardTitle>
                    <CardDescription>{mentor.email}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2 mt-4">
                       <Button className="flex-1 bg-[#A63D00] hover:bg-[#A63D00]/90">Connect</Button>
                       <Button variant="outline" className="border-[#A63D00] text-[#A63D00] bg-transparent">
                         <MessageSquare className="h-4 w-4" />
                       </Button>
                     </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
