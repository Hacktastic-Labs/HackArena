"use client";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  BookOpen,
  TrendingUp,
  Star,
  Eye,
  MessageSquare,
  ArrowRight,
  Lightbulb,
  Code,
  Database,
  Smartphone,
  LogOut,
  Bell,
  ArrowDownWideNarrow,
} from "lucide-react"
import Link from "next/link"
import { signOut, useSession } from "@/app/lib/auth-client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import PageTransition from "@/components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function KnowledgePage() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [tabValue, setTabValue] = useState("browse");

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

      <style jsx global>{`
  .neubrut-knowledge-main h1, .neubrut-knowledge-main h2, .neubrut-knowledge-main h3 {
    font-family: 'Inter', Arial, sans-serif;
    font-weight: 900;
    font-size: 2.5rem;
    text-transform: none;
    letter-spacing: 0;
    margin-bottom: 0.5em;
    color: #232323;
  }
  .neubrut-knowledge-main .card, .neubrut-knowledge-main .border, .neubrut-knowledge-main .border-[#A63D00]/20 {
    border-width: 2.5px !important;
    border-style: solid !important;
    border-color: #A63D00 !important;
    box-shadow: 3px 3px 0 0 #A63D00 !important;
    border-radius: 8px !important;
    background: #FFF8E1 !important;
  }
  .neubrut-knowledge-main .badge, .neubrut-knowledge-main .Badge, .neubrut-knowledge-main .badge-secondary {
    border-width: 1.5px !important;
    border-style: solid !important;
    border-color: #A63D00 !important;
    border-radius: 6px !important;
    font-weight: 800;
    text-transform: uppercase;
    background: #FFB74D !important;
    color: #A63D00 !important;
    font-size: 0.85rem;
    padding: 0.25em 0.75em;
  }
  .neubrut-knowledge-main .button, .neubrut-knowledge-main button, .neubrut-knowledge-main .btn {
    border-width: 2px !important;
    border-style: solid !important;
    border-color: #A63D00 !important;
    border-radius: 8px !important;
    box-shadow: 2px 2px 0 0 #A63D00 !important;
    font-weight: 900;
    text-transform: uppercase;
    background: #FFB74D !important;
    color: #232323 !important;
    transition: none !important;
  }
  .neubrut-knowledge-main .input, .neubrut-knowledge-main input {
    border-width: 2px !important;
    border-style: solid !important;
    border-color: #A63D00 !important;
    border-radius: 8px !important;
    font-weight: 700;
    background: #FFF8E1 !important;
    color: #232323 !important;
    box-shadow: 1.5px 1.5px 0 0 #A63D00 !important;
  }
  .tab-content-orange * {
    border: 1.5px solid #A63D00 !important;
    border-radius: 0.5rem;
  }
`}</style>

      <div className="neubrut-knowledge-main">
      <PageTransition>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
            {/* Force the new layout for the top section */}
            <div className="border-4 border-dashed border-[#A63D00] rounded-2xl p-8 bg-[#FDF7F0] flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-12">
              {/* Left: Heading, para, search */}
              <div className="md:w-3/5 w-full flex flex-col gap-0">
                {/* Wrap the heading and description in a white background box with padding and rounded corners */}
                <div className="bg-[#FDF7F0] rounded-xl p-6 mb-4 w-fit">
                  <h1 className="text-[8rem] font-sans font-black text-black mb-2 text-left leading-none tracking-normal" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>
                    Knowledge Base
                  </h1>
                  <p className="text-lg text-gray-700 max-w-2xl text-left leading-relaxed">
                    Discover solutions, learn from past experiences, and explore trending topics in our AI-powered knowledge base. Whether you're a student, mentor, or enthusiast, you'll find curated insights, practical guides, and trending discussions to accelerate your learning journey. Start searching or browse our most popular topics below.
                  </p>
                </div>
                {/* Update stat cards */}
                <div className="max-w-lg w-full mt-6 rounded-lg bg-white">
                  <div className="relative border-[#A63D00] border border-solid rounded-lg bg-white shadow-none">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search for solutions, topics, or technologies..."
                      className="w-full h-13 pl-12 pr-4 text-lg border-none focus:border-none shadow-none bg-white"
              />
                    <Button className="w-32 h-8 absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#FFB74D] border-[#A63D00] text-[#232323] font-bold hover:bg-[#A63D00] hover:text-white ml-4 mr-1 shadow-lg hover:shadow-inner transition-colors duration-200 ease-in-out">
                Search
              </Button>
            </div>
          </div>
              </div>
              {/* Right: 2x2 stat cards */}
              <div className="md:w-2/5 w-full grid grid-cols-2 grid-rows-2 gap-6 place-items-center">
                <Card className="bg-[#FFF8E1] border-2 border-[#A63D00] shadow-[4px_4px_0_0_#A63D00] rounded-xl text-center p-8 w-full h-full flex flex-col items-center justify-center">
                  <CardContent>
                    <div className="text-4xl font-extrabold text-[#A63D00] mb-2">2,847</div>
                    <p className="text-base text-gray-600">Total Solutions</p>
              </CardContent>
            </Card>
                <Card className="bg-[#FFF8E1] border-2 border-[#A63D00] shadow-[4px_4px_0_0_#A63D00] rounded-xl text-center p-8 w-full h-full flex flex-col items-center justify-center">
                  <CardContent>
                    <div className="text-4xl font-extrabold text-[#A63D00] mb-2">156</div>
                    <p className="text-base text-gray-600">Categories</p>
              </CardContent>
            </Card>
                <Card className="bg-[#FFF8E1] border-2 border-[#A63D00] shadow-[4px_4px_0_0_#A63D00] rounded-xl text-center p-8 w-full h-full flex flex-col items-center justify-center">
                  <CardContent>
                    <div className="text-4xl font-extrabold text-[#A63D00] mb-2">89%</div>
                    <p className="text-base text-gray-600">Success Rate</p>
              </CardContent>
            </Card>
                <Card className="bg-[#FFF8E1] border-2 border-[#A63D00] shadow-[4px_4px_0_0_#A63D00] rounded-xl text-center p-8 w-full h-full flex flex-col items-center justify-center">
                  <CardContent>
                    <div className="text-4xl font-extrabold text-[#A63D00] mb-2">4.8</div>
                    <p className="text-base text-gray-600">Avg Rating</p>
              </CardContent>
            </Card>
              </div>
          </div>

          {/* Main Content */}
            <Tabs value={tabValue} onValueChange={setTabValue} defaultValue="browse" className="space-y-8">
              <TabsList className="flex w-full gap-x-4">
                <TabsTrigger
                  value="browse"
                  className={`!bg-[#FFB800] !text-black !border-2 !border-black !font-bold !shadow-none !hover:bg-[#FFE066] transition-shadow duration-200 data-[state=active]:shadow-[4px_4px_0_0_#000] data-[state=active]:-translate-y-0.5 data-[state=active]:scale-102 data-[state=active]:z-10 ${tabValue === 'browse' ? 'w-[40%]' : 'w-[20%]'}`}
                >
                Browse All
              </TabsTrigger>
                <TabsTrigger
                  value="trending"
                  className={`!bg-[#FFB800] !text-black !border-2 !border-black !font-bold !shadow-none !hover:bg-[#FFE066] transition-shadow duration-200 data-[state=active]:shadow-[4px_4px_0_0_#000] data-[state=active]:-translate-y-0.5 data-[state=active]:scale-102 data-[state=active]:z-10 ${tabValue === 'trending' ? 'w-[40%]' : 'w-[20%]'}`}
                >
                Trending
              </TabsTrigger>
                <TabsTrigger
                  value="categories"
                  className={`!bg-[#FFB800] !text-black !border-2 !border-black !font-bold !shadow-none !hover:bg-[#FFE066] transition-shadow duration-200 data-[state=active]:shadow-[4px_4px_0_0_#000] data-[state=active]:-translate-y-0.5 data-[state=active]:scale-102 data-[state=active]:z-10 ${tabValue === 'categories' ? 'w-[40%]' : 'w-[20%]'}`}
                >
                Categories
              </TabsTrigger>
                <TabsTrigger
                  value="recent"
                  className={`!bg-[#FFB800] !text-black !border-2 !border-black !font-bold !shadow-none !hover:bg-[#FFE066] transition-shadow duration-200 data-[state=active]:shadow-[4px_4px_0_0_#000] data-[state=active]:-translate-y-0.5 data-[state=active]:scale-102 data-[state=active]:z-10 ${tabValue === 'recent' ? 'w-[40%]' : 'w-[20%]'}`}
                >
                Recent
              </TabsTrigger>
            </TabsList>

              <AnimatePresence mode="wait">
                {tabValue === "browse" && (
            <TabsContent value="browse" className="space-y-6">
                    <motion.div
                      key="browse"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
              <div className="flex justify-between items-center">
                        <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#232323', textAlign: 'left', marginTop: '0.25rem', marginBottom: '1rem' }}>All Solutions</h2>
              </div>

              <div className="space-y-6">
                        <Card className="border-[#A63D00] border-2 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                                <CardTitle className="text-xl font-bold text-gray-900">Optimizing React Component Re-renders</CardTitle>
                        <CardDescription className="text-base">
                          A comprehensive guide to preventing unnecessary re-renders in React applications using
                          React.memo, useMemo, and useCallback hooks.
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-1 ml-4">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">4.9</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-4">
                      <div className="flex space-x-2">
                        <Badge variant="secondary">React</Badge>
                        <Badge variant="secondary">Performance</Badge>
                        <Badge variant="secondary">JavaScript</Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>1,247 views</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>23 discussions</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">Last updated: 3 days ago • By Sarah Chen</div>
                      <Button variant="outline" className="border-[#A63D00] text-[#A63D00] bg-transparent">
                        View Solution <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                        <Card className="border-[#A63D00] border-2 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                                <CardTitle className="text-xl font-bold text-gray-900">Database Indexing Strategies for Large Datasets</CardTitle>
                        <CardDescription className="text-base">
                          Learn how to design and implement effective database indexes to improve query performance on
                          large datasets.
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-1 ml-4">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">4.7</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-4">
                      <div className="flex space-x-2">
                        <Badge variant="secondary">Database</Badge>
                        <Badge variant="secondary">SQL</Badge>
                        <Badge variant="secondary">Performance</Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>892 views</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>15 discussions</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">Last updated: 1 week ago • By Mike Rodriguez</div>
                      <Button variant="outline" className="border-[#A63D00] text-[#A63D00] bg-transparent">
                        View Solution <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                        <Card className="border-[#A63D00] border-2 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                                <CardTitle className="text-xl font-bold text-gray-900">Machine Learning Model Deployment with Docker</CardTitle>
                        <CardDescription className="text-base">
                          Step-by-step guide to containerizing and deploying machine learning models using Docker and
                          cloud platforms.
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-1 ml-4">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">4.8</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-4">
                      <div className="flex space-x-2">
                        <Badge variant="secondary">Machine Learning</Badge>
                        <Badge variant="secondary">Docker</Badge>
                        <Badge variant="secondary">Deployment</Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>1,456 views</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>31 discussions</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">Last updated: 5 days ago • By Alex Kumar</div>
                      <Button variant="outline" className="border-[#A63D00] text-[#A63D00] bg-transparent">
                        View Solution <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
                    </motion.div>
            </TabsContent>
                )}
                {tabValue === "trending" && (
            <TabsContent value="trending" className="space-y-6">
                    <motion.div
                      key="trending"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
              <div className="flex items-center space-x-2 mb-6">
                        <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#232323', textAlign: 'left', marginTop: 0, marginBottom: '1rem' }}>Trending This Week</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                        <Card className="border-[#A63D00] border-2 hover:shadow-lg transition-shadow">
                  <CardHeader>
                            <CardTitle className="flex items-center text-xl font-bold text-gray-900">
                      <div className="w-8 h-8 bg-[#A63D00] rounded-full flex items-center justify-center text-white font-bold mr-3">
                        1
                      </div>
                      Next.js 14 App Router Best Practices
                    </CardTitle>
                    <CardDescription>Complete guide to the new App Router in Next.js 14</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-green-100 text-green-800">+45% views</Badge>
                      <Button variant="outline" size="sm" className="border-[#A63D00] text-[#A63D00] bg-transparent">
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                        <Card className="border-[#A63D00] border-2 hover:shadow-lg transition-shadow">
                  <CardHeader>
                            <CardTitle className="flex items-center text-xl font-bold text-gray-900">
                      <div className="w-8 h-8 bg-[#A63D00] rounded-full flex items-center justify-center text-white font-bold mr-3">
                        2
                      </div>
                      AI Prompt Engineering Techniques
                    </CardTitle>
                    <CardDescription>Advanced strategies for better AI interactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-green-100 text-green-800">+38% views</Badge>
                      <Button variant="outline" size="sm" className="border-[#A63D00] text-[#A63D00] bg-transparent">
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                        <Card className="border-[#A63D00] border-2 hover:shadow-lg transition-shadow">
                  <CardHeader>
                            <CardTitle className="flex items-center text-xl font-bold text-gray-900">
                      <div className="w-8 h-8 bg-[#A63D00] rounded-full flex items-center justify-center text-white font-bold mr-3">
                        3
                      </div>
                      Microservices Architecture Patterns
                    </CardTitle>
                    <CardDescription>Design patterns for scalable microservices</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-green-100 text-green-800">+32% views</Badge>
                      <Button variant="outline" size="sm" className="border-[#A63D00] text-[#A63D00] bg-transparent">
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                        <Card className="border-[#A63D00] border-2 hover:shadow-lg transition-shadow">
                  <CardHeader>
                            <CardTitle className="flex items-center text-xl font-bold text-gray-900">
                      <div className="w-8 h-8 bg-[#A63D00] rounded-full flex items-center justify-center text-white font-bold mr-3">
                        4
                      </div>
                      React Native Performance Optimization
                    </CardTitle>
                    <CardDescription>Tips for faster mobile app performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-green-100 text-green-800">+28% views</Badge>
                      <Button variant="outline" size="sm" className="border-[#A63D00] text-[#A63D00] bg-transparent">
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
                    </motion.div>
            </TabsContent>
                )}
                {tabValue === "categories" && (
            <TabsContent value="categories" className="space-y-6">
                    <motion.div
                      key="categories"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#232323', textAlign: 'left', marginTop: '0.25rem', marginBottom: '1rem' }}>Browse by Category</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card className="border-[#A63D00] border-2 hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-[#FFE8CC] rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Code className="h-8 w-8 text-[#A63D00]" />
                    </div>
                            <CardTitle className="text-2xl font-bold text-gray-900">Web Development</CardTitle>
                    <CardDescription>Frontend, Backend, Full-stack solutions</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-2xl font-bold text-[#A63D00] mb-2">847</div>
                    <p className="text-sm text-gray-600">Solutions available</p>
                  </CardContent>
                </Card>

                        <Card className="border-[#A63D00] border-2 hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-[#FFE8CC] rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Lightbulb className="h-8 w-8 text-[#A63D00]" />
                    </div>
                            <CardTitle className="text-2xl font-bold text-gray-900">Machine Learning</CardTitle>
                    <CardDescription>AI, ML algorithms, data science</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-2xl font-bold text-[#A63D00] mb-2">523</div>
                    <p className="text-sm text-gray-600">Solutions available</p>
                  </CardContent>
                </Card>

                        <Card className="border-[#A63D00] border-2 hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-[#FFE8CC] rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Database className="h-8 w-8 text-[#A63D00]" />
                    </div>
                            <CardTitle className="text-2xl font-bold text-gray-900">Database & Backend</CardTitle>
                    <CardDescription>SQL, NoSQL, APIs, server architecture</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-2xl font-bold text-[#A63D00] mb-2">392</div>
                    <p className="text-sm text-gray-600">Solutions available</p>
                  </CardContent>
                </Card>

                        <Card className="border-[#A63D00] border-2 hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-[#FFE8CC] rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Smartphone className="h-8 w-8 text-[#A63D00]" />
                    </div>
                            <CardTitle className="text-2xl font-bold text-gray-900">Mobile Development</CardTitle>
                    <CardDescription>iOS, Android, React Native, Flutter</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-2xl font-bold text-[#A63D00] mb-2">284</div>
                    <p className="text-sm text-gray-600">Solutions available</p>
                  </CardContent>
                </Card>

                        <Card className="border-[#A63D00] border-2 hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-[#FFE8CC] rounded-lg flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="h-8 w-8 text-[#A63D00]" />
                    </div>
                            <CardTitle className="text-2xl font-bold text-gray-900">System Design</CardTitle>
                    <CardDescription>Architecture, scalability, design patterns</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-2xl font-bold text-[#A63D00] mb-2">156</div>
                    <p className="text-sm text-gray-600">Solutions available</p>
                  </CardContent>
                </Card>

                        <Card className="border-[#A63D00] border-2 hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-[#FFE8CC] rounded-lg flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="h-8 w-8 text-[#A63D00]" />
                    </div>
                            <CardTitle className="text-2xl font-bold text-gray-900">DevOps & Cloud</CardTitle>
                    <CardDescription>CI/CD, AWS, Docker, Kubernetes</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-2xl font-bold text-[#A63D00] mb-2">198</div>
                    <p className="text-sm text-gray-600">Solutions available</p>
                  </CardContent>
                </Card>
              </div>
                    </motion.div>
            </TabsContent>
                )}
                {tabValue === "recent" && (
            <TabsContent value="recent" className="space-y-6">
                    <motion.div
                      key="recent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#232323', textAlign: 'left', marginTop: '0.25rem', marginBottom: '1rem' }}>Recently Added Solutions</h2>

              <div className="space-y-4">
                        <Card className="border-[#A63D00] border-2 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                                <CardTitle className="text-lg font-bold text-gray-900">TypeScript Generic Constraints Best Practices</CardTitle>
                        <CardDescription className="mt-2">
                          Advanced techniques for using generic constraints effectively in TypeScript applications.
                        </CardDescription>
                      </div>
                      <Badge className="bg-green-100 text-green-800">New</Badge>
                    </div>
                    <div className="flex items-center space-x-4 mt-4">
                      <div className="flex space-x-2">
                        <Badge variant="secondary">TypeScript</Badge>
                        <Badge variant="secondary">Generics</Badge>
                      </div>
                      <div className="text-sm text-gray-600">Added 2 hours ago</div>
                    </div>
                  </CardHeader>
                </Card>

                        <Card className="border-[#A63D00] border-2 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                                <CardTitle className="text-lg font-bold text-gray-900">GraphQL Subscription Implementation</CardTitle>
                        <CardDescription className="mt-2">
                          Real-time data updates using GraphQL subscriptions with WebSocket connections.
                        </CardDescription>
                      </div>
                      <Badge className="bg-green-100 text-green-800">New</Badge>
                    </div>
                    <div className="flex items-center space-x-4 mt-4">
                      <div className="flex space-x-2">
                        <Badge variant="secondary">GraphQL</Badge>
                        <Badge variant="secondary">WebSocket</Badge>
                      </div>
                      <div className="text-sm text-gray-600">Added 5 hours ago</div>
                    </div>
                  </CardHeader>
                </Card>

                        <Card className="border-[#A63D00] border-2 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                                <CardTitle className="text-lg font-bold text-gray-900">Kubernetes Pod Security Standards</CardTitle>
                        <CardDescription className="mt-2">
                          Implementing security best practices for Kubernetes pod configurations.
                        </CardDescription>
                      </div>
                      <Badge className="bg-green-100 text-green-800">New</Badge>
                    </div>
                    <div className="flex items-center space-x-4 mt-4">
                      <div className="flex space-x-2">
                        <Badge variant="secondary">Kubernetes</Badge>
                        <Badge variant="secondary">Security</Badge>
                      </div>
                      <div className="text-sm text-gray-600">Added 1 day ago</div>
                    </div>
                  </CardHeader>
                </Card>
              </div>
                    </motion.div>
            </TabsContent>
                )}
              </AnimatePresence>
          </Tabs>
        </div>
      </PageTransition>
      </div>
    </div>
  )
}

