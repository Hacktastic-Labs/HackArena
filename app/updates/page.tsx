"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Bell } from "lucide-react";
import { useSession } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UpdatesPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/register");
    } else if (
      !isPending &&
      (session?.user as { role?: string })?.role === "MENTOR"
    ) {
      router.push("/mentor-dashboard");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/announcements");
        if (res.ok) {
          const data = await res.json();
          setAnnouncements(data);
        }
      } catch (err) {
        console.error("Failed to load announcements", err);
      }
    }
    load();
  }, []);

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
              <span className="text-2xl font-bold text-[#A63D00]">
                HackArena
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/dashboard")}
              >
                Dashboard
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/problems")}
              >
                My Problems
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/mentors")}
              >
                Mentors
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/knowledge")}
              >
                Knowledge
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/events")}
              >
                Events
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/updates")}
                className="bg-[#A63D00]/10 text-[#A63D00]"
              >
                Updates
              </Button>
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Latest Updates
            </h1>
            <p className="text-gray-600">
              Stay updated with the latest announcements and platform news.
            </p>
          </div>
          <div className="flex gap-2">
            {session && (
              <Button
                variant="outline"
                disabled={isRefreshing}
                onClick={async () => {
                  setIsRefreshing(true);
                  try {
                    await fetch("/api/technews/refresh");
                    // Reload announcements
                    const res = await fetch("/api/announcements");
                    if (res.ok) {
                      setAnnouncements(await res.json());
                    }
                  } catch (err) {
                    console.error(err);
                  } finally {
                    setIsRefreshing(false);
                  }
                }}
                className="border-[#A63D00] text-[#A63D00] bg-transparent"
              >
                {isRefreshing ? "Refreshing..." : "Refresh Tech News"}
              </Button>
            )}
            <Button
              variant="outline"
              className="border-[#A63D00] text-[#A63D00] bg-transparent"
            >
              Mark All Read
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {announcements.map((a) => (
            <Card
              key={a.id}
              className="border-[#A63D00]/20 border-l-4 border-l-[#A63D00] hover:bg-gray-50 cursor-pointer"
              onClick={() => {
                if (a.url) {
                  window.open(a.url, "_blank");
                }
              }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{a.title}</CardTitle>
                    {a.description && (
                      <CardDescription className="mt-2">
                        {a.url ? (
                          <a
                            href={a.url}
                            className="underline text-blue-600 hover:text-blue-800"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {a.description}
                          </a>
                        ) : (
                          a.description
                        )}
                      </CardDescription>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {a.source && <Badge variant="secondary">{a.source}</Badge>}
                    <Badge variant="outline">{a.category}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{new Date(a.createdAt).toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
