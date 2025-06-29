"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Star, MessageSquare, Video, Calendar, MapPin, Clock, Users, Award, Loader2, Bell, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { signOut, useSession } from "@/app/lib/auth-client"
import PageTransition from "@/components/PageTransition"  

const BRUTALIST_COLORS = [
  '#FFF8E1', '#FFD580', '#FDE1BC', '#FFB800', '#F96D3A', '#FFEDC2'
];
const BRUTALIST_COLORS_HOVER = [
  '#FFFFFF', '#FFE8A3', '#FFF3D6', '#FFE066', '#FFA366', '#FFF6E0'
];
const BRUTALIST_COLORS_DARK = [
  '#FFE8A3', '#FFC94D', '#FFD9A0', '#FFD600', '#FF8C42', '#FFE3A3'
];

interface Mentor {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  // Add other mentor-specific fields if they exist in your User model
  // For example:
  // title: string | null;
  skills: string[];
}

export default function MentorsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
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

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#FFE8CC]/20">
      {/* Navigation */}
      <nav className="border-b border-[#A63D00]/20 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
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
            </div>
            <div className="flex items-center space-x-4">
              <Button
                className={`px-5 py-2 rounded-lg font-bold border-2
                  ${pathname === "/dashboard" ?
                    'bg-[#232323] text-[#FFB74D] border-[#FFB74D] shadow-[6px_6px_0px_0px_#000000]' :
                    'bg-transparent text-black border-transparent hover:bg-[#FFF8E1] hover:text-[#A63D00] transition-all duration-300'}
                `}
                onClick={() => router.push("/dashboard")}
              >
                Dashboard
              </Button>
              <Button
                className={`px-5 py-2 rounded-lg font-bold border-2
                  ${pathname === "/problems" ?
                    'bg-[#232323] text-[#FFB74D] border-[#FFB74D] shadow-[6px_6px_0px_0px_#000000]' :
                    'bg-transparent text-black border-transparent hover:bg-[#FFF8E1] hover:text-[#A63D00] transition-all duration-300'}
                `}
                onClick={() => router.push("/problems")}
              >
                My Problems
              </Button>
              <Button
                className={`px-5 py-2 rounded-lg font-bold border-2
                  ${pathname === "/mentors" ?
                    'bg-[#232323] text-[#FFB74D] border-[#FFB74D] shadow-[6px_6px_0px_0px_#000000]' :
                    'bg-transparent text-black border-transparent hover:bg-[#FFF8E1] hover:text-[#A63D00] transition-all duration-300'}
                `}
                onClick={() => router.push("/mentors")}
              >
                Mentors
              </Button>
              <Button
                className={`px-5 py-2 rounded-lg font-bold border-2
                  ${pathname === "/knowledge" ?
                    'bg-[#232323] text-[#FFB74D] border-[#FFB74D] shadow-[6px_6px_0px_0px_#000000]' :
                    'bg-transparent text-black border-transparent hover:bg-[#FFF8E1] hover:text-[#A63D00] transition-all duration-300'}
                `}
                onClick={() => router.push("/knowledge")}
              >
                Knowledge
              </Button>
              <Button
                className={`px-5 py-2 rounded-lg font-bold border-2
                  ${pathname === "/events" ?
                    'bg-[#232323] text-[#FFB74D] border-[#FFB74D] shadow-[6px_6px_0px_0px_#000000]' :
                    'bg-transparent text-black border-transparent hover:bg-[#FFF8E1] hover:text-[#A63D00] transition-all duration-300'}
                `}
                onClick={() => router.push("/events")}
              >
                Events
              </Button>
              <Button
                className={`px-5 py-2 rounded-lg font-bold border-2
                  ${pathname === "/updates" ?
                    'bg-[#232323] text-[#FFB74D] border-[#FFB74D] shadow-[6px_6px_0px_0px_#000000]' :
                    'bg-transparent text-black border-transparent hover:bg-[#FFF8E1] hover:text-[#A63D00] transition-all duration-300'}
                `}
                onClick={() => router.push("/updates")}
              >
                Updates
              </Button>
              <Button variant="ghost" size="sm" className="group relative p-0 w-8 h-8 flex items-center justify-center">
                <Bell className="h-8 w-8 group-hover:fill-[#A63D00] group-hover:text-[#A63D00] transition-all duration-300 group-hover:animate-pulse" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#A63D00] rounded-full group-hover:animate-ping"></div>
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-[#A63D00] text-white text-base font-bold">
                  {session?.user?.name?.charAt(0)?.toUpperCase() || "S"}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="sm"
                className="p-0 w-8 h-8 flex items-center justify-center"
                onClick={async () => {
                  await signOut();
                  router.push("/register");
                }}
              >
                <LogOut className="h-8 w-8" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <PageTransition>
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
                  <Input placeholder="Search by name, skill, or expertise..." className="pl-10 border-2 border-[#FFB800] focus:border-[#FFB800]" />
                </div>
              </div>
              <div>
                <Button variant="outline" className="bg-[#FFB800] text-black border-2 border-black font-bold w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  Expertise
                </Button>
              </div>
              <div>
                <Button variant="outline" className="bg-[#FFB800] text-black border-2 border-black font-bold w-full">
                  <Clock className="h-4 w-4 mr-2" />
                  Availability
                </Button>
              </div>
            </div>
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
            <>
              {/* Featured Mentors */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Mentors</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mentors.slice(0, 3).map((mentor, index) => (
                    <Card
                      key={mentor.id}
                      className="border-4 border-black rounded-xl shadow-[4px_4px_0_0_#000] hover:shadow-lg transition-shadow p-8 mb-14 animate-float"
                      style={{ backgroundColor: BRUTALIST_COLORS[index % BRUTALIST_COLORS.length], border: '4px solid #000' }}
                    >
                      <CardHeader className="text-center">
                        <Avatar className="h-20 w-20 mx-auto mb-4 ring-4 ring-black">
                          <AvatarImage src={mentor.image || `https://api.dicebear.com/8.x/pixel-art/svg?seed=${mentor.name}`} />
                          <AvatarFallback className="bg-[#A63D00] text-white text-xl">
                            {mentor.name?.charAt(0).toUpperCase() || "M"}
                          </AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-xl font-extrabold border-b-4 border-black">{mentor.name}</CardTitle>
                        <CardDescription>{mentor.email}</CardDescription>
                        <div className="flex items-center justify-center space-x-1 mt-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-medium">4.9</span>
                          <span className="text-gray-600">(127 reviews)</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {(mentor.skills || []).map((skill) => (
                              <Badge key={skill} className="border-2 border-black rounded-full px-3 py-1 font-bold uppercase bg-[#FF6B35] text-white mx-1 my-1">{skill}</Badge>
                            ))}
                          </div>
                          <p className="text-sm text-gray-600">
                            5+ years helping students master full-stack development and prepare for technical interviews.
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>89 students</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Award className="h-4 w-4" />
                              <span>Top Mentor</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button className="border-2 border-black rounded-md font-bold bg-[#A63D00] hover:bg-[#A63D00]/90 text-white px-6 py-2">Connect</Button>
                            <Button variant="outline" className="border-2 border-black text-black bg-transparent px-6 py-2 mx-1">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* All Mentors */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">All Mentors</h2>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="border-2 border-black text-black bg-transparent">
                      Sort by Rating
                    </Button>
                    <Button variant="outline" className="border-2 border-black text-black bg-transparent">
                      Sort by Experience
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mentors.map((mentor) => (
                    <Card key={mentor.id} className="border-[#A63D00]/20 hover:shadow-lg transition-shadow">
                      <CardHeader className="text-center">
                        <Avatar className="h-20 w-20 mx-auto mb-4 ring-4 ring-[#A63D00]/20">
                          <AvatarImage src={mentor.image || `https://api.dicebear.com/8.x/pixel-art/svg?seed=${mentor.name}`} />
                          <AvatarFallback className="bg-[#A63D00] text-white text-xl">
                            {mentor.name?.charAt(0).toUpperCase() || "M"}
                          </AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-xl">{mentor.name || "Mentor"}</CardTitle>
                        <CardDescription>{mentor.email}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {(mentor.skills || []).map((skill) => (
                            <Badge key={skill} className="border-2 border-black rounded-full px-3 py-1 font-bold uppercase bg-[#FF6B35] text-white mx-1 my-1">{skill}</Badge>
                          ))}
                        </div>
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
              </div>
            </>
          )}
        </div>
      </PageTransition>
    </div>
  )
}
