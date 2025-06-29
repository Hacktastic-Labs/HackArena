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
  Megaphone,
  X,
} from "lucide-react";
import { useSession, signOut } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useMentorProblems } from "@/app/lib/use-mentor-problems";
import { CreateAnnouncementModal } from "@/components/create-announcement-modal";
import Link from "next/link";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const BRUTALIST_COLORS = [
  '#FFF8E1', '#FFD580', '#FDE1BC', '#FFB800', '#F96D3A', '#FFEDC2'
];

export default function MentorDashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const {
    problems,
    stats,
    isLoading: problemsLoading,
    assignMentorToProblem,
  } = useMentorProblems();
  const [isAnnModalOpen, setIsAnnModalOpen] = React.useState(false);
  const [skills, setSkills] = React.useState<string[]>([]);
  const [skillInput, setSkillInput] = React.useState("");
  const [isUpdatingSkills, setIsUpdatingSkills] = React.useState(false);

  React.useEffect(() => {
    if (session?.user) {
      setSkills((session.user as any).skills || []);
    }
  }, [session]);

  const handleAddSkill = async () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      const newSkills = [...skills, skillInput.trim()];
      await updateSkills(newSkills);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = async (skillToRemove: string) => {
    const newSkills = skills.filter((skill) => skill !== skillToRemove);
    await updateSkills(newSkills);
  };

  const updateSkills = async (newSkills: string[]) => {
    setIsUpdatingSkills(true);
    try {
      const response = await fetch('/api/mentors', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills: newSkills }),
      });
      if (!response.ok) {
        throw new Error('Failed to update skills');
      }
      setSkills(newSkills);
      toast.success("Skills updated successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An unknown error occurred.");
    } finally {
      setIsUpdatingSkills(false);
    }
  };

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

  const myAssignedProblems = problems.filter(
    (p) => p.mentor?.id === session?.user.id
  );
  const openProblems = problems.filter((p) => p.status === "OPEN" && !p.mentor);

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

  const statsCards = [
    { title: 'Active Students', value: stats.uniqueStudents, icon: Users, description: 'Students with problems' },
    { title: 'Open Problems', value: stats.openProblems, icon: MessageSquare, description: 'Awaiting mentors' },
    { title: 'My Mentoring', value: stats.myMentoredProblems, icon: Calendar, description: "Problems I'm helping with" },
    { title: 'Resolved Problems', value: stats.resolvedProblems, icon: Star, description: 'Successfully solved' }
  ];

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
                onClick={() => setIsAnnModalOpen(true)}
                className="group relative"
              >
                <Megaphone className="h-4 w-4 group-hover:fill-[#A63D00] group-hover:text-[#A63D00] transition-all duration-300" />
              </Button>
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
        <div className="text-left mb-12">
          <h1 className="text-4xl font-extrabold text-black mb-2 uppercase">
            Welcome back, {session.user?.name || "Mentor"}!
          </h1>
          <p className="text-lg text-gray-700 font-semibold">
            Here&apos;s an overview of your mentoring activities.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {statsCards.map((stat, index) => (
                <Card key={index} className="border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_#000] transition-all duration-300 hover:shadow-[12px_12px_0px_0px_#000]" style={{ backgroundColor: BRUTALIST_COLORS[index % BRUTALIST_COLORS.length] }}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-bold uppercase">{stat.title}</CardTitle>
                        <stat.icon className="h-6 w-6 text-black" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold text-black">
                            {problemsLoading ? <Loader2 className="h-8 w-8 animate-spin" /> : stat.value}
                        </div>
                        <p className="text-xs text-black font-semibold">{stat.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Problem Lists */}
          <div className="lg:col-span-2 space-y-8">
            {/* My Assigned Problems */}
            <div>
              <h2 className="text-2xl font-extrabold text-black mb-4 uppercase">My Assigned Problems</h2>
              <div className="space-y-6">
                {problemsLoading ? (
                  <Card className="border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_#000] p-6 bg-white flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-[#A63D00]" />
                    <span className="ml-2 text-gray-600 font-semibold">Loading problems...</span>
                  </Card>
                ) : myAssignedProblems.length === 0 ? (
                  <Card className="border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_#000] p-6 bg-white text-center">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-extrabold text-black mb-2">No problems assigned to you yet.</h3>
                    <p className="text-gray-600 font-semibold">When you take a problem, it will appear here.</p>
                  </Card>
                ) : (
                  myAssignedProblems.map((problem) => (
                    <Card key={problem.id} className="border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_#A63D00] p-6" style={{ backgroundColor: '#FFF8E1' }}>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="font-bold text-xl uppercase">{problem.title}</h4>
                          <p className="text-sm text-gray-700 mt-2">
                            {problem.description.length > 100 ? `${problem.description.substring(0, 100)}...` : problem.description}
                          </p>
                          {problem.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              {problem.tags.map((tag, index) => ( <Badge key={index} variant="secondary" className="border-2 border-black font-bold">{tag}</Badge> ))}
                            </div>
                          )}
                        </div>
                        <div className="ml-4">{getStatusBadge(problem.status)}</div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600 font-semibold">
                          <Avatar className="h-6 w-6 border-2 border-black"><AvatarImage src={problem.user.image || ''} /><AvatarFallback>{problem.user.name?.charAt(0)}</AvatarFallback></Avatar>
                          <span>{problem.user.name}</span>
                          <span>&bull;</span>
                          <span>{getTimeAgo(problem.createdAt)}</span>
                        </div>
                        <Button size="sm" className="bg-[#FDFCF8] text-black font-bold rounded-md px-4 py-2 border-2 border-black transition-transform duration-150 hover:scale-105 hover:shadow-[2px_2px_0_0_#000]" asChild>
                          <Link href={`/problems/${problem.id}`}> <MessageSquare className="h-4 w-4 mr-2" />Continue</Link>
                        </Button>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>

            {/* Open Queries */}
            <div>
              <h2 className="text-2xl font-extrabold text-black mb-4 uppercase">Open Queries</h2>
              <div className="space-y-6">
                {problemsLoading ? (
                  <Card className="border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_#000] p-6 bg-white flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-[#A63D00]" />
                    <span className="ml-2 text-gray-600 font-semibold">Loading problems...</span>
                  </Card>
                ) : openProblems.length === 0 ? (
                  <Card className="border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_#000] p-6 bg-white text-center">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-extrabold text-black mb-2">No open student problems.</h3>
                    <p className="text-gray-600 font-semibold">Check back later for new queries.</p>
                  </Card>
                ) : (
                  openProblems.map((problem) => (
                     <Card key={problem.id} className="border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_#000] p-6 bg-white">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="font-bold text-xl uppercase">{problem.title}</h4>
                          <p className="text-sm text-gray-700 mt-2">
                            {problem.description.length > 100 ? `${problem.description.substring(0, 100)}...` : problem.description}
                          </p>
                          {problem.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              {problem.tags.map((tag, index) => ( <Badge key={index} variant="secondary" className="border-2 border-black font-bold">{tag}</Badge> ))}
                            </div>
                          )}
                        </div>
                        <div className="ml-4">{getStatusBadge(problem.status)}</div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600 font-semibold">
                           <Avatar className="h-6 w-6 border-2 border-black"><AvatarImage src={problem.user.image || ''} /><AvatarFallback>{problem.user.name?.charAt(0)}</AvatarFallback></Avatar>
                           <span>{problem.user.name}</span>
                           <span>&bull;</span>
                          <span>{getTimeAgo(problem.createdAt)}</span>
                        </div>
                        <Button size="sm" className="bg-[#FDFCF8] text-black font-bold rounded-md px-4 py-2 border-2 border-black transition-transform duration-150 hover:scale-105 hover:shadow-[2px_2px_0_0_#000]" onClick={() => handleAssignToMe(problem.id)}>
                          <Plus className="h-4 w-4 mr-2" />Take This
                        </Button>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <Card className="border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_#000]" style={{ backgroundColor: BRUTALIST_COLORS[1] }}>
              <CardHeader>
                <CardTitle className="text-lg font-extrabold uppercase">Performance Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center font-semibold"><span className="text-sm">Total Problems</span><span className="text-sm font-bold text-black">{problemsLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : stats.totalProblems}</span></div>
                <div className="flex justify-between items-center font-semibold"><span className="text-sm">Resolution Rate</span><span className="text-sm font-bold text-black">{problemsLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : stats.totalProblems > 0 ? `${Math.round((stats.resolvedProblems / stats.totalProblems) * 100)}%` : "0%"}</span></div>
                <div className="flex justify-between items-center font-semibold"><span className="text-sm">In Progress</span><span className="text-sm font-bold text-black">{problemsLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : stats.inProgressProblems}</span></div>
                <Button className="w-full bg-transparent border-2 border-black text-black font-bold hover:bg-black hover:text-white transition-all">
                  <BarChart3 className="h-4 w-4 mr-2" />View Detailed Stats
                </Button>
              </CardContent>
            </Card>

            <Card className="border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_#000]" style={{ backgroundColor: BRUTALIST_COLORS[2] }}>
              <CardHeader>
                <CardTitle className="text-lg font-extrabold uppercase">My Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1 border-2 border-black font-bold">
                      {skill}
                      <button onClick={() => handleRemoveSkill(skill)} className="hover:text-red-500"><X className="w-3 h-3"/></button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} placeholder="Add a new skill..." className="border-2 border-black" />
                  <Button onClick={handleAddSkill} disabled={isUpdatingSkills} className="bg-transparent border-2 border-black text-black font-bold hover:bg-black hover:text-white transition-all">
                    {isUpdatingSkills ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Add'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_#000]" style={{ backgroundColor: BRUTALIST_COLORS[4] }}>
              <CardHeader>
                <CardTitle className="text-lg font-extrabold uppercase">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-center bg-transparent border-2 border-black text-black font-bold hover:bg-black hover:text-white transition-all">
                  <BookOpen className="h-4 w-4 mr-2" />Create Knowledge Article
                </Button>
                <Button className="w-full justify-center bg-transparent border-2 border-black text-black font-bold hover:bg-black hover:text-white transition-all">
                  <Calendar className="h-4 w-4 mr-2" />Schedule Office Hours
                </Button>
                <Button className="w-full justify-center bg-transparent border-2 border-black text-black font-bold hover:bg-black hover:text-white transition-all">
                  <Users className="h-4 w-4 mr-2" />Manage Students
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <CreateAnnouncementModal
        isOpen={isAnnModalOpen}
        onClose={() => setIsAnnModalOpen(false)}
        onCreated={() => window.location.reload()}
      />
    </div>
  );
}
