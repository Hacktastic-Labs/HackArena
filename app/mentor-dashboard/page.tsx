"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  MessageSquare,
  Calendar,
  BookOpen,
  Bell,
  Star,
  Plus,
  Eye,
  BarChart3,
} from "lucide-react";
import { useSession } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MentorDashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/register");
    } else if (!isPending && (session?.user as { role?: string })?.role !== "MENTOR") {
      router.push("/dashboard");
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

  if (!session || (session.user as { role?: string })?.role !== "MENTOR") {
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
              <span className="text-2xl font-bold text-[#A63D00]">HackArena - Mentor</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="group relative">
                <Bell className="h-4 w-4 group-hover:fill-[#A63D00] group-hover:text-[#A63D00] transition-all duration-300 group-hover:animate-pulse" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#A63D00] rounded-full group-hover:animate-ping"></div>
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-[#A63D00] text-white">
                  {session.user?.name?.charAt(0)?.toUpperCase() || "M"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {session.user?.name || "Mentor"}!
          </h1>
          <p className="text-gray-600">Here&apos;s an overview of your mentoring activities.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-[#A63D00]/20 hover:scale-105 transition-transform duration-300 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Students</CardTitle>
              <Users className="h-4 w-4 text-[#A63D00]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#A63D00]">15</div>
              <p className="text-xs text-gray-600">+3 this week</p>
            </CardContent>
          </Card>

          <Card className="border-[#A63D00]/20 hover:scale-105 transition-transform duration-300 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Sessions</CardTitle>
              <MessageSquare className="h-4 w-4 text-[#A63D00]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#A63D00]">7</div>
              <p className="text-xs text-gray-600">Ongoing discussions</p>
            </CardContent>
          </Card>

          <Card className="border-[#A63D00]/20 hover:scale-105 transition-transform duration-300 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sessions This Week</CardTitle>
              <Calendar className="h-4 w-4 text-[#A63D00]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#A63D00]">12</div>
              <p className="text-xs text-gray-600">+4 from last week</p>
            </CardContent>
          </Card>

          <Card className="border-[#A63D00]/20 hover:scale-105 transition-transform duration-300 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-[#A63D00]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#A63D00]">4.8</div>
              <p className="text-xs text-gray-600">⭐⭐⭐⭐⭐</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Student Queries */}
          <div className="lg:col-span-2">
            <Card className="border-[#A63D00]/20">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">Recent Student Queries</CardTitle>
                  <Button className="bg-[#A63D00] hover:bg-[#A63D00]/90">
                    <Plus className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-[#A63D00] pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold">React State Management Help</h4>
                      <p className="text-sm text-gray-600">Student needs help with useReducer vs useState...</p>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800">New</Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Alex Johnson</span>
                    <span>2 mins ago</span>
                    <Button size="sm" className="bg-[#A63D00] hover:bg-[#A63D00]/90">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Respond
                    </Button>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold">Database Optimization Question</h4>
                      <p className="text-sm text-gray-600">How to optimize queries for large datasets...</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">In Progress</Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Sarah Chen</span>
                    <span>1 hour ago</span>
                    <Button size="sm" className="bg-[#A63D00] hover:bg-[#A63D00]/90">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold">Algorithm Complexity Analysis</h4>
                      <p className="text-sm text-gray-600">Need help understanding Big O notation...</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Mike Thompson</span>
                    <span>3 hours ago</span>
                    <Button size="sm" className="bg-[#A63D00] hover:bg-[#A63D00]/90">
                      <Calendar className="h-3 w-3 mr-1" />
                      Schedule
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Performance Overview */}
            <Card className="border-[#A63D00]/20">
              <CardHeader>
                <CardTitle className="text-lg">Performance Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Response Time</span>
                  <span className="text-sm font-bold text-[#A63D00]">{"< 2 hours"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Resolution Rate</span>
                  <span className="text-sm font-bold text-[#A63D00]">94%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Student Satisfaction</span>
                  <span className="text-sm font-bold text-[#A63D00]">4.8/5</span>
                </div>
                <Button className="w-full bg-[#A63D00] hover:bg-[#A63D00]/90">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Detailed Stats
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-[#A63D00]/20">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-white border border-[#A63D00] text-[#A63D00] hover:bg-[#A63D00] hover:text-white">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Create Knowledge Article
                </Button>
                <Button className="w-full justify-start bg-white border border-[#A63D00] text-[#A63D00] hover:bg-[#A63D00] hover:text-white">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Office Hours
                </Button>
                <Button className="w-full justify-start bg-white border border-[#A63D00] text-[#A63D00] hover:bg-[#A63D00] hover:text-white">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Students
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}