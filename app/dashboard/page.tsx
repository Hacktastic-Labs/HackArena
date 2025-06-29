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

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useProblems } from "@/app/lib/use-problems";
import { CreateProblemModal } from "@/components/create-problem-modal";
import PageTransition from "@/components/PageTransition";
import { CreateAnnouncementModal } from "@/components/create-announcement-modal";

interface Mentor {
  id: string;
  name: string;
  email: string;
  image?: string;
  // Add other mentor properties as needed from your schema
}

const ACTIVITY_COLORS = [
  '#FFB74D', // least bright (top)
  '#FFCC80', // even less bright
  '#FFE0B2', // less bright
  '#FFF3E0', // brightest (bottom)
];

const ACTIVITY_COLORS_HOVER = [
  '#FFA726', // hover for least bright
  '#FFB74D', // hover for even less bright
  '#FFCC80', // hover for less bright
  '#FFE0B2', // hover for brightest
];

const getButtonClasses = (path: string, currentPath: string) => {
  const baseClasses = "px-5 py-2 rounded-lg font-bold border-2 transition-all duration-150";
  const activeClasses = "bg-[#FFB74D] text-[#A63D00] border-[#A63D00] shadow-[6px_6px_0px_0px_#000000] hover:bg-[#FFF8E1] hover:shadow-[3px_3px_0px_0px_#000000] hover:translate-x-1 hover:translate-y-1";
  const inactiveClasses = "bg-transparent text-black border-transparent hover:bg-[#FFF8E1] hover:text-[#A63D00]";

  if (path === "/dashboard" && currentPath === "/dashboard") {
    return `px-5 py-2 rounded-lg font-bold border-2 bg-[#232323] text-[#FFB74D] border-[#FFB74D] shadow-[6px_6px_0px_0px_#000000]`;
  }
  
  return `${baseClasses} ${currentPath === path ? activeClasses : inactiveClasses}`;
};

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();
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
                className={getButtonClasses("/dashboard", pathname)}
                onClick={() => router.push("/dashboard")}
              >
                Dashboard
              </Button>
              <Button
                className={getButtonClasses("/problems", pathname)}
                onClick={() => router.push("/problems")}
              >
                My Problems
              </Button>
              <Button
                className={getButtonClasses("/mentors", pathname)}
                onClick={() => router.push("/mentors")}
              >
                Mentors
              </Button>
              <Button
                className={getButtonClasses("/knowledge", pathname)}
                onClick={() => router.push("/knowledge")}
              >
                Knowledge
              </Button>
              <Button
                className={getButtonClasses("/events", pathname)}
                onClick={() => router.push("/events")}
              >
                Events
              </Button>
              <Button
                className={getButtonClasses("/updates", pathname)}
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
                <AvatarFallback className="bg-[#A63D00] text-white font-bold">
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
      <PageTransition>
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

          {/* Quick Stats - Keep frontend-student card styling */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: "Active Problems",
                count: problemsLoading ? "..." : problems.length,
                icon: <MessageSquare className="h-5 w-5 text-[#A63D00] group-hover:text-[#FFB74D]" />,
                route: "/problems",
                subtitle: "Click to manage"
              },
              {
                title: "Mentors Available",
                count: 47,
                icon: <Users className="h-5 w-5 text-[#A63D00] group-hover:text-[#FFB74D]" />,
                route: "/mentors",
                subtitle: "Find your mentor"
              },
              {
                title: "Upcoming Events",
                count: 8,
                icon: <Calendar className="h-5 w-5 text-[#A63D00] group-hover:text-[#FFB74D]" />,
                route: "/events",
                subtitle: "Join events"
              },
              {
                title: "Knowledge Points",
                count: 1247,
                icon: <TrendingUp className="h-5 w-5 text-[#A63D00] group-hover:text-[#FFB74D]" />,
                route: "/knowledge",
                subtitle: "Explore knowledge"
              }
            ].map((card, idx) => (
              <Card
                key={idx}
                className="bg-[#FFF8E1] border-4 border-black rounded-md shadow-[6px_6px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#FFB74D] transition-all duration-200 cursor-pointer group"
                onClick={() => router.push(card.route)}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-extrabold text-[#232323]">
                    {card.title}
                  </CardTitle>
                  {card.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-black text-[#A63D00]">{card.count}</div>
                  <p className="text-xs text-[#232323] font-semibold">{card.subtitle}</p>
                </CardContent>
              </Card>
            ))}
          </div>


          {/* Recent Activity */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {problemsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-[#A63D00]" />
                  <span className="ml-2 text-gray-600">Loading recent problems...</span>
                </div>
              ) : problems.length === 0 ? (
                <Card className="bg-[#FFF8E1] border-4 border-black rounded-md text-center py-8">
                  <CardContent>
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-extrabold text-[#232323] mb-2">No recent activity</h3>
                    <p className="text-[#232323] mb-4 font-semibold">
                      Start by posting your first problem or exploring the knowledge base.
                    </p>
                    <div className="flex justify-center space-x-4">
                      <Button 
                        className="bg-[#A63D00] hover:bg-[#A63D00]/90 border-2 border-black shadow-[3px_3px_0px_0px_#000] font-bold"
                        onClick={() => setIsCreateModalOpen(true)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Post Problem
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-2 border-black text-[#A63D00] font-bold shadow-[3px_3px_0px_0px_#000]"
                        onClick={() => router.push("/knowledge")}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Browse Knowledge
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                problems.slice(0, 3).map((problem, idx) => (
                  <Card key={problem.id} className="border-4 border-black rounded-xl group hover:shadow-lg transition-transform cursor-pointer"
                    style={{ backgroundColor: ACTIVITY_COLORS[idx] }}
                    onClick={() => router.push("/problems")}
                  >
                    <CardContent className="py-6 px-8">
                      <div className="flex items-center mb-2 space-x-2">
                        <h4 className="font-extrabold text-lg text-black">{problem.title}</h4>
                        <span className="px-3 py-1 bg-[#FFE066] text-black border-2 border-black font-bold rounded-full text-xs">OPEN</span>
                      </div>
                      <p className="text-base text-[#232323] mb-1">{problem.description}</p>
                      <p className="text-sm text-gray-700 mb-1">{new Date(problem.createdAt).toLocaleDateString()}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {problem.tags.slice(0, 2).map((tag, i) => (
                          <span key={i} className="bg-white border-2 border-black text-black font-bold rounded-full px-3 py-1 text-xs">{tag}</span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </PageTransition>

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
