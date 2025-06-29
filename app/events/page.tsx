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
  Search,
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
import { Input } from "@/components/ui/input";

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

const BRUTALIST_COLORS = [
  '#FFF8E1', '#FFD580', '#FDE1BC', '#FFB800', '#F96D3A', '#FFEDC2'
];

const EventCard = ({ event, isRegistered, onRegister, onCancel, session, color }: { event: Event, isRegistered: boolean, onRegister: any, onCancel: any, session: any, color: string }) => (
  <Card className="border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_#000] overflow-hidden" style={{ backgroundColor: color }}>
    <CardHeader className="border-b-4 border-black p-4">
      <CardTitle className="text-xl font-extrabold uppercase">{event.title}</CardTitle>
      <CardDescription className="font-semibold text-black">
        by {event.organizer.name}
      </CardDescription>
    </CardHeader>
    <CardContent className="p-4">
      <p className="mb-4 text-gray-700 font-medium h-20 overflow-hidden">{event.description}</p>
      <div className="flex flex-col space-y-2 text-sm">
        <div className="flex items-center gap-2 font-semibold"><Calendar className="w-4 h-4" /> {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
        <div className="flex items-center gap-2 font-semibold"><MapPin className="w-4 h-4" /> {event.location}</div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        {event.organizerId === session?.user.id ? (
          <form action={onCancel}><input type="hidden" name="eventId" value={event.id} /><Button type="submit" variant="destructive" className="border-2 border-black font-bold shadow-[2px_2px_0_0_#000]">Cancel Event</Button></form>
        ) : isRegistered ? (
          <Badge className="font-bold border-2 border-black shadow-[2px_2px_0_0_#000]">Registered</Badge>
        ) : (
          <form action={onRegister}><input type="hidden" name="eventId" value={event.id} /><Button type="submit" className="bg-transparent border-2 border-black text-black font-bold hover:bg-black hover:text-white transition-all">Register</Button></form>
        )}
        <Link href={`/events/${event.id}`}><Button variant="secondary" className="bg-transparent border-2 border-black text-black font-bold hover:bg-black hover:text-white transition-all">View Details</Button></Link>
      </div>
    </CardContent>
  </Card>
);

export default function EventsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
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
            setMyEvents(myEventsResult.data || null);
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
        setMyEvents(myEventsResult.data || null);
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-extrabold uppercase">
              Connect & Grow: Tech Events
            </h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  placeholder="Search events..."
                  className="w-64 border-2 border-black rounded-lg shadow-[4px_4px_0_0_#000] focus:shadow-[6px_6px_0_0_#000] transition-shadow"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <Link href="/events/create" legacyBehavior>
                <Button className="font-bold border-2 border-black rounded-lg bg-yellow-400 text-black shadow-[4px_4px_0_0_#000] hover:bg-yellow-500 hover:shadow-[6px_6px_0_0_#000] transition-all">
                  <Plus className="mr-2" />
                  Create Event
                </Button>
              </Link>
            </div>
          </div>

          <Tabs defaultValue="all-events" className="w-full">
            <TabsList className="bg-transparent p-0 inline-flex gap-4 mb-4">
              <TabsTrigger
                value="all-events"
                className="bg-[#FFB74D] border-2 border-black rounded-lg shadow-[4px_4px_0_0_#000] px-6 py-2 text-black font-bold data-[state=active]:bg-black data-[state=active]:text-white transition-all"
              >
                <BookOpen className="mr-2" />
                All Events
              </TabsTrigger>
              <TabsTrigger
                value="my-events"
                className="bg-[#FFB74D] border-2 border-black rounded-lg shadow-[4px_4px_0_0_#000] px-6 py-2 text-black font-bold data-[state=active]:bg-black data-[state=active]:text-white transition-all"
              >
                <Code className="mr-2" />
                My Events
              </TabsTrigger>
              <TabsTrigger
                value="hackathons"
                className="bg-[#FFB74D] border-2 border-black rounded-lg shadow-[4px_4px_0_0_#000] px-6 py-2 text-black font-bold data-[state=active]:bg-black data-[state=active]:text-white transition-all"
              >
                <Video className="mr-2" />
                Hackathons
              </TabsTrigger>
              <TabsTrigger
                value="workshops"
                className="bg-[#FFB74D] border-2 border-black rounded-lg shadow-[4px_4px_0_0_#000] px-6 py-2 text-black font-bold data-[state=active]:bg-black data-[state=active]:text-white transition-all"
              >
                <Users className="mr-2" />
                Workshops
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all-events">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map((event, index) => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    isRegistered={registeredIds.includes(event.id)} 
                    onRegister={handleRegister} 
                    onCancel={handleCancel} 
                    session={session} 
                    color={BRUTALIST_COLORS[index % BRUTALIST_COLORS.length]} 
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="my-events">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {myEvents?.map((event, index) => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    isRegistered={registeredIds.includes(event.id)} 
                    onRegister={handleRegister} 
                    onCancel={handleCancel} 
                    session={session} 
                    color={BRUTALIST_COLORS[index % BRUTALIST_COLORS.length]} 
                  />
                ))}
                {myEvents?.length === 0 && (
                  <div className="col-span-3 text-center py-8">
                    <p className="text-xl font-bold">You haven't organized any events yet.</p>
                    <Link href="/events/create">
                      <Button className="mt-4 font-bold border-2 border-black rounded-lg bg-yellow-400 text-black shadow-[4px_4px_0_0_#000] hover:bg-yellow-500 hover:shadow-[6px_6px_0_0_#000] transition-all">
                        Create Your First Event
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="hackathons">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents
                  .filter(event => event.title.toLowerCase().includes('hackathon'))
                  .map((event, index) => (
                    <EventCard 
                      key={event.id} 
                      event={event} 
                      isRegistered={registeredIds.includes(event.id)} 
                      onRegister={handleRegister} 
                      onCancel={handleCancel} 
                      session={session} 
                      color={BRUTALIST_COLORS[index % BRUTALIST_COLORS.length]} 
                    />
                  ))}
                {upcomingEvents.filter(event => event.title.toLowerCase().includes('hackathon')).length === 0 && (
                  <div className="col-span-3 text-center py-8">
                    <p className="text-xl font-bold">No upcoming hackathons found.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="workshops">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents
                  .filter(event => event.title.toLowerCase().includes('workshop'))
                  .map((event, index) => (
                    <EventCard 
                      key={event.id} 
                      event={event} 
                      isRegistered={registeredIds.includes(event.id)} 
                      onRegister={handleRegister} 
                      onCancel={handleCancel} 
                      session={session} 
                      color={BRUTALIST_COLORS[index % BRUTALIST_COLORS.length]} 
                    />
                  ))}
                {upcomingEvents.filter(event => event.title.toLowerCase().includes('workshop')).length === 0 && (
                  <div className="col-span-3 text-center py-8">
                    <p className="text-xl font-bold">No upcoming workshops found.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </PageTransition>
    </div>
  );
}