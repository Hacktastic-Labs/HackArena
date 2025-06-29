"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "@/app/lib/auth-client";
import { useRouter, useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2, UserPlus, Tags, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  createdAt: string;
  sender: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

interface Mentor {
  id: string;
  name: string | null;
  image: string | null;
  skills: string[];
}

interface Problem {
    id: string;
    title: string;
    description: string;
    tags: string[];
    mentor: Mentor | null;
    status: string;
}

export default function ChatPage() {
  const { data: session, isPending: isSessionLoading } = useSession();
  const router = useRouter();
  const params = useParams();
  const problemId = params.id as string;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [matchingMentors, setMatchingMentors] = useState<Mentor[]>([]);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [tagInput, setTagInput] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const fetchData = async () => {
    if (problemId) {
        try {
            setIsLoading(true);
            const [msgRes, mentorsRes, problemRes] = await Promise.all([
                fetch(`/api/problems/${problemId}/chat`),
                fetch(`/api/problems/${problemId}/matching-mentors`),
                fetch(`/api/problems/${problemId}`)
            ]);

            if (!msgRes.ok || !mentorsRes.ok || !problemRes.ok) {
                throw new Error("Failed to fetch data");
            }

            const messagesData = await msgRes.json();
            const mentorsData = await mentorsRes.json();
            const problemData = await problemRes.json();
            
            setMessages(messagesData);
            setMatchingMentors(mentorsData);
            setProblem(problemData);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred");
        } finally {
            setIsLoading(false);
        }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isSessionLoading && !session) {
      router.push("/register");
    }
  }, [session, isSessionLoading, router]);

  useEffect(() => {
    fetchData();
  }, [problemId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "" || !problemId) return;

    try {
      const res = await fetch(`/api/problems/${problemId}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newMessage }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      const sentMessage = await res.json();
      setMessages((prevMessages) => [...prevMessages, sentMessage]);
      setNewMessage("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send message");
    }
  };

  const handleAssignMentor = async (mentorId: string) => {
    try {
        const res = await fetch(`/api/problems/${problemId}/assign`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mentorId }),
        });
        if (!res.ok) throw new Error('Failed to assign mentor');
        toast.success("Mentor assigned successfully!");
        fetchData(); // Refresh data
    } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Failed to assign mentor');
    }
  };

  const handleAddTag = async () => {
    if (tagInput.trim() === "" || !problem) return;
    const updatedTags = [...problem.tags, tagInput.trim()];
    try {
        const res = await fetch(`/api/problems/${problemId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tags: updatedTags }),
        });
        if (!res.ok) throw new Error('Failed to add tag');
        setTagInput("");
        fetchData();
        toast.success("Tag added!");
    } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Failed to add tag');
    }
  };
  
  const handleRemoveTag = async (tagToRemove: string) => {
    if (!problem) return;
    const updatedTags = problem.tags.filter(tag => tag !== tagToRemove);
    try {
        const res = await fetch(`/api/problems/${problemId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tags: updatedTags }),
        });
        if (!res.ok) throw new Error('Failed to remove tag');
        fetchData();
        toast.success("Tag removed!");
    } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Failed to remove tag');
    }
  };

  const handleEndChat = async () => {
    try {
        const res = await fetch(`/api/problems/${problemId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'RESOLVED' }),
        });
        if (!res.ok) throw new Error('Failed to end chat');
        toast.success("Chat has been ended and archived.");
        fetchData(); // Refresh data
    } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Failed to end chat');
    }
  };

  if (isSessionLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFE8CC]/20">
        <Loader2 className="h-12 w-12 animate-spin text-[#A63D00]" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFE8CC]/20">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFE8CC]/20 p-4">
      <div className="h-full flex max-w-screen-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {problem?.mentor ? (
          <div className="flex-1 flex flex-col">
            <header className="border-b border-[#A63D00]/20 bg-white sticky top-0 z-10 p-4">
              <h1 className="text-xl font-bold text-[#A63D00]">Chat for Problem: {problem?.title || ""}</h1>
            </header>

            <main className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-4 ${
                    message.sender.id === session?.user?.id ? "justify-end" : ""
                  }`}
                >
                  {message.sender.id !== session?.user?.id && (
                    <Avatar>
                      <AvatarImage src={message.sender.image || "/placeholder.svg?height=32&width=32"} />
                      <AvatarFallback>{message.sender.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg p-3 max-w-md ${
                      message.sender.id === session?.user?.id
                        ? "bg-[#A63D00] text-white"
                        : "bg-white"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <time className="text-xs text-gray-400 mt-1">
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </time>
                  </div>
                  {message.sender.id === session?.user?.id && (
                    <Avatar>
                      <AvatarImage src={session.user.image || "/placeholder.svg?height=32&width=32"} />
                      <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </main>
            
            <footer className="p-4 border-t border-[#A63D00]/20 bg-white">
              <form onSubmit={handleSendMessage} className="flex items-center gap-4">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button type="submit" className="bg-[#A63D00] hover:bg-[#A63D00]/90">
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </footer>
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            <header className="border-b border-[#A63D00]/20 bg-white sticky top-0 z-10 p-4">
              <h1 className="text-xl font-bold text-[#A63D00]">Find a Mentor</h1>
            </header>
            <main className="flex-1 overflow-y-auto p-4 space-y-4">
              <Card>
                <CardHeader>
                    <CardTitle>{problem?.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>{problem?.description}</p>
                    <div className="flex flex-wrap gap-2">
                        {problem?.tags.map(tag => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                    </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                    <CardTitle>What to do next?</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Use the sidebar on the right to find a mentor based on the problem tags. Once you assign a mentor, a chat will be initiated with them.</p>
                </CardContent>
              </Card>
            </main>
          </div>
        )}

        {/* Sidebar */}
        <aside className="w-80 border-l border-[#A63D00]/20 bg-white flex flex-col">
          <div className="p-4 border-b border-[#A63D00]/20">
              <h2 className="font-bold text-lg text-[#A63D00]">Problem Details</h2>
          </div>

          <div className="p-4 space-y-4 flex-1 overflow-y-auto">
              {/* Assigned Mentor */}
              {problem?.mentor && (
                  <Card>
                      <CardHeader>
                          <CardTitle className="text-base">Assigned Mentor</CardTitle>
                      </CardHeader>
                      <CardContent className="flex items-center gap-4">
                          <Avatar>
                              <AvatarImage src={problem.mentor.image || ''} />
                              <AvatarFallback>{problem.mentor.name?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                              <p className="font-semibold">{problem.mentor.name}</p>
                          </div>
                      </CardContent>
                  </Card>
              )}

              {/* End Chat Button for Mentor */}
              {problem?.mentor && session?.user.id === problem.mentor.id && problem.status !== 'RESOLVED' && (
                <Button onClick={handleEndChat} className="w-full bg-red-600 hover:bg-red-700">
                  End Chat & Archive
                </Button>
              )}

              {/* Tags Management */}
              <Card>
                  <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2"><Tags className="w-4 h-4" /> Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                          {problem?.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                                  {tag}
                                  <button onClick={() => handleRemoveTag(tag)} className="hover:text-red-500">
                                      <X className="w-3 h-3"/>
                                  </button>
                              </Badge>
                          ))}
                      </div>
                      <div className="flex gap-2">
                          <Input value={tagInput} onChange={e => setTagInput(e.target.value)} placeholder="Add a tag..." />
                          <Button onClick={handleAddTag}>Add</Button>
                      </div>
                  </CardContent>
              </Card>

              {/* Matching Mentors */}
              {!problem?.mentor && (
                  <Card>
                      <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2"><UserPlus className="w-4 h-4"/> Matching Mentors</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                          {matchingMentors.length > 0 ? (
                              matchingMentors.map(mentor => (
                                  <div key={mentor.id} className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                          <Avatar className="w-8 h-8">
                                              <AvatarImage src={mentor.image || ''} />
                                              <AvatarFallback>{mentor.name?.charAt(0)}</AvatarFallback>
                                          </Avatar>
                                          <div>
                                              <p className="font-semibold text-sm">{mentor.name}</p>
                                              <div className="flex flex-wrap gap-1 mt-1">
                                                  {mentor.skills.map(skill => (
                                                      <Badge key={skill} variant="secondary" className="text-xs">
                                                          {skill}
                                                      </Badge>
                                                  ))}
                                              </div>
                                          </div>
                                      </div>
                                      <Button size="sm" onClick={() => handleAssignMentor(mentor.id)}>Assign</Button>
                                  </div>
                              ))
                          ) : (
                              <p className="text-sm text-gray-500">No matching mentors found. Try adding more tags.</p>
                          )}
                      </CardContent>
                  </Card>
              )}
          </div>
        </aside>
      </div>
    </div>
  );
} 