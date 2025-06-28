"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Plus,
  MessageSquare,
  CheckCircle,
  Loader2,
  Bell,
} from "lucide-react"
import { useSession } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useProblems } from "@/app/lib/use-problems";
import { CreateProblemModal } from "@/components/create-problem-modal";

export default function ProblemsPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const { problems, isLoading: problemsLoading, createProblem } = useProblems();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateProblem = async (data: { title: string; description: string; tags: string[] }) => {
    await createProblem(data);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'OPEN':
        return <Badge className="bg-blue-100 text-blue-800">Open</Badge>;
      case 'IN_PROGRESS':
        return <Badge className="bg-orange-100 text-orange-800">In Progress</Badge>;
      case 'RESOLVED':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Resolved</Badge>;
      case 'CLOSED':
        return <Badge className="bg-gray-100 text-gray-800">Closed</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

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
              <Button variant="ghost" size="sm" onClick={() => router.push("/problems")} className="bg-[#A63D00]/10 text-[#A63D00]">
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
              <Button variant="ghost" size="sm" onClick={() => router.push("/updates")}>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Problems</h1>
            <p className="text-gray-600">Track and manage your technical problems and get help from mentors.</p>
          </div>
          <Button 
            className="bg-[#A63D00] hover:bg-[#A63D00]/90"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Post New Problem
          </Button>
        </div>

        <div className="space-y-4">
          {problemsLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-[#A63D00]" />
              <span className="ml-2 text-gray-600">Loading your problems...</span>
            </div>
          ) : problems.length === 0 ? (
            <Card className="border-[#A63D00]/20">
              <CardContent className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No problems yet</h3>
                <p className="text-gray-600 mb-4">
                  Start by posting your first problem to get help from our community of mentors.
                </p>
                <Button 
                  className="bg-[#A63D00] hover:bg-[#A63D00]/90"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Post Your First Problem
                </Button>
              </CardContent>
            </Card>
          ) : (
            problems.map((problem) => (
              <Card key={problem.id} className="border-[#A63D00]/20">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{problem.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {problem.description.length > 150 
                          ? `${problem.description.substring(0, 150)}...` 
                          : problem.description}
                      </CardDescription>
                    </div>
                    {getStatusBadge(problem.status)}
                  </div>
                  {problem.tags.length > 0 && (
                    <div className="flex items-center space-x-2 mt-4 flex-wrap gap-2">
                      {problem.tags.map((tag, index) => (
                        <Badge 
                          key={index} 
                          className="bg-[#FF6B35] text-white"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-gray-600">
                        Created {new Date(problem.createdAt).toLocaleDateString()}
                      </div>
                      {problem.mentor && (
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={problem.mentor.image || "/placeholder.svg?height=24&width=24"} />
                            <AvatarFallback className="bg-[#A63D00] text-white text-xs">
                              {problem.mentor.name?.charAt(0)?.toUpperCase() || 'M'}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-600">{problem.mentor.name} (Mentor)</span>
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      {problem.mentor ? (
                        <Button variant="outline" size="sm" className="border-[#A63D00] text-[#A63D00] bg-transparent">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Chat
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="border-[#A63D00] text-[#A63D00] bg-transparent">
                          Find Mentor
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
      
      <CreateProblemModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateProblem}
      />
    </div>
  )
} 