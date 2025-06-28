"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createEvent } from "../actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have a Textarea component
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const initialState = {
  success: false,
  error: null,
  errors: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-[#A63D00] hover:bg-[#A63D00]/90"
    >
      {pending ? "Creating Event..." : "Create Event"}
    </Button>
  );
}

export default function CreateEventPage() {
  const [state, formAction] = useFormState(createEvent, initialState);

  return (
    <div className="min-h-screen bg-[#FFE8CC]/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-[#A63D00]/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/events"
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Link>
              <div>
                <CardTitle className="text-2xl">Create a New Event</CardTitle>
                <CardDescription>
                  Fill out the details below to schedule your event.
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Advanced React Workshop"
              />
              {state?.errors?.title && (
                <p className="text-red-500 text-sm">{state.errors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Event Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Tell us more about your event..."
                rows={5}
              />
              {state?.errors?.description && (
                <p className="text-red-500 text-sm">
                  {state.errors.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date">Date and Time</Label>
                <Input id="date" name="date" type="datetime-local" />
                {state?.errors?.date && (
                  <p className="text-red-500 text-sm">{state.errors.date}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g., Online or Tech Hub"
                />
                {state?.errors?.location && (
                  <p className="text-red-500 text-sm">
                    {state.errors.location}
                  </p>
                )}
              </div>
            </div>

            {state?.error && (
              <p className="text-red-500 text-sm">{state.error}</p>
            )}

            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
