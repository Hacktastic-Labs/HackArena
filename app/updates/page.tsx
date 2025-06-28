"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Clock,
  Bell,
} from "lucide-react"
import { useSession } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UpdatesPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/register");
    } else if (!isPending && (session?.user as { role?: string })?.role === "MENTOR") {
      router.push("/mentor-dashboard");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFE8CC]/20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#A63D00]"></div>
          <p className="mt-4 text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session || (session.user as { role?: string })?.role === "MENTOR") {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FFE8CC]/20">
      {/* Navigation */}
      <nav className="border-b border-[#A63D00]/20 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#A63D00] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="text-2xl font-bold text-[#A63D00]">HackArena</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
                Dashboard
              </Button>
              <Button variant="ghost" size="sm" onClick={() => router.push("/problems")}>
                My Problems
              </Button>
              <Button variant="ghost" size="sm" onClick={() => router.push("/mentors")}>
                Mentors
              </Button>
              <Button variant="ghost" size="sm" onClick={() => router.push("/knowledge")}>
                Knowledge
              </Button>
              <Button variant="ghost" size="sm" onClick={() => router.push("/events")}>
                Events
              </Button>
              <Button variant="ghost" size="sm" onClick={() => router.push("/updates")} className="bg-[#A63D00]/10 text-[#A63D00]">
                Updates
              </Button>
              <Button variant="ghost" size="sm" className="group relative">
                <Bell className="h-4 w-4 group-hover:fill-[#A63D00] group-hover:text-[#A63D00] transition-all duration-300 group-hover:animate-pulse" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#A63D00] rounded-full group-hover:animate-ping"></div>
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-[#A63D00] text-white">
                  {session.user?.name?.charAt(0)?.toUpperCase() || "S"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Latest Updates</h1>
            <p className="text-gray-600">Stay updated with the latest announcements and platform news.</p>
          </div>
          <Button variant="outline" className="border-[#A63D00] text-[#A63D00] bg-transparent">
            Mark All Read
          </Button>
        </div>

        <div className="space-y-4">
          <Card className="border-[#A63D00]/20 border-l-4 border-l-[#A63D00]">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">New AI-Powered Mentor Matching</CardTitle>
                  <CardDescription className="mt-2">
                    We&apos;ve upgraded our mentor matching algorithm to provide even better suggestions based on your
                    learning goals and preferences.
                  </CardDescription>
                </div>
                <Badge className="bg-[#A63D00]/10 text-[#A63D00]">New Feature</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>2 hours ago</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#A63D00]/20">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">Upcoming Maintenance</CardTitle>
                  <CardDescription className="mt-2">
                    Scheduled maintenance on December 20th from 2:00 AM to 4:00 AM EST. The platform will be
                    temporarily unavailable.
                  </CardDescription>
                </div>
                <Badge variant="outline">Maintenance</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>1 day ago</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#A63D00]/20">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">New React Workshop Added</CardTitle>
                  <CardDescription className="mt-2">
                    Join our upcoming React Advanced Patterns workshop this Friday. Learn about complex state management
                    and performance optimization techniques.
                  </CardDescription>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Workshop</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>3 days ago</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#A63D00]/20">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">Platform Performance Improvements</CardTitle>
                  <CardDescription className="mt-2">
                    We&apos;ve made significant improvements to page load times and overall platform responsiveness.
                    You should notice faster navigation and smoother interactions.
                  </CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-800">Enhancement</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>1 week ago</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#A63D00]/20">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">New Knowledge Base Articles</CardTitle>
                  <CardDescription className="mt-2">
                    We&apos;ve added 15 new articles covering advanced JavaScript concepts, React best practices,
                    and database optimization techniques.
                  </CardDescription>
                </div>
                <Badge className="bg-purple-100 text-purple-800">Content</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>2 weeks ago</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 