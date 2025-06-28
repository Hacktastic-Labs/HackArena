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
import { Search, Calendar, MapPin, Users, Plus } from "lucide-react";
import Link from "next/link";
import {
  getEvents,
  getEventsByOrganizer,
  getRegisteredEventIds,
  registerForEvent,
  cancelEvent,
} from "./actions";
import { headers } from "next/headers";
import { auth } from "../lib/auth";

export default async function EventsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { data: allEvents, error } = await getEvents();

  // Fetch current user session to identify organiser events
  const requestHeaders = await headers();
  const session = await auth.api.getSession({
    headers: new Headers(requestHeaders),
  });

  const events = allEvents || [];

  const now = new Date();
  let upcomingEvents = events.filter((ev) => ev.date >= now);
  let pastEvents = events.filter((ev) => ev.date < now);

  const rawQ = searchParams?.q ?? "";
  const searchQuery = (Array.isArray(rawQ) ? rawQ[0] : rawQ)
    .toLowerCase()
    .trim();
  if (searchQuery) {
    const matchesSearch = (ev: (typeof events)[number]) =>
      ev.title.toLowerCase().includes(searchQuery) ||
      (ev.description && ev.description.toLowerCase().includes(searchQuery)) ||
      ev.location.toLowerCase().includes(searchQuery);
    upcomingEvents = upcomingEvents.filter(matchesSearch);
    pastEvents = pastEvents.filter(matchesSearch);
    // For myEvents and registered filtering we will apply later in render conditionally when we use arrays directly
  }

  let myEvents: typeof allEvents | null = null;
  if (session) {
    const myEventsResult = await getEventsByOrganizer(session.user.id);
    if (myEventsResult.success) {
      myEvents = myEventsResult.data;
    }
  }

  let registeredIds: string[] = [];
  if (session) {
    registeredIds = await getRegisteredEventIds(session.user.id);
  }

  // Define a wrapper action for form submission that ignores returned data to satisfy TS
  async function handleRegister(formData: FormData) {
    "use server";
    await registerForEvent(formData);
  }

  async function handleCancel(formData: FormData) {
    "use server";
    await cancelEvent(formData);
  }

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
                <span className="text-2xl font-bold text-[#A63D00]">
                  HackArena
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
                href="/problems"
                className="text-gray-700 hover:text-[#A63D00] transition-colors"
              >
                My Problems
              </Link>
              <Link
                href="/mentors"
                className="text-gray-700 hover:text-[#A63D00] transition-colors"
              >
                Mentors
              </Link>
              <Link
                href="/knowledge"
                className="text-gray-700 hover:text-[#A63D00] transition-colors"
              >
                Knowledge
              </Link>
              <Link href="/events" className="text-[#A63D00] font-medium">
                Events
              </Link>
              <Link
                href="/updates"
                className="text-gray-700 hover:text-[#A63D00] transition-colors"
              >
                Updates
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
          <form className="flex-1 relative" method="get" action="/events">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              name="q"
              defaultValue={Array.isArray(rawQ) ? rawQ[0] : rawQ}
              placeholder="Search events..."
              className="pl-10"
            />
          </form>
          <Link href="/events/create">
            <Button className="bg-[#A63D00] hover:bg-[#A63D00]/90">
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
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
              Past Events
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

          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {error && <p className="text-red-500">Could not fetch events.</p>}
              {upcomingEvents && upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
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
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p>No upcoming events found.</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.length > 0 ? (
                pastEvents.map((event) => (
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
                      <Link href={`/events/${event.id}`} className="w-full">
                        <Button
                          variant="outline"
                          className="w-full border-[#A63D00] text-[#A63D00] hover:bg-[#A63D00]/10"
                        >
                          View Details
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p>No past events found.</p>
              )}
            </div>
          </TabsContent>

          {/* My Events */}
          <TabsContent value="my-events" className="space-y-6">
            {session ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myEvents && myEvents.length > 0 ? (
                  myEvents.map((event) => (
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
                        </div>
                        <div className="flex space-x-2">
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
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p>You haven't organised any events yet.</p>
                )}
              </div>
            ) : (
              <p className="text-center">Please log in to view your events.</p>
            )}
          </TabsContent>

          {/* Registered Events */}
          <TabsContent value="registered" className="space-y-6">
            {session ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events &&
                events.filter((e) => registeredIds.includes(e.id)).length >
                  0 ? (
                  events
                    .filter((e) => registeredIds.includes(e.id))
                    .map((event) => (
                      <Card
                        key={event.id}
                        className="border-[#A63D00]/20 hover:shadow-lg transition-shadow"
                      >
                        <CardHeader>
                          <CardTitle className="text-xl">
                            {event.title}
                          </CardTitle>
                          <CardDescription>{event.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {new Date(event.date).toLocaleString()}
                              </span>
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
                        </CardContent>
                      </Card>
                    ))
                ) : (
                  <p>You haven't registered for any events yet.</p>
                )}
              </div>
            ) : (
              <p className="text-center">
                Please log in to view your registrations.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
