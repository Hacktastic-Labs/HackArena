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
} from "lucide-react"
import Link from "next/link"

export default function KnowledgePage() {
  return (
    <div className="min-h-screen bg-[#FFE8CC]/20">
      {/* Navigation */}
      <nav className="border-b border-[#A63D00]/20 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#A63D00] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">H</span>
                </div>
                <span className="text-2xl font-bold text-[#A63D00]">HackArena</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="text-gray-700 hover:text-[#A63D00] transition-colors">
                Dashboard
              </Link>
              <Link href="/problems" className="text-gray-700 hover:text-[#A63D00] transition-colors">
                My Problems
              </Link>
              <Link href="/mentors" className="text-gray-700 hover:text-[#A63D00] transition-colors">
                Mentors
              </Link>
              <Link href="/knowledge" className="text-[#A63D00] font-medium">
                Knowledge
              </Link>
              <Link href="/events" className="text-gray-700 hover:text-[#A63D00] transition-colors">
                Events
              </Link>
              <Link href="/updates" className="text-gray-700 hover:text-[#A63D00] transition-colors">
                Updates
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Knowledge Base</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover solutions, learn from past experiences, and explore trending topics in our AI-powered knowledge
            repository.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search for solutions, topics, or technologies..."
              className="pl-12 pr-4 py-3 text-lg border-[#A63D00]/20 focus:border-[#A63D00]"
            />
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#A63D00] hover:bg-[#A63D00]/90">
              Search
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="border-[#A63D00]/20 text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-[#A63D00] mb-2">2,847</div>
              <p className="text-gray-600">Total Solutions</p>
            </CardContent>
          </Card>
          <Card className="border-[#A63D00]/20 text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-[#A63D00] mb-2">156</div>
              <p className="text-gray-600">Categories</p>
            </CardContent>
          </Card>
          <Card className="border-[#A63D00]/20 text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-[#A63D00] mb-2">89%</div>
              <p className="text-gray-600">Success Rate</p>
            </CardContent>
          </Card>
          <Card className="border-[#A63D00]/20 text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-[#A63D00] mb-2">4.8</div>
              <p className="text-gray-600">Avg Rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="browse" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-[#A63D00]/20">
            <TabsTrigger value="browse" className="data-[state=active]:bg-[#A63D00] data-[state=active]:text-white">
              Browse All
            </TabsTrigger>
            <TabsTrigger value="trending" className="data-[state=active]:bg-[#A63D00] data-[state=active]:text-white">
              Trending
            </TabsTrigger>
            <TabsTrigger value="categories" className="data-[state=active]:bg-[#A63D00] data-[state=active]:text-white">
              Categories
            </TabsTrigger>
            <TabsTrigger value="recent" className="data-[state=active]:bg-[#A63D00] data-[state=active]:text-white">
              Recent
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">All Solutions</h2>
              <div className="flex space-x-2">
                <Button variant="outline" className="border-[#A63D00] text-[#A63D00] bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" className="border-[#A63D00] text-[#A63D00] bg-transparent">
                  Sort by Relevance
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="border-[#A63D00]/20 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">Optimizing React Component Re-renders</CardTitle>
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

              <Card className="border-[#A63D00]/20 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">Database Indexing Strategies for Large Datasets</CardTitle>
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

              <Card className="border-[#A63D00]/20 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">Machine Learning Model Deployment with Docker</CardTitle>
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
          </TabsContent>

          <TabsContent value="trending" className="space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <TrendingUp className="h-6 w-6 text-[#A63D00]" />
              <h2 className="text-2xl font-bold text-gray-900">Trending This Week</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-[#A63D00]/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
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

              <Card className="border-[#A63D00]/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
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

              <Card className="border-[#A63D00]/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
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

              <Card className="border-[#A63D00]/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
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
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-[#A63D00]/20 hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-[#FFE8CC] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Code className="h-8 w-8 text-[#A63D00]" />
                  </div>
                  <CardTitle>Web Development</CardTitle>
                  <CardDescription>Frontend, Backend, Full-stack solutions</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-2xl font-bold text-[#A63D00] mb-2">847</div>
                  <p className="text-sm text-gray-600">Solutions available</p>
                </CardContent>
              </Card>

              <Card className="border-[#A63D00]/20 hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-[#FFE8CC] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="h-8 w-8 text-[#A63D00]" />
                  </div>
                  <CardTitle>Machine Learning</CardTitle>
                  <CardDescription>AI, ML algorithms, data science</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-2xl font-bold text-[#A63D00] mb-2">523</div>
                  <p className="text-sm text-gray-600">Solutions available</p>
                </CardContent>
              </Card>

              <Card className="border-[#A63D00]/20 hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-[#FFE8CC] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Database className="h-8 w-8 text-[#A63D00]" />
                  </div>
                  <CardTitle>Database & Backend</CardTitle>
                  <CardDescription>SQL, NoSQL, APIs, server architecture</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-2xl font-bold text-[#A63D00] mb-2">392</div>
                  <p className="text-sm text-gray-600">Solutions available</p>
                </CardContent>
              </Card>

              <Card className="border-[#A63D00]/20 hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-[#FFE8CC] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Smartphone className="h-8 w-8 text-[#A63D00]" />
                  </div>
                  <CardTitle>Mobile Development</CardTitle>
                  <CardDescription>iOS, Android, React Native, Flutter</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-2xl font-bold text-[#A63D00] mb-2">284</div>
                  <p className="text-sm text-gray-600">Solutions available</p>
                </CardContent>
              </Card>

              <Card className="border-[#A63D00]/20 hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-[#FFE8CC] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-[#A63D00]" />
                  </div>
                  <CardTitle>System Design</CardTitle>
                  <CardDescription>Architecture, scalability, design patterns</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-2xl font-bold text-[#A63D00] mb-2">156</div>
                  <p className="text-sm text-gray-600">Solutions available</p>
                </CardContent>
              </Card>

              <Card className="border-[#A63D00]/20 hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-[#FFE8CC] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-[#A63D00]" />
                  </div>
                  <CardTitle>DevOps & Cloud</CardTitle>
                  <CardDescription>CI/CD, AWS, Docker, Kubernetes</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-2xl font-bold text-[#A63D00] mb-2">198</div>
                  <p className="text-sm text-gray-600">Solutions available</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recently Added Solutions</h2>

            <div className="space-y-4">
              <Card className="border-[#A63D00]/20 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">TypeScript Generic Constraints Best Practices</CardTitle>
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

              <Card className="border-[#A63D00]/20 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">GraphQL Subscription Implementation</CardTitle>
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

              <Card className="border-[#A63D00]/20 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">Kubernetes Pod Security Standards</CardTitle>
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
