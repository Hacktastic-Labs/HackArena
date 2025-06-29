import { getEventWithParticipants } from "../actions";
import { notFound } from "next/navigation";
import { Calendar, MapPin, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { success, data } = await getEventWithParticipants(id);

  if (!success || !data) {
    // Could redirect to 404
    notFound();
  }

  const event = data;

  return (
    <div className="min-h-screen bg-[#FFE8CC]/20 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link href="/events" className="text-[#A63D00] hover:underline">
          ← Back to Events
        </Link>

        <Card className="border-[#A63D00]/20">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{event.title}</CardTitle>
            {event.description && (
              <CardDescription className="text-lg text-gray-700">
                {event.description}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-4 text-gray-800">
            <div className="flex items-center space-x-4 flex-wrap text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(event.date).toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>
                  {event.registrations.length} participant
                  {event.registrations.length !== 1 && "s"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Participants</h2>
          {event.registrations.length > 0 ? (
            <ul className="divide-y divide-gray-200 border rounded-md bg-white">
              {event.registrations.map((reg) => (
                <li
                  key={reg.id}
                  className="p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">
                      {reg.user.name || reg.user.username || reg.user.email}
                    </p>
                    <p className="text-sm text-gray-600">{reg.user.email}</p>
                  </div>
                  <span className="text-xs text-gray-500 capitalize">
                    {reg.status.toLowerCase().replace("_", " ")}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No participants yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
