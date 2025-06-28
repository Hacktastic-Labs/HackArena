"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Plus,
  MessageSquare,
  Calendar,
  BookOpen,
  TrendingUp,
  Users,
  Bell,
  Filter,
  Star,
  Clock,
  CheckCircle,
  Loader2,
} from "lucide-react"
import { useSession } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useProblems } from "@/app/lib/use-problems";
import { CreateProblemModal } from "@/components/create-problem-modal";

export default function DashboardPage() {
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
              {/* Navigation - Update the bell button */}
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {session.user?.name || "Student"}!</h1>
          <p className="text-gray-600">Here&apos;s what&apos;s happening with your learning journey today.</p>
        </div>

        {/* Quick Stats */}
        {/* Quick Stats - Add hover effects */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-[#A63D00]/20 hover:scale-105 transition-transform duration-300 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Problems</CardTitle>
              <MessageSquare className="h-4 w-4 text-[#A63D00]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#A63D00]">3</div>
              <p className="text-xs text-gray-600">+1 from last week</p>
            </CardContent>
          </Card>

          <Card className="border-[#A63D00]/20 hover:scale-105 transition-transform duration-300 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mentors Connected</CardTitle>
              <Users className="h-4 w-4 text-[#A63D00]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#A63D00]">7</div>
              <p className="text-xs text-gray-600">Across 5 topics</p>
            </CardContent>
          </Card>

          <Card className="border-[#A63D00]/20 hover:scale-105 transition-transform duration-300 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Events Attended</CardTitle>
              <Calendar className="h-4 w-4 text-[#A63D00]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#A63D00]">12</div>
              <p className="text-xs text-gray-600">This month</p>
            </CardContent>
          </Card>

          <Card className="border-[#A63D00]/20 hover:scale-105 transition-transform duration-300 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Knowledge Points</CardTitle>
              <TrendingUp className="h-4 w-4 text-[#A63D00]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#A63D00]">1,247</div>
              <p className="text-xs text-gray-600">+89 this week</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="problems" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white border border-[#A63D00]/20">
            <TabsTrigger value="problems" className="data-[state=active]:bg-[#A63D00] data-[state=active]:text-white">
              My Problems
            </TabsTrigger>
            <TabsTrigger value="mentors" className="data-[state=active]:bg-[#A63D00] data-[state=active]:text-white">
              Mentors
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="data-[state=active]:bg-[#A63D00] data-[state=active]:text-white">
              Knowledge
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-[#A63D00] data-[state=active]:text-white">
              Events
            </TabsTrigger>
            <TabsTrigger
              value="announcements"
              className="data-[state=active]:bg-[#A63D00] data-[state=active]:text-white"
            >
              Updates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="problems" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">My Problems</h2>
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
          </TabsContent>

          <TabsContent value="mentors" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Recommended Mentors</h2>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Search mentors..." className="pl-10 w-64" />
                </div>
                <Button variant="outline" className="border-[#A63D00] text-[#A63D00] bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Update mentor cards with vibrant colors */}
              <Card className="border-[#A63D00]/20 hover:shadow-lg transition-shadow bg-gradient-to-br from-[#FFE8CC] to-[#F4D4A7]">
                <CardHeader className="text-center">
                  <Avatar className="h-16 w-16 mx-auto mb-4 ring-4 ring-[#A63D00]/20">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback className="bg-[#A63D00] text-white">AL</AvatarFallback>
                  </Avatar>
                  <CardTitle>Alex Lee</CardTitle>
                  <CardDescription>Senior Full-Stack Developer</CardDescription>
                  <div className="flex items-center justify-center space-x-1 mt-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">4.9</span>
                    <span className="text-sm text-gray-600">(127 reviews)</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="bg-[#FF6B35] text-white">React</Badge>
                    <Badge className="bg-[#4ECDC4] text-white">Node.js</Badge>
                    <Badge className="bg-[#8B3400] text-white">Python</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    5+ years experience helping students with web development and system design.
                  </p>
                  <Button className="w-full bg-[#A63D00] hover:bg-[#A63D00]/90">Connect</Button>
                </CardContent>
              </Card>

              <Card className="border-[#A63D00]/20 hover:shadow-lg transition-shadow bg-gradient-to-br from-[#4ECDC4]/20 to-[#44B3AC]/20">
                <CardHeader className="text-center">
                  <Avatar className="h-16 w-16 mx-auto mb-4 ring-4 ring-[#4ECDC4]/30">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback className="bg-[#4ECDC4] text-white">RP</AvatarFallback>
                  </Avatar>
                  <CardTitle>Rachel Park</CardTitle>
                  <CardDescription>Data Science Lead</CardDescription>
                  <div className="flex items-center justify-center space-x-1 mt-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">4.8</span>
                    <span className="text-sm text-gray-600">(89 reviews)</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="bg-[#8B3400] text-white">Python</Badge>
                    <Badge className="bg-[#FF6B35] text-white">ML</Badge>
                    <Badge className="bg-[#4ECDC4] text-white">Statistics</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Expert in machine learning and data analysis with 7+ years experience.
                  </p>
                  <Button className="w-full bg-[#4ECDC4] hover:bg-[#44B3AC] text-white">Connect</Button>
                </CardContent>
              </Card>

              <Card className="border-[#A63D00]/20 hover:shadow-lg transition-shadow bg-gradient-to-br from-[#FF6B35]/20 to-[#E55A2B]/20">
                <CardHeader className="text-center">
                  <Avatar className="h-16 w-16 mx-auto mb-4 ring-4 ring-[#FF6B35]/30">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback className="bg-[#FF6B35] text-white">DW</AvatarFallback>
                  </Avatar>
                  <CardTitle>David Wilson</CardTitle>
                  <CardDescription>Mobile App Developer</CardDescription>
                  <div className="flex items-center justify-center space-x-1 mt-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">4.7</span>
                    <span className="text-sm text-gray-600">(156 reviews)</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="bg-[#4ECDC4] text-white">React Native</Badge>
                    <Badge className="bg-[#8B3400] text-white">Flutter</Badge>
                    <Badge className="bg-[#FF6B35] text-white">iOS</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Specialized in cross-platform mobile development and UI/UX design.
                  </p>
                  <Button className="w-full bg-[#FF6B35] hover:bg-[#E55A2B] text-white">Connect</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="knowledge" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Knowledge Base</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search knowledge base..." className="pl-10 w-64" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-[#A63D00]/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-[#A63D00]" />
                    Recent Solutions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-l-4 border-[#A63D00] pl-4">
                    <h4 className="font-medium">React Hook Optimization</h4>
                    <p className="text-sm text-gray-600">Best practices for optimizing React hooks performance</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        React
                      </Badge>
                      <span className="text-xs text-gray-500">2 days ago</span>
                    </div>
                  </div>
                  <div className="border-l-4 border-[#A63D00] pl-4">
                    <h4 className="font-medium">Database Indexing Strategies</h4>
                    <p className="text-sm text-gray-600">How to improve query performance with proper indexing</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        Database
                      </Badge>
                      <span className="text-xs text-gray-500">5 days ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#A63D00]/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-[#A63D00]" />
                    Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Machine Learning</span>
                    <Badge className="bg-[#A63D00]/10 text-[#A63D00]">+15%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">React Development</span>
                    <Badge className="bg-[#A63D00]/10 text-[#A63D00]">+12%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">System Design</span>
                    <Badge className="bg-[#A63D00]/10 text-[#A63D00]">+8%</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
              <Button className="bg-[#A63D00] hover:bg-[#A63D00]/90">
                <Calendar className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </div>

            <div className="space-y-4">
              <Card className="border-[#A63D00]/20">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>React Workshop: Advanced Patterns</CardTitle>
                      <CardDescription className="mt-2">
                        Deep dive into advanced React patterns and best practices
                      </CardDescription>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Workshop</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Dec 15, 2024 • 2:00 PM</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">45/50 registered</span>
                      </div>
                    </div>
                    <Button variant="outline" className="border-[#A63D00] text-[#A63D00] bg-transparent">
                      Register
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#A63D00]/20">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>AI/ML Study Group</CardTitle>
                      <CardDescription className="mt-2">
                        Weekly study group for machine learning enthusiasts
                      </CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Study Group</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Every Friday • 6:00 PM</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">12 members</span>
                      </div>
                    </div>
                    <Button className="bg-[#A63D00] hover:bg-[#A63D00]/90">Join Group</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="announcements" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Latest Updates</h2>
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
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <CreateProblemModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateProblem}
      />
    </div>
  )
}
