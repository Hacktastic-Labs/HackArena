"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KnowledgeBase } from "@/app/generated/prisma";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function KnowledgePage() {
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeBase[]>([]);
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  async function fetchKnowledgeItems() {
    setIsFetching(true);
    try {
      const response = await fetch("/api/knowledge");
      if (response.ok) {
        const data = await response.json();
        setKnowledgeItems(data);
      } else {
        console.error("Failed to fetch knowledge items");
      }
    } catch (error) {
      console.error("Error fetching knowledge items:", error);
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    fetchKnowledgeItems();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/knowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, source, sourceType: "URL" }),
      });

      if (response.ok) {
        setTitle("");
        setSource("");
        fetchKnowledgeItems(); // Refresh the list
      } else {
        console.error("Failed to add knowledge item");
      }
    } catch (error) {
      console.error("Error submitting knowledge item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Knowledge Base</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Knowledge</CardTitle>
          <CardDescription>
            Add a new URL to be analyzed and added to the knowledge base.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title for the content"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="source">URL</Label>
              <Input
                id="source"
                type="url"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="https://example.com"
                required
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Knowledge"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-4">Existing Knowledge</h2>
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {knowledgeItems.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>
                    <a
                      href={item.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {item.source}
                    </a>{" "}
                    -{" "}
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        item.status === "COMPLETED"
                          ? "bg-green-100 text-green-800"
                          : item.status === "PENDING" ||
                            item.status === "PROCESSING"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {item.status === "COMPLETED" && item.content ? (
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value={item.id}>
                        <AccordionTrigger>View Analysis</AccordionTrigger>
                        <AccordionContent>
                          {(item.content as any).analysis.map(
                            (analysisItem: any, index: number) => (
                              <div key={index} className="mb-4">
                                <h4 className="font-semibold">
                                  {analysisItem.heading}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {analysisItem.details}
                                </p>
                              </div>
                            )
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <p className="text-sm text-gray-500">
                      {item.status === "FAILED"
                        ? "Analysis failed."
                        : "Analysis is being processed..."}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
