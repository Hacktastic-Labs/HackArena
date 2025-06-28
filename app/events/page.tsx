import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Calendar,
  MapPin,
  Users,
  Clock,
  Plus,
  Filter,
  Video,
  Coffee,
  BookOpen,
  Code,
} from "lucide-react";
import Link from "next/link";
import { getEvents } from "./actions";

export default async function EventsPage() {
  const { data: events, error } = await getEvents();

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
                <span className="text-2xl font-bold text-[#A63D00]">
                  Synora
                </span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-[#A63D00] transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/knowledge"
                className="text-gray-700 hover:text-[#A63D00] transition-colors"
              >
                Knowledge Base
              </Link>
              <Link href="/events" className="text-[#A63D00] font-medium">
                Events
              </Link>
              <Link
                href="/blog"
                className="text-gray-700 hover:text-[#A63D00] transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/mentors"
                className="text-gray-700 hover:text-[#A63D00] transition-colors"
              >
                Find Mentors
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Events & Workshops
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our community events, workshops, and study groups to accelerate
            your learning journey.
          </p>
        </div>

        {/* Search and Create */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search events..." className="pl-10" />
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="border-[#A63D00] text-[#A63D00] bg-transparent"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Link href="/events/create">
              <Button className="bg-[#A63D00] hover:bg-[#A63D00]/90">
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </Link>
          </div>
        </div>

        {/* Event Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-[#A63D00]/20">
            <TabsTrigger
              value="upcoming"
              className="data-[state=active]:bg-[#A63D00] data-[state=active]:text-white"
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger
              value="workshops"
              className="data-[state=active]:bg-[#A63D00] data-[state=active]:text-white"
            >
              Workshops
            </TabsTrigger>
            <TabsTrigger
              value="study-groups"
              className="data-[state=active]:bg-[#A63D00] data-[state=active]:text-white"
            >
              Study Groups
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className="data-[state=active]:bg-[#A63D00] data-[state=active]:text-white"
            >
              Past Events
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {error && <p className="text-red-500">Could not fetch events.</p>}
              {events && events.length > 0 ? (
                events.map((event) => (
                  <Card
                    key={event.id}
                    className="border-[#A63D00]/20 hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <CardDescription>{event.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(event.date).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Users className="h-4 w-4" />
                          <span>Organized by {event.organizer.name}</span>
                        </div>
                      </div>
                      <Button className="w-full bg-[#A63D00] hover:bg-[#A63D00]/90">
                        Register Now
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p>No upcoming events found.</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="workshops" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-[#A63D00]/20">
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-2">
                    <Code className="h-5 w-5 text-[#A63D00]" />
                    <Badge className="bg-blue-100 text-blue-800">
                      Technical Workshop
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">
                    Full-Stack Development Bootcamp
                  </CardTitle>
                  <CardDescription>
                    Intensive 3-day workshop covering React, Node.js, and
                    database integration.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Jan 10-12, 2025 • 9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>Tech Training Center</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>25/30 registered</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-[#A63D00]">
                      $299
                    </div>
                    <Button className="bg-[#A63D00] hover:bg-[#A63D00]/90">
                      Register
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#A63D00]/20">
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-2">
                    <BookOpen className="h-5 w-5 text-[#A63D00]" />
                    <Badge className="bg-green-100 text-green-800">
                      Design Workshop
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">
                    UI/UX Design Principles
                  </CardTitle>
                  <CardDescription>
                    Learn fundamental design principles and create user-centered
                    interfaces.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Dec 22, 2024 • 1:00 PM - 6:00 PM</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Video className="h-4 w-4" />
                      <span>Online Workshop</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>18/25 registered</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-[#A63D00]">
                      $149
                    </div>
                    <Button className="bg-[#A63D00] hover:bg-[#A63D00]/90">
                      Register
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="study-groups" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-[#A63D00]/20">
                <CardHeader>
                  <Badge className="bg-green-100 text-green-800 w-fit mb-2">
                    Active Group
                  </Badge>
                  <CardTitle>JavaScript Fundamentals</CardTitle>
                  <CardDescription>
                    Weekly study sessions covering ES6+, async programming, and
                    modern JavaScript concepts.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Tuesdays, 7:00 PM</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>8 active members</span>
                    </div>
                  </div>
                  <Button className="w-full bg-[#A63D00] hover:bg-[#A63D00]/90">
                    Join Group
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-[#A63D00]/20">
                <CardHeader>
                  <Badge className="bg-blue-100 text-blue-800 w-fit mb-2">
                    New Group
                  </Badge>
                  <CardTitle>Data Structures & Algorithms</CardTitle>
                  <CardDescription>
                    Prepare for technical interviews with weekly problem-solving
                    sessions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Saturdays, 10:00 AM</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>5 members (seeking more)</span>
                    </div>
                  </div>
                  <Button className="w-full bg-[#A63D00] hover:bg-[#A63D00]/90">
                    Join Group
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-[#A63D00]/20">
                <CardHeader>
                  <Badge className="bg-purple-100 text-purple-800 w-fit mb-2">
                    Popular
                  </Badge>
                  <CardTitle>React Development Circle</CardTitle>
                  <CardDescription>
                    Build projects together and share React best practices and
                    patterns.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Thursdays, 6:30 PM</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>15 active members</span>
                    </div>
                  </div>
                  <Button className="w-full bg-[#A63D00] hover:bg-[#A63D00]/90">
                    Join Group
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            <div className="space-y-4">
              <Card className="border-[#A63D00]/20">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Introduction to Machine Learning
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Comprehensive workshop covering ML fundamentals,
                        supervised learning, and practical applications.
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>November 28, 2024</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>67 attendees</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        className="border-[#A63D00] text-[#A63D00] bg-transparent"
                      >
                        View Recording
                      </Button>
                      <Button
                        variant="outline"
                        className="border-[#A63D00] text-[#A63D00] bg-transparent"
                      >
                        Download Materials
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#A63D00]/20">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Web Security Best Practices
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Learn about common security vulnerabilities and how to
                        protect web applications.
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>November 15, 2024</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>43 attendees</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        className="border-[#A63D00] text-[#A63D00] bg-transparent"
                      >
                        View Recording
                      </Button>
                      <Button
                        variant="outline"
                        className="border-[#A63D00] text-[#A63D00] bg-transparent"
                      >
                        Download Materials
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
