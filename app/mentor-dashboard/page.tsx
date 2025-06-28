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
  Loader2,
  CheckCircle,
  Clock,
  LogOut,
} from "lucide-react";
import { useSession, signOut } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useMentorProblems } from "@/app/lib/use-mentor-problems";

export default function MentorDashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const {
    problems,
    stats,
    isLoading: problemsLoading,
    assignMentorToProblem,
  } = useMentorProblems();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "OPEN":
        return <Badge className="bg-blue-100 text-blue-800">Open</Badge>;
      case "IN_PROGRESS":
        return (
          <Badge className="bg-orange-100 text-orange-800">In Progress</Badge>
        );
      case "RESOLVED":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Resolved
          </Badge>
        );
      case "CLOSED":
        return <Badge className="bg-gray-100 text-gray-800">Closed</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 60) {
      return `${diffInMinutes} mins ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
  };

  const handleAssignToMe = async (problemId: string) => {
    try {
      await assignMentorToProblem(problemId);
    } catch (error) {
      console.error("Error assigning problem:", error);
    }
  };

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/register");
    } else if (
      !isPending &&
      (session?.user as { role?: string })?.role !== "MENTOR"
    ) {
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
              <img
                src="/sfinal.png"
                alt="Synora Logo"
                className="w-10 h-10 rounded-md shadow object-contain p-0"
              />
              <span className="text-2xl font-bold text-[#A63D00]">
                Synora - Mentor
              </span>
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
              <Button
                variant="ghost"
                size="sm"
                onClick={async () => {
                  await signOut();
                  router.push("/register");
                }}
                className="group relative"
              >
                <LogOut className="h-4 w-4 group-hover:fill-[#A63D00] group-hover:text-[#A63D00] transition-all duration-300 group-hover:animate-pulse" />
              </Button>
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
          <p className="text-gray-600">
            Here&apos;s an overview of your mentoring activities.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-[#A63D00]/20 hover:scale-105 transition-transform duration-300 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Students
              </CardTitle>
              <Users className="h-4 w-4 text-[#A63D00]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#A63D00]">
                {problemsLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  stats.uniqueStudents
                )}
              </div>
              <p className="text-xs text-gray-600">Students with problems</p>
            </CardContent>
          </Card>

          <Card className="border-[#A63D00]/20 hover:scale-105 transition-transform duration-300 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Open Problems
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-[#A63D00]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#A63D00]">
                {problemsLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  stats.openProblems
                )}
              </div>
              <p className="text-xs text-gray-600">Awaiting mentors</p>
            </CardContent>
          </Card>

          <Card className="border-[#A63D00]/20 hover:scale-105 transition-transform duration-300 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                My Mentoring
              </CardTitle>
              <Calendar className="h-4 w-4 text-[#A63D00]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#A63D00]">
                {problemsLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  stats.myMentoredProblems
                )}
              </div>
              <p className="text-xs text-gray-600">Problems I'm helping with</p>
            </CardContent>
          </Card>

          <Card className="border-[#A63D00]/20 hover:scale-105 transition-transform duration-300 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Resolved Problems
              </CardTitle>
              <Star className="h-4 w-4 text-[#A63D00]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#A63D00]">
                {problemsLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  stats.resolvedProblems
                )}
              </div>
              <p className="text-xs text-gray-600">Successfully solved</p>
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
                  <CardTitle className="text-xl">
                    Recent Student Queries
                  </CardTitle>
                  <Button className="bg-[#A63D00] hover:bg-[#A63D00]/90">
                    <Plus className="h-4 w-4 mr-2" />
                    View All Problems ({problems.length})
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {problemsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-[#A63D00]" />
                    <span className="ml-2 text-gray-600">
                      Loading problems...
                    </span>
                  </div>
                ) : problems.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No student problems yet
                    </h3>
                    <p className="text-gray-600">
                      When students post problems, they'll appear here for you
                      to help with.
                    </p>
                  </div>
                ) : (
                  problems.slice(0, 5).map((problem) => (
                    <div
                      key={problem.id}
                      className={`border-l-4 pl-4 ${
                        problem.status === "OPEN"
                          ? "border-blue-500"
                          : problem.status === "IN_PROGRESS"
                          ? "border-orange-500"
                          : problem.status === "RESOLVED"
                          ? "border-green-500"
                          : "border-gray-500"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold">{problem.title}</h4>
                          <p className="text-sm text-gray-600">
                            {problem.description.length > 80
                              ? `${problem.description.substring(0, 80)}...`
                              : problem.description}
                          </p>
                          {problem.tags.length > 0 && (
                            <div className="flex space-x-1 mt-2">
                              {problem.tags.slice(0, 3).map((tag, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        {getStatusBadge(problem.status)}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-5 w-5">
                              <AvatarImage
                                src={
                                  problem.user.image ||
                                  "/placeholder.svg?height=20&width=20"
                                }
                              />
                              <AvatarFallback className="bg-[#A63D00] text-white text-xs">
                                {problem.user.name?.charAt(0)?.toUpperCase() ||
                                  "S"}
                              </AvatarFallback>
                            </Avatar>
                            <span>{problem.user.name || "Student"}</span>
                          </div>
                          <span>{getTimeAgo(problem.createdAt)}</span>
                        </div>
                        <div className="flex space-x-2">
                          {problem.mentor ? (
                            problem.mentor.name === session?.user?.name ? (
                              <Button
                                size="sm"
                                className="bg-[#A63D00] hover:bg-[#A63D00]/90"
                              >
                                <MessageSquare className="h-3 w-3 mr-1" />
                                Continue
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline" disabled>
                                Assigned to {problem.mentor.name}
                              </Button>
                            )
                          ) : (
                            <Button
                              size="sm"
                              className="bg-[#A63D00] hover:bg-[#A63D00]/90"
                              onClick={() => handleAssignToMe(problem.id)}
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              Take This
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
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
                  <span className="text-sm">Total Problems</span>
                  <span className="text-sm font-bold text-[#A63D00]">
                    {problemsLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      stats.totalProblems
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Resolution Rate</span>
                  <span className="text-sm font-bold text-[#A63D00]">
                    {problemsLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : stats.totalProblems > 0 ? (
                      `${Math.round(
                        (stats.resolvedProblems / stats.totalProblems) * 100
                      )}%`
                    ) : (
                      "0%"
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">In Progress</span>
                  <span className="text-sm font-bold text-[#A63D00]">
                    {problemsLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      stats.inProgressProblems
                    )}
                  </span>
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
