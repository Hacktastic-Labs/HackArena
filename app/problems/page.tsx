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
  LogOut,
} from "lucide-react"
import { useSession, signOut } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useProblems } from "@/app/lib/use-problems";
import { CreateProblemModal } from "@/components/create-problem-modal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PageTransition from "@/components/PageTransition";

const ACTIVITY_COLORS = [
  '#FFB74D', // least bright (top)
  '#FFCC80', // even less bright
  '#FFE0B2', // less bright
  '#FFF3E0', // brightest (bottom)
];

const PALETTE_BORDERS = [
  '#A63D00', // burnt orange
  '#FFB800', // yellow
  '#F96D3A', // orange
  '#232323', // black
  '#FFD580', // light yellow
  '#FF6F61', // coral
  '#FFEDC2', // pale yellow
];
const PALETTE_INNER = [
  '#FFB800', // yellow
  '#A63D00', // burnt orange
  '#232323', // black
  '#F96D3A', // orange
  '#FF6F61', // coral
  '#FFD580', // light yellow
  '#FFEDC2', // pale yellow
];

const DASHBOARD_COLORS = [
  '#FDE1BC', // light orange
  '#FFF8E1', // off-white
  '#FFB800', // yellow
  '#F96D3A', // orange
  '#FFD580', // light yellow
  '#FFEDC2', // pale yellow
];

export default function ProblemsPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const { problems, isLoading: problemsLoading, createProblem } = useProblems();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const pathname = usePathname();

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
                  {session.user?.name?.charAt(0)?.toUpperCase() || "S"}
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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Problems</h1>
              <p className="text-gray-600">Track and manage your technical problems and get help from mentors.</p>
            </div>
            <Button 
              className="bg-[#A63D00] hover:bg-[#A63D00]/90 border-2 border-black shadow-[3px_3px_0px_0px_#000] font-bold"
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
              <Card className="bg-[#FFF8E1] border-4 border-black rounded-md shadow-[6px_6px_0px_0px_#A63D00] hover:shadow-[12px_12px_0px_0px_#A63D00] transition-all duration-200 text-center py-8 cursor-pointer">
                <CardContent>
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-extrabold text-[#232323] mb-2">No problems yet</h3>
                  <p className="text-[#232323] mb-4 font-semibold">
                    Start by posting your first problem to get help from our community of mentors.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button 
                      className="bg-[#A63D00] hover:bg-[#A63D00]/90 border-2 border-black shadow-[3px_3px_0px_0px_#000] font-bold"
                      onClick={() => setIsCreateModalOpen(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Post Your First Problem
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              problems.map((problem, idx) => {
                const cardColor = DASHBOARD_COLORS[idx % DASHBOARD_COLORS.length];
                const borderColor = PALETTE_BORDERS[idx % PALETTE_BORDERS.length];
                const innerColor = PALETTE_INNER[idx % PALETTE_INNER.length];
                const highlightColor = 'rgba(255,255,255,0.7)';
                let statusBadge;
                if (problem.status === 'OPEN') {
                  statusBadge = (
                    <span className="px-3 py-1 bg-[#FDFCF8] text-black font-bold rounded-full text-xs border-2 border-black shadow-[3px_3px_0_0_#000] transition-transform duration-150 hover:scale-105 hover:shadow-[4px_4px_0_0_#000]" style={{ borderColor: 'black', borderStyle: 'solid' }}>OPEN</span>
                  );
                } else {
                  statusBadge = (
                    <span className="px-4 py-1 bg-[#FDFCF8] text-black font-bold rounded-md text-base border-2" style={{ borderColor: innerColor, borderStyle: 'solid' }}>{problem.status}</span>
                  );
                }
                return (
                  <div
                    key={problem.id}
                    className={`relative group rounded-xl mb-10 overflow-visible flex flex-col justify-between min-h-[110px] px-12 py-6`}
                    style={{ backgroundColor: cardColor, border: '4px solid #000', boxShadow: '8px 8px 0 0 #000' }}
                  >
                    {/* Vertical content layout */}
                    <div className="flex flex-col gap-2 relative z-10">
                      <div className="text-2xl font-extrabold text-black uppercase tracking-wide text-left mb-1">{problem.title}</div>
                      <div className="text-base text-[#232323] mb-1 text-left">{problem.description.length > 150 ? `${problem.description.substring(0, 150)}...` : problem.description}</div>
                      {problem.tags.length > 0 && (
                        <div className="flex items-center flex-wrap gap-2 mt-1">
                          {problem.tags.map((tag, index) => (
                            <span key={index} className="bg-[#FDFCF8] text-black font-bold rounded-full px-3 py-1 text-xs border-2" style={{ borderColor: innerColor, borderStyle: 'solid' }}>{tag}</span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-4">
                        {statusBadge}
                        <div className="text-sm text-gray-600 font-semibold">Created {new Date(problem.createdAt).toLocaleDateString()}</div>
                        {problem.mentor ? (
                          <button className="bg-[#FDFCF8] text-black font-bold rounded-md px-6 py-2 border-2 border-black transition-transform duration-150 hover:scale-105 hover:shadow-[2px_2px_0_0_#000]" style={{ borderColor: 'black', borderStyle: 'solid' }}>Chat</button>
                        ) : (
                          <button className="bg-[#FDFCF8] text-black font-bold rounded-md px-6 py-2 border-2 border-black transition-transform duration-150 hover:scale-105 hover:shadow-[2px_2px_0_0_#000]" style={{ borderColor: 'black', borderStyle: 'solid' }}>Find Mentor</button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </PageTransition>
      
      <CreateProblemModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateProblem}
      />
    </div>
  )
} 