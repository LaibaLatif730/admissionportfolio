"use client";

import React from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PlusCircle, BookOpen, Award, Users } from "lucide-react";

const activityData = [
  { month: "Jan", events: 5, stories: 3, achievements: 2 },
  { month: "Feb", events: 7, stories: 4, achievements: 5 },
  { month: "Mar", events: 4, stories: 6, achievements: 3 },
  { month: "Apr", events: 9, stories: 5, achievements: 4 },
  { month: "May", events: 6, stories: 7, achievements: 6 },
];

const admissionsData = [
  { month: "Jan", admissions: 50 },
  { month: "Feb", admissions: 80 },
  { month: "Mar", admissions: 65 },
  { month: "Apr", admissions: 100 },
  { month: "May", admissions: 120 },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-black text-blue-600 dark:text-white min-h-screen text-sm">
      {/* TOP NAVBAR */}
      <header className="relative rounded-xl p-4 shadow-md overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-blue-600/5 dark:from-blue-600/10 dark:to-blue-600/10 blur-xl" />
        <div className="relative flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">
            Portfolio Dashboard
          </h1>
          <nav className="flex space-x-6">
            <Link href="/subadmin1/dashboard/portfolio" className="px-3 py-1 text-lg font-medium text-blue-600 hover:text-blue-800 transition">
              Portfolio
            </Link>
            <Link href="/subadmin1/dashboard/siteManagement" className="px-3 py-1 text-lg font-medium text-blue-600 hover:text-blue-800 transition">
              Site Management
            </Link>
            <Link href="/subadmin1/dashboard/profile" className="px-3 py-1 text-lg font-medium text-blue-600 hover:text-blue-800 transition">
              Profile
            </Link>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="p-6 space-y-6">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-white">Overview</h2>
          <div className="space-x-2">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Item
            </Button>
          </div>
        </div>

        {/* QUICK STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex justify-between">
              <CardTitle>Events</CardTitle>
              <BookOpen className="text-blue-600" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">31</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex justify-between">
              <CardTitle>Success Stories</CardTitle>
              <Users className="text-blue-600" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">14</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex justify-between">
              <CardTitle>Achievements</CardTitle>
              <Award className="text-blue-600" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">22</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex justify-between">
              <CardTitle>Admissions</CardTitle>
              <Users className="text-blue-600" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">120</p>
            </CardContent>
          </Card>
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600 ">Portfolio Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="events" fill="#2563EB" />
                  <Bar dataKey="stories" fill="#1E40AF" />
                  <Bar dataKey="achievements" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Admissions Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={admissionsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="admissions" stroke="#2563EB" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* QUICK ACTIONS */}
        <div className="mt-6">
        <h2 className="text-lg font-semibold text-blue-700 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="h-14 w-full text-lg font-medium rounded-2xl border border-gray-300 bg-white text-blue-600 shadow hover:text-blue-800 hover:bg-blue-400  transition">
            Add New Event
            </button>
            <button className="h-14 w-full text-lg font-medium rounded-2xl border border-gray-300 bg-white text-blue-600 shadow hover:text-blue-800 hover:bg-blue-400 transition">
            Upload Achievement
            </button>
            <button className="h-14 w-full text-lg font-medium rounded-2xl border border-gray-300 bg-white text-blue-600 shadow hover:text-blue-800 hover:bg-blue-400 transition">
            Update Success Story
            </button>
        </div>
        </div>

      </div>
    </div>
  );
}