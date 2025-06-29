"use client";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  MapPin,
  Users,
  Plus,
  BookOpen,
  Clock,
  Code,
  Video,
  Filter,
  Bell,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  getEvents,
  getEventsByOrganizer,
  getRegisteredEventIds,
  registerForEvent,
  cancelEvent,
} from "./actions";
import PageTransition from "@/components/PageTransition";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "@/app/lib/auth-client";

interface Event {
  id: string;
  title: string;
  description: string | null;
  date: Date;
  location: string;
  organizerId: string;
  organizer: {
    name: string | null;
    username: string | null;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    image: string | null;
    skills: string[];
    role: any;
  };
}

export default function EventsPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const [myEvents, setMyEvents] = useState<Event[] | null>(null);
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const now = new Date();
  const upcomingEvents = events.filter((ev) => ev.date >= now);
  const pastEvents = events.filter((ev) => ev.date < now);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await getEvents();
        if (response.error) {
          setError(response.error as string);
        } else {
          setEvents(response.data || []);
        }

        if (session) {
          const myEventsResult = await getEventsByOrganizer(session.user.id);
          if (myEventsResult.success) {
            setMyEvents(myEventsResult.data ?? null);
          }
          const registered = await getRegisteredEventIds(session.user.id);
          setRegisteredIds(registered);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [session]);

  async function handleRegister(formData: FormData) {
    if (!session) {
      router.push("/register");
      return;
    }
    await registerForEvent(formData);
    const updatedRegisteredIds = await getRegisteredEventIds(session.user.id);
    setRegisteredIds(updatedRegisteredIds);
  }

  async function handleCancel(formData: FormData) {
    await cancelEvent(formData);
    const updatedEvents = await getEvents();
    if (updatedEvents.success) {
      setEvents(updatedEvents.data || []);
    }
    if (session?.user?.id) {
      const myEventsResult = await getEventsByOrganizer(session.user.id);
      if (myEventsResult.success) {
        setMyEvents(myEventsResult.data ?? null);
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
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
                  ${
                    pathname === "/dashboard"
                      ? "bg-[#232323] text-[#FFB74D] border-[#FFB74D] shadow-[6px_6px_0px_0px_#000000]"
                      : "bg-transparent text-black border-transparent hover:bg-[#FFF8E1] hover:text-[#A63D00] transition-all duration-300"
                  }
                `}
                onClick={() => router.push("/dashboard")}
              >
                Dashboard
              </Button>
              <Button
                className={`px-5 py-2 rounded-lg font-bold border-2
                  ${
                    pathname === "/problems"
                      ? "bg-[#232323] text-[#FFB74D] border-[#FFB74D] shadow-[6px_6px_0px_0px_#000000]"
                      : "bg-transparent text-black border-transparent hover:bg-[#FFF8E1] hover:text-[#A63D00] transition-all duration-300"
                  }
                `}
                onClick={() => router.push("/problems")}
              >
                My Problems
              </Button>
              <Button
                className={`px-5 py-2 rounded-lg font-bold border-2
                  ${
                    pathname === "/mentors"
                      ? "bg-[#232323] text-[#FFB74D] border-[#FFB74D] shadow-[6px_6px_0px_0px_#000000]"
                      : "bg-transparent text-black border-transparent hover:bg-[#FFF8E1] hover:text-[#A63D00] transition-all duration-300"
                  }
                `}
                onClick={() => router.push("/mentors")}
              >
                Mentors
              </Button>
              <Button
                className={`px-5 py-2 rounded-lg font-bold border-2
                  ${
                    pathname === "/knowledge"
                      ? "bg-[#232323] text-[#FFB74D] border-[#FFB74D] shadow-[6px_6px_0px_0px_#000000]"
                      : "bg-transparent text-black border-transparent hover:bg-[#FFF8E1] hover:text-[#A63D00] transition-all duration-300"
                  }
                `}
                onClick={() => router.push("/knowledge")}
              >
                Knowledge
              </Button>
              <Button
                className={`px-5 py-2 rounded-lg font-bold border-2
                  ${
                    pathname === "/events"
                      ? "bg-[#232323] text-[#FFB74D] border-[#FFB74D] shadow-[6px_6px_0px_0px_#000000]"
                      : "bg-transparent text-black border-transparent hover:bg-[#FFF8E1] hover:text-[#A63D00] transition-all duration-300"
                  }
                `}
                onClick={() => router.push("/events")}
              >
                Events
              </Button>
              <Button
                className={`px-5 py-2 rounded-lg font-bold border-2
                  ${
                    pathname === "/updates"
                      ? "bg-[#232323] text-[#FFB74D] border-[#FFB74D] shadow-[6px_6px_0px_0px_#000000]"
                      : "bg-transparent text-black border-transparent hover:bg-[#FFF8E1] hover:text-[#A63D00] transition-all duration-300"
                  }
                `}
                onClick={() => router.push("/updates")}
              >
                Updates
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="group relative p-0 w-8 h-8 flex items-center justify-center"
              >
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

      <PageTransition>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Events</h1>
            <Link
              href="/events/create"
              className="inline-flex items-center px-4 py-2 bg-[#A63D00] text-white rounded hover:bg-[#A63D00]/90 text-sm font-semibold"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Link>
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
                value="past"
                className="data-[state=active]:bg-[#A63D00] data-[state=active]:text-white"
              >
                Past
              </TabsTrigger>
              <TabsTrigger
                value="my-events"
                className="data-[state=active]:bg-[#A63D00] data-[state=active]:text-white"
              >
                My Events
              </TabsTrigger>
              <TabsTrigger
                value="registered"
                className="data-[state=active]:bg-[#A63D00] data-[state=active]:text-white"
              >
                Registered
              </TabsTrigger>
            </TabsList>

            {/* Upcoming Events */}
            <TabsContent value="upcoming" className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {error && (
                  <p className="text-red-500">Could not fetch events.</p>
                )}
                {upcomingEvents.length === 0 ? (
                  <p className="text-gray-600">No upcoming events found.</p>
                ) : (
                  upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="border-2 border-black p-6 rounded-md bg-[#FFF8E1] hover:shadow-xl transition-all"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl font-bold text-[#232323]">
                          {event.title}
                        </h2>
                        <span className="text-sm text-gray-700">
                          {event.date.toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-[#232323] mb-2">{event.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-700">
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" /> {event.location}
                        </span>
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />{" "}
                          {event.organizer.name}
                        </span>
                      </div>
                      <div className="mt-4">
                        {session && event.organizerId === session.user.id ? (
                          <Link href={`/events/${event.id}`} className="w-full">
                            <Button
                              variant="outline"
                              disabled
                              className="w-full border-[#A63D00] text-[#A63D00]/70 cursor-not-allowed"
                            >
                              Your Event
                            </Button>
                          </Link>
                        ) : session && registeredIds.includes(event.id) ? (
                          <Link href={`/events/${event.id}`} className="w-full">
                            <Button
                              variant="outline"
                              disabled
                              className="w-full border-[#A63D00] text-[#A63D00]/70 cursor-not-allowed"
                            >
                              Registered
                            </Button>
                          </Link>
                        ) : session ? (
                          <form action={handleRegister} className="w-full">
                            <input
                              type="hidden"
                              name="eventId"
                              value={event.id}
                            />
                            <Button
                              type="submit"
                              className="w-full bg-[#A63D00] hover:bg-[#A63D00]/90"
                            >
                              Register Now
                            </Button>
                          </form>
                        ) : (
                          <Link href="/register" className="w-full">
                            <Button className="w-full bg-[#A63D00] hover:bg-[#A63D00]/90">
                              Register Now
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Past Events */}
            <TabsContent value="past" className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {pastEvents.length === 0 ? (
                  <p className="text-gray-600">No past events found.</p>
                ) : (
                  pastEvents.map((event) => (
                    <div
                      key={event.id}
                      className="border-2 border-black p-6 rounded-md bg-[#FFF8E1] hover:shadow-xl transition-all"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl font-bold text-[#232323]">
                          {event.title}
                        </h2>
                        <span className="text-sm text-gray-700">
                          {event.date.toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-[#232323] mb-2">{event.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-700">
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" /> {event.location}
                        </span>
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />{" "}
                          {event.organizer.name}
                        </span>
                      </div>
                      <div className="mt-4">
                        <Link href={`/events/${event.id}`} className="w-full">
                          <Button
                            variant="outline"
                            className="w-full border-[#A63D00] text-[#A63D00] hover:bg-[#A63D00]/10"
                          >
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>

            {/* My Events */}
            <TabsContent value="my-events" className="space-y-6">
              {session ? (
                <div className="grid grid-cols-1 gap-4">
                  {myEvents && myEvents.length > 0 ? (
                    myEvents.map((event) => (
                      <div
                        key={event.id}
                        className="border-2 border-black p-6 rounded-md bg-[#FFF8E1] hover:shadow-xl transition-all"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h2 className="text-xl font-bold text-[#232323]">
                            {event.title}
                          </h2>
                          <span className="text-sm text-gray-700">
                            {event.date.toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-[#232323] mb-2">
                          {event.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-700">
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" /> {event.location}
                          </span>
                        </div>
                        <div className="mt-4 flex space-x-2">
                          <Link href={`/events/${event.id}`} className="flex-1">
                            <Button
                              variant="outline"
                              className="w-full border-[#A63D00] text-[#A63D00] hover:bg-[#A63D00]/10"
                            >
                              View Details
                            </Button>
                          </Link>
                          <form action={handleCancel} className="flex-1">
                            <input
                              type="hidden"
                              name="eventId"
                              value={event.id}
                            />
                            <Button variant="destructive" className="w-full">
                              Cancel
                            </Button>
                          </form>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">
                      You haven't organized any events yet.
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-gray-600">
                  Please log in to view your events.
                </p>
              )}
            </TabsContent>

            {/* Registered Events */}
            <TabsContent value="registered" className="space-y-6">
              {session ? (
                <div className="grid grid-cols-1 gap-4">
                  {events.filter((e) => registeredIds.includes(e.id)).length >
                  0 ? (
                    events
                      .filter((e) => registeredIds.includes(e.id))
                      .map((event) => (
                        <div
                          key={event.id}
                          className="border-2 border-black p-6 rounded-md bg-[#FFF8E1] hover:shadow-xl transition-all"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h2 className="text-xl font-bold text-[#232323]">
                              {event.title}
                            </h2>
                            <span className="text-sm text-gray-700">
                              {event.date.toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-[#232323] mb-2">
                            {event.description}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-700">
                            <span className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />{" "}
                              {event.location}
                            </span>
                            <span className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />{" "}
                              {event.organizer.name}
                            </span>
                          </div>
                          <div className="mt-4">
                            {event.date < now ? (
                              <Button
                                variant="outline"
                                disabled
                                className="w-full border-[#A63D00] text-[#A63D00]/70 cursor-not-allowed"
                              >
                                Ended
                              </Button>
                            ) : (
                              <Link
                                href={`/events/${event.id}`}
                                className="w-full"
                              >
                                <Button
                                  variant="outline"
                                  className="w-full border-[#A63D00] text-[#A63D00] hover:bg-[#A63D00]/10"
                                >
                                  View Details
                                </Button>
                              </Link>
                            )}
                          </div>
                        </div>
                      ))
                  ) : (
                    <p className="text-gray-600">
                      You haven't registered for any events yet.
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-gray-600">
                  Please log in to view your registrations.
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </PageTransition>
    </div>
  );
}
