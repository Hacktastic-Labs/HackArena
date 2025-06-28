"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Plus,
  MessageSquare,
  Calendar,
  BookOpen,
  TrendingUp,
  Users,
  Bell,
  CheckCircle,
  Loader2,
  ArrowRight,
  User,
  Megaphone,
  LogOut,
} from "lucide-react";
import { useSession, signOut } from "@/app/lib/auth-client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useProblems } from "@/app/lib/use-problems";
import { CreateProblemModal } from "@/components/create-problem-modal";
import { CreateAnnouncementModal } from "@/components/create-announcement-modal";

interface Mentor {
  id: string;
  name: string;
  email: string;
  image?: string;
  // Add other mentor properties as needed from your schema
}

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const { problems, isLoading: problemsLoading, createProblem } = useProblems();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [mentorsLoading, setMentorsLoading] = useState(true);
  const [isAnnModalOpen, setIsAnnModalOpen] = useState(false);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch("/api/mentors");
        if (response.ok) {
          const data = await response.json();
          setMentors(data);
        }
      } catch (error) {
        console.error("Failed to fetch mentors", error);
      } finally {
        setMentorsLoading(false);
      }
    };

    fetchMentors();
  }, []);

  const handleCreateProblem = async (data: {
    title: string;
    description: string;
    tags: string[];
  }) => {
    await createProblem(data);
  };

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/register");
    } else if (
      !isPending &&
      (session?.user as { role?: string })?.role === "MENTOR"
    ) {
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
                variant="ghost"
                size="sm"
                onClick={() => router.push("/dashboard")}
                className="bg-[#A63D00]/10 text-[#A63D00]"
              >
                Dashboard
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/problems")}
              >
                My Problems
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/mentors")}
              >
                Mentors
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/knowledge")}
              >
                Knowledge
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/events")}
              >
                Events
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/updates")}
              >
                Updates
              </Button>
              {(session?.user as { role?: string })?.role === "ADMIN" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAnnModalOpen(true)}
                  className="group relative"
                >
                  <Megaphone className="h-4 w-4 group-hover:fill-[#A63D00] group-hover:text-[#A63D00] transition-all duration-300" />
                </Button>
              )}
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
            Welcome back, {session.user?.name || "Student"}!
          </h1>
          <p className="text-gray-600">
            Here&apos;s what&apos;s happening with your learning journey today.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card
            className="border-[#A63D00]/20 hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => router.push("/problems")}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Problems
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-[#A63D00]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#A63D00]">
                {problemsLoading ? "..." : problems.length}
              </div>
              <p className="text-xs text-gray-600">Click to manage</p>
            </CardContent>
          </Card>

          <Card
            className="border-[#A63D00]/20 hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => router.push("/mentors")}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Mentors Available
              </CardTitle>

              <Users className="h-4 w-4 text-[#A63D00]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#A63D00]">47</div>
              <p className="text-xs text-gray-600">Find your mentor</p>
            </CardContent>
          </Card>

          <Card
            className="border-[#A63D00]/20 hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => router.push("/events")}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Upcoming Events
              </CardTitle>

              <Calendar className="h-4 w-4 text-[#A63D00]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#A63D00]">8</div>
              <p className="text-xs text-gray-600">Join events</p>
            </CardContent>
          </Card>

          <Card
            className="border-[#A63D00]/20 hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => router.push("/knowledge")}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Knowledge Points
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-[#A63D00]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#A63D00]">1,247</div>
              <p className="text-xs text-gray-600">Explore knowledge</p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card
            className="border-[#A63D00]/20 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => router.push("/problems")}
          >
            <CardHeader className="flex flex-row items-center space-y-0">
              <MessageSquare className="h-8 w-8 text-[#A63D00] mr-4" />
              <div className="flex-1">
                <CardTitle className="text-xl">My Problems</CardTitle>
                <CardDescription>
                  Post questions and track your problem-solving journey
                </CardDescription>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {problemsLoading
                    ? "Loading..."
                    : `${problems.length} active problems`}
                </span>
                <Button
                  className="bg-[#A63D00] hover:bg-[#A63D00]/90"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCreateModalOpen(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card
            className="border-[#A63D00]/20 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => router.push("/mentors")}
          >
            <CardHeader className="flex flex-row items-center space-y-0">
              <User className="h-8 w-8 text-[#A63D00] mr-4" />
              <div className="flex-1">
                <CardTitle className="text-xl">Find Mentors</CardTitle>
                <CardDescription>
                  Connect with experienced professionals for guidance
                </CardDescription>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600">
                47 mentors available across various technologies
              </div>
            </CardContent>
          </Card>

          <Card
            className="border-[#A63D00]/20 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => router.push("/knowledge")}
          >
            <CardHeader className="flex flex-row items-center space-y-0">
              <BookOpen className="h-8 w-8 text-[#A63D00] mr-4" />
              <div className="flex-1">
                <CardTitle className="text-xl">Knowledge Base</CardTitle>
                <CardDescription>
                  Browse solutions and learn from community wisdom
                </CardDescription>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600">
                2,847+ solutions across 156 categories
              </div>
            </CardContent>
          </Card>

          <Card
            className="border-[#A63D00]/20 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => router.push("/events")}
          >
            <CardHeader className="flex flex-row items-center space-y-0">
              <Calendar className="h-8 w-8 text-[#A63D00] mr-4" />
              <div className="flex-1">
                <CardTitle className="text-xl">Events & Workshops</CardTitle>
                <CardDescription>
                  Join community events and learning workshops
                </CardDescription>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600">
                8 upcoming events this month
              </div>
            </CardContent>
          </Card>

          <Card
            className="border-[#A63D00]/20 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => router.push("/updates")}
          >
            <CardHeader className="flex flex-row items-center space-y-0">
              <Megaphone className="h-8 w-8 text-[#A63D00] mr-4" />
              <div className="flex-1">
                <CardTitle className="text-xl">Latest Updates</CardTitle>
                <CardDescription>
                  Stay informed about platform news and announcements
                </CardDescription>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600">
                New features and important announcements
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {problemsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-[#A63D00]" />
                <span className="ml-2 text-gray-600">
                  Loading recent problems...
                </span>
              </div>
            ) : problems.length === 0 ? (
              <Card className="border-[#A63D00]/20">
                <CardContent className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No recent activity
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Start by posting your first problem or exploring the
                    knowledge base.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button
                      className="bg-[#A63D00] hover:bg-[#A63D00]/90"
                      onClick={() => setIsCreateModalOpen(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Post Problem
                    </Button>
                    <Button
                      variant="outline"
                      className="border-[#A63D00] text-[#A63D00] bg-transparent"
                      onClick={() => router.push("/knowledge")}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Browse Knowledge
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              problems.slice(0, 3).map((problem) => (
                <Card
                  key={problem.id}
                  className="border-[#A63D00]/20 hover:shadow-sm transition-shadow cursor-pointer"
                  onClick={() => router.push("/problems")}
                >
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium">{problem.title}</h4>
                          <Badge
                            className={
                              problem.status === "RESOLVED"
                                ? "bg-green-100 text-green-800"
                                : problem.status === "IN_PROGRESS"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-blue-100 text-blue-800"
                            }
                          >
                            {problem.status === "RESOLVED" && (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            )}
                            {problem.status.replace("_", " ")}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {problem.description.length > 100
                            ? `${problem.description.substring(0, 100)}...`
                            : problem.description}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-xs text-gray-500">
                            {new Date(problem.createdAt).toLocaleDateString()}
                          </span>
                          {problem.tags.slice(0, 2).map((tag, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 ml-4" />
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      <CreateProblemModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateProblem}
      />
      <CreateAnnouncementModal
        isOpen={isAnnModalOpen}
        onClose={() => setIsAnnModalOpen(false)}
        onCreated={() => window.location.reload()}
      />
    </div>
  );
}
