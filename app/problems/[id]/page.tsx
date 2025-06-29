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

const BRUTALIST_COLORS = [
  '#FFF8E1', '#FFD580', '#FDE1BC', '#FFB800', '#F96D3A', '#FFEDC2'
];

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
      <div className="h-full flex max-w-screen-2xl mx-auto bg-transparent rounded-lg overflow-hidden gap-8">
        {problem?.mentor ? (
          <div className="flex-1 flex flex-col bg-white border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_#000]">
            <header className="border-b-4 border-black p-4">
              <h1 className="text-xl font-extrabold text-black uppercase">Chat for: {problem?.title || ""}</h1>
            </header>

            <main className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-4 max-w-xl ${
                    message.sender.id === session?.user?.id ? "ml-auto flex-row-reverse" : ""
                  }`}
                >
                    <Avatar className="w-12 h-12 border-2 border-black">
                      <AvatarImage src={message.sender.image || `https://api.dicebear.com/8.x/pixel-art/svg?seed=${message.sender.name}`} />
                      <AvatarFallback>{message.sender.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  <div
                    className={`rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_#000] p-3 ${
                      message.sender.id === session?.user?.id
                        ? "bg-[#FFD580]"
                        : "bg-white"
                    }`}
                  >
                    <p className="text-sm font-bold text-black">{message.sender.name}</p>
                    <p className="text-sm text-gray-800 mt-1">{message.content}</p>
                    <time className="text-xs text-gray-500 mt-2 block">
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </time>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </main>
            
            <footer className="p-4 border-t-4 border-black">
              <form onSubmit={handleSendMessage} className="flex items-center gap-4">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border-2 border-black rounded-md shadow-[2px_2px_0px_0px_#000] focus-visible:ring-0"
                />
                <Button type="submit" className="bg-transparent text-black font-bold rounded-md px-6 py-2 border-2 border-black transition-transform duration-150 hover:scale-105 hover:shadow-[2px_2px_0_0_#000] hover:bg-black hover:text-white">
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </footer>
          </div>
        ) : (
          <div className="flex-1 flex flex-col space-y-8">
             <Card className="border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_#000]" style={{backgroundColor: BRUTALIST_COLORS[0]}}>
              <CardHeader>
                  <CardTitle className="text-2xl font-extrabold uppercase">{problem?.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  <p className="text-gray-700 font-semibold">{problem?.description}</p>
                  <div className="flex flex-wrap gap-2">
                      {problem?.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="border-2 border-black font-bold">{tag}</Badge>
                      ))}
                  </div>
              </CardContent>
            </Card>
             <Card className="border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_#000]" style={{backgroundColor: BRUTALIST_COLORS[1]}}>
              <CardHeader>
                  <CardTitle className="text-xl font-extrabold uppercase">What to do next?</CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-gray-700 font-semibold">Use the sidebar on the right to find a mentor based on the problem tags. Once you assign a mentor, a chat will be initiated with them.</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Sidebar */}
        <aside className="w-96 flex-shrink-0">
          <div className="space-y-8">
            {problem?.mentor && (
                <Card className="border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_#000]" style={{backgroundColor: BRUTALIST_COLORS[2]}}>
                    <CardHeader>
                        <CardTitle className="text-base font-extrabold uppercase">Assigned Mentor</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-4">
                        <Avatar className="w-12 h-12 border-2 border-black">
                            <AvatarImage src={problem.mentor.image || ''} />
                            <AvatarFallback>{problem.mentor.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-bold text-lg">{problem.mentor.name}</p>
                        </div>
                    </CardContent>
                </Card>
            )}

            {problem?.mentor && session?.user.id === problem.mentor.id && problem.status !== 'RESOLVED' && (
              <Button onClick={handleEndChat} className="w-full bg-red-600 hover:bg-red-700 border-2 border-black text-white font-bold text-lg shadow-[4px_4px_0px_0px_#000]">
                End Chat & Archive
              </Button>
            )}

            <Card className="border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_#000]" style={{backgroundColor: BRUTALIST_COLORS[3]}}>
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2 font-extrabold uppercase"><Tags className="w-5 h-5" /> Tags</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {problem?.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="flex items-center gap-1 border-2 border-black font-bold">
                                {tag}
                                <button onClick={() => handleRemoveTag(tag)} className="hover:text-red-500">
                                    <X className="w-3 h-3"/>
                                </button>
                            </Badge>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <Input value={tagInput} onChange={e => setTagInput(e.target.value)} placeholder="Add a tag..." className="border-2 border-black" />
                        <Button onClick={handleAddTag} className="bg-transparent border-2 border-black text-black font-bold hover:bg-black hover:text-white transition-all">Add</Button>
                    </div>
                </CardContent>
            </Card>

            {!problem?.mentor && (
                <Card className="border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_#000]" style={{backgroundColor: BRUTALIST_COLORS[4]}}>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2 font-extrabold uppercase"><UserPlus className="w-5 h-5"/> Matching Mentors</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {matchingMentors.length > 0 ? (
                            matchingMentors.map(mentor => (
                                <div key={mentor.id} className="flex items-center justify-between p-2 rounded-lg border-2 border-black" style={{backgroundColor: BRUTALIST_COLORS[0]}}>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="w-10 h-10 border-2 border-black">
                                            <AvatarImage src={mentor.image || ''} />
                                            <AvatarFallback>{mentor.name?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-bold">{mentor.name}</p>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {mentor.skills.map(skill => (
                                                    <Badge key={skill} variant="secondary" className="text-xs border-black border font-semibold">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <Button size="sm" onClick={() => handleAssignMentor(mentor.id)} className="bg-transparent border-2 border-black text-black font-bold hover:bg-black hover:text-white transition-all">Assign</Button>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-700 font-semibold">No matching mentors found. Try adding more specific tags.</p>
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