"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { X, Loader2, Plus } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void; // optional callback after creation
}

const CATEGORIES = ["GENERAL", "EVENTS", "TECHNEWS"] as const;

type Category = (typeof CATEGORIES)[number];

export function CreateAnnouncementModal({ isOpen, onClose, onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("GENERAL");
  const [url, setUrl] = useState("");
  const [source, setSource] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          category,
          url: url || undefined,
          source: source || undefined,
        }),
      });
      if (res.ok) {
        setTitle("");
        setDescription("");
        setCategory("GENERAL");
        setUrl("");
        setSource("");
        onClose();
        onCreated?.();
      } else {
        console.error("Failed to create announcement");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Create Announcement</CardTitle>
              <CardDescription>Share news with everyone</CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="desc">Description</Label>
              <Textarea
                id="desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="url">URL (optional)</Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="source">Source (optional)</Label>
              <Input
                id="source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="HackerNews"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="cat">Category</Label>
              <select
                id="cat"
                className="w-full border rounded px-3 py-2 focus:outline-none"
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#A63D00] hover:bg-[#A63D00]/90"
                disabled={isSubmitting || !title.trim()}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />{" "}
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" /> Create
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
