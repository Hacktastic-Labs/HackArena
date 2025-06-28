import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Star, MessageSquare, Video, Calendar, MapPin, Clock, Users, Award } from "lucide-react"
import Link from "next/link"

export default function MentorsPage() {
  return (
    <div className="min-h-screen bg-[#FFE8CC]/20">
      {/* Navigation */}
      <nav className="border-b border-[#A63D00]/20 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#A63D00] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="text-2xl font-bold text-[#A63D00]">Synora</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="text-gray-700 hover:text-[#A63D00] transition-colors">
                Dashboard
              </Link>
              <Link href="/knowledge" className="text-gray-700 hover:text-[#A63D00] transition-colors">
                Knowledge Base
              </Link>
              <Link href="/events" className="text-gray-700 hover:text-[#A63D00] transition-colors">
                Events
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-[#A63D00] transition-colors">
                Blog
              </Link>
              <Link href="/mentors" className="text-[#A63D00] font-medium">
                Find Mentors
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Mentor</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with experienced professionals who can guide you through your learning journey with personalized
            mentorship.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-[#A63D00]/20 p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search by name, skill, or expertise..." className="pl-10" />
              </div>
            </div>
            <div>
              <Button variant="outline" className="w-full border-[#A63D00] text-[#A63D00] bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Expertise
              </Button>
            </div>
            <div>
              <Button variant="outline" className="w-full border-[#A63D00] text-[#A63D00] bg-transparent">
                <Clock className="h-4 w-4 mr-2" />
                Availability
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Mentors */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Mentors</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-[#A63D00]/20 hover:shadow-lg transition-shadow bg-gradient-to-br from-[#FFE8CC] to-[#F4D4A7]">
              <CardHeader className="text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4 ring-4 ring-[#A63D00]/20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback className="bg-[#A63D00] text-white text-xl">AL</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">Alex Chen</CardTitle>
                <CardDescription>Senior Software Engineer at Google</CardDescription>
                <div className="flex items-center justify-center space-x-1 mt-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-medium">4.9</span>
                  <span className="text-gray-600">(127 reviews)</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-[#FF6B35] text-white">React</Badge>
                    <Badge className="bg-[#4ECDC4] text-white">Node.js</Badge>
                    <Badge className="bg-[#8B3400] text-white">System Design</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    5+ years helping students master full-stack development and prepare for technical interviews.
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>89 students</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="h-4 w-4" />
                      <span>Top Mentor</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-[#A63D00] hover:bg-[#A63D00]/90">Connect</Button>
                    <Button variant="outline" className="border-[#A63D00] text-[#A63D00] bg-transparent">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#A63D00]/20 hover:shadow-lg transition-shadow bg-gradient-to-br from-[#4ECDC4]/20 to-[#44B3AC]/20">
              <CardHeader className="text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4 ring-4 ring-[#4ECDC4]/30">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback className="bg-[#4ECDC4] text-white text-xl">SM</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">Sarah Martinez</CardTitle>
                <CardDescription>ML Engineer at OpenAI</CardDescription>
                <div className="flex items-center justify-center space-x-1 mt-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-medium">4.8</span>
                  <span className="text-gray-600">(94 reviews)</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-[#8B3400] text-white">Python</Badge>
                    <Badge className="bg-[#FF6B35] text-white">Machine Learning</Badge>
                    <Badge className="bg-[#4ECDC4] text-white">TensorFlow</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Expert in AI/ML with focus on deep learning and natural language processing applications.
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>67 students</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="h-4 w-4" />
                      <span>AI Expert</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-[#4ECDC4] hover:bg-[#44B3AC] text-white">Connect</Button>
                    <Button variant="outline" className="border-[#4ECDC4] text-[#4ECDC4] bg-transparent">
                      <Video className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#A63D00]/20 hover:shadow-lg transition-shadow bg-gradient-to-br from-[#FF6B35]/20 to-[#E55A2B]/20">
              <CardHeader className="text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4 ring-4 ring-[#FF6B35]/30">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback className="bg-[#FF6B35] text-white text-xl">MJ</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">Michael Johnson</CardTitle>
                <CardDescription>Principal Engineer at Netflix</CardDescription>
                <div className="flex items-center justify-center space-x-1 mt-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-medium">4.9</span>
                  <span className="text-gray-600">(156 reviews)</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-[#4ECDC4] text-white">Java</Badge>
                    <Badge className="bg-[#8B3400] text-white">Microservices</Badge>
                    <Badge className="bg-[#FF6B35] text-white">AWS</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Specializes in distributed systems, microservices architecture, and cloud infrastructure.
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>112 students</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="h-4 w-4" />
                      <span>Cloud Expert</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-[#FF6B35] hover:bg-[#E55A2B] text-white">Connect</Button>
                    <Button variant="outline" className="border-[#FF6B35] text-[#FF6B35] bg-transparent">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* All Mentors */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">All Mentors</h2>
            <div className="flex space-x-2">
              <Button variant="outline" className="border-[#A63D00] text-[#A63D00] bg-transparent">
                Sort by Rating
              </Button>
              <Button variant="outline" className="border-[#A63D00] text-[#A63D00] bg-transparent">
                Sort by Experience
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="border-[#A63D00]/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback className="bg-[#A63D00] text-white">RP</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold">Rachel Park</h3>
                        <p className="text-gray-600">Senior Data Scientist at Meta</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium">4.7</span>
                        <span className="text-gray-600">(89 reviews)</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary">Python</Badge>
                      <Badge variant="secondary">Data Science</Badge>
                      <Badge variant="secondary">Statistics</Badge>
                      <Badge variant="secondary">R</Badge>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Experienced data scientist with 8+ years in the field. Specializes in predictive modeling,
                      statistical analysis, and helping students transition into data science careers.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>73 students mentored</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>San Francisco, CA</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Available weekends</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" className="border-[#A63D00] text-[#A63D00] bg-transparent">
                          View Profile
                        </Button>
                        <Button className="bg-[#A63D00] hover:bg-[#A63D00]/90">Connect</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#A63D00]/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback className="bg-[#A63D00] text-white">DW</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold">David Wilson</h3>
                        <p className="text-gray-600">Mobile Development Lead at Spotify</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium">4.8</span>
                        <span className="text-gray-600">(142 reviews)</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary">React Native</Badge>
                      <Badge variant="secondary">Flutter</Badge>
                      <Badge variant="secondary">iOS</Badge>
                      <Badge variant="secondary">Android</Badge>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Mobile development expert with focus on cross-platform solutions. Passionate about helping
                      developers create beautiful, performant mobile applications.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>98 students mentored</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>New York, NY</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Available evenings</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" className="border-[#A63D00] text-[#A63D00] bg-transparent">
                          View Profile
                        </Button>
                        <Button className="bg-[#A63D00] hover:bg-[#A63D00]/90">Connect</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#A63D00]/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback className="bg-[#A63D00] text-white">LT</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold">Lisa Thompson</h3>
                        <p className="text-gray-600">DevOps Engineer at Amazon</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium">4.9</span>
                        <span className="text-gray-600">(76 reviews)</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary">AWS</Badge>
                      <Badge variant="secondary">Docker</Badge>
                      <Badge variant="secondary">Kubernetes</Badge>
                      <Badge variant="secondary">CI/CD</Badge>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Cloud infrastructure and DevOps specialist. Helps students understand modern deployment practices
                      and cloud architecture patterns.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>54 students mentored</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>Seattle, WA</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Flexible schedule</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" className="border-[#A63D00] text-[#A63D00] bg-transparent">
                          View Profile
                        </Button>
                        <Button className="bg-[#A63D00] hover:bg-[#A63D00]/90">Connect</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
