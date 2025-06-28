import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MentorDashboardPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFE8CC]/20">
      <h1 className="text-4xl font-bold mb-4 text-[#A63D00]">
        Mentor Dashboard
      </h1>
      <p className="text-gray-700 mb-8">
        Welcome, Mentor! This section is under construction.
      </p>
      <Button
        asChild
        className="bg-[#A63D00] hover:bg-[#A63D00]/90 text-white px-6 py-3 rounded-md"
      >
        <Link href="/">Go to Home</Link>
      </Button>
    </div>
  );
}
