"use client";

import { Button } from "@/components/ui/button";
import {
  Clock,
  Bell,
  LogOut,
} from "lucide-react";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

import { useSession, signOut } from "@/app/lib/auth-client";
import PageTransition from "@/components/PageTransition";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";


const getButtonClasses = (path: string, currentPath: string) => {
  const baseClasses = "px-5 py-2 rounded-lg font-bold border-2";
  const activeClasses = "bg-[#232323] text-[#FFB74D] border-[#FFB74D] shadow-[6px_6px_0px_0px_#000000]";
  const inactiveClasses = "bg-transparent text-black border-transparent hover:bg-[#FFF8E1] hover:text-[#A63D00] transition-all duration-300";

  return `${baseClasses} ${currentPath === path ? activeClasses : inactiveClasses}`;
};

export default function UpdatesPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();
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
                className={getButtonClasses("/dashboard", pathname)}
                onClick={() => router.push("/dashboard")}
              >
                Dashboard
              </Button>
              <Button
                className={getButtonClasses("/problems", pathname)}
                onClick={() => router.push("/problems")}
              >
                My Problems
              </Button>
              <Button
                className={getButtonClasses("/mentors", pathname)}
                onClick={() => router.push("/mentors")}
              >
                Mentors
              </Button>
              <Button
                className={getButtonClasses("/knowledge", pathname)}
                onClick={() => router.push("/knowledge")}
              >
                Knowledge
              </Button>
              <Button
                className={getButtonClasses("/events", pathname)}
                onClick={() => router.push("/events")}
              >
                Events
              </Button>
              <Button
                className={getButtonClasses("/updates", pathname)}
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
                  className="bg-[#FFB74D] border-2 border-[#A63D00] rounded-none shadow-[4px_4px_0px_#000] text-black hover:bg-[#A63D00] hover:text-white"
                >
                  {isRefreshing ? "Refreshing..." : "Refresh Tech News"}
                </Button>
              )}
              <Button
                variant="outline"
                className="bg-[#FFB74D] border-2 border-[#A63D00] rounded-none shadow-[4px_4px_0px_#000] text-black hover:bg-[#A63D00] hover:text-white"
              >
                Mark All Read
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {announcements.map((a, i) => (
              <Card
                key={a.id}
                className={`${
                  i % 2 === 0 ? "bg-[#FFF8E1]" : "bg-[#FFE8CC]"
                } border-2 border-[#A63D00] rounded-none shadow-[4px_4px_0px_#000] cursor-pointer`}
                onClick={() => a.url && window.open(a.url, "_blank")}
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
                    <span>{a.timeAgo || "Just now"}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </PageTransition>
    </div>
  );
}
