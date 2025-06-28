import React from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Calendar, Plus, Filter } from "lucide-react"
import Link from "next/link"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#FFE8CC]/20">
      {/* Navigation */}
      <nav className="border-b border-[#A63D00]/20 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#A63D00] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="text-2xl font-bold text-[#A63D00]">Synora</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="text-gray-700 hover:text-[#A63D00] transition-colors">Dashboard</Link>
              <Link href="/knowledge" className="text-gray-700 hover:text-[#A63D00] transition-colors">Knowledge Base</Link>
              <Link href="/events" className="text-gray-700 hover:text-[#A63D00] transition-colors">Events</Link>
              <Link href="/blog" className="text-[#A63D00] font-medium">Blog</Link>
              <Link href="/mentors" className="text-gray-700 hover:text-[#A63D00] transition-colors">Find Mentors</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover insights, tutorials, and experiences shared by our community of learners and mentors.
          </p>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search articles..." className="pl-10" />
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="border-[#A63D00] text-[#A63D00] bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-[#A63D00] hover:bg-[#A63D00]/90">
              <Plus className="h-4 w-4 mr-2" />
              Write Article
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Featured Article */}
            <Card className="border-[#A63D00]/20 overflow-hidden">
              <div className="aspect-video bg-gradient-to-r from-[#A63D00] to-[#A63D00]/80 relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <Badge className="bg-white/20 text-white border-white/30 mb-2">Featured</Badge>
                  <h2 className="text-2xl font-bold mb-2">The Future of AI in Software Development</h2>
                  <p className="text-white/90">
                    Exploring how artificial intelligence is transforming the way we write, test, and deploy code.
                  </p>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback className="bg-[#A63D00] text-white">SM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Sarah Martinez</p>
                      <p className="text-sm text-gray-600">ML Engineer at OpenAI</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Dec 10</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
