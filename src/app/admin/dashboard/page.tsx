"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  GraduationCap,
  BookOpen,
  Bell,
  Settings,
  User,
  ChevronDown,
  List,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ChartData {
  label: string;
  value: number;
}

interface TimeFrameData {
  admissions: ChartData[];
  updates: ChartData[];
  requests: ChartData[];
}

interface Data {
  month: TimeFrameData;
  week: TimeFrameData;
  year: TimeFrameData;
}

const data: Data = {
  month: {
    admissions: [
      { label: "Week 1", value: 50 },
      { label: "Week 2", value: 60 },
      { label: "Week 3", value: 70 },
      { label: "Week 4", value: 80 },
    ],
    updates: [
      { label: "Week 1", value: 30 },
      { label: "Week 2", value: 40 },
      { label: "Week 3", value: 50 },
      { label: "Week 4", value: 60 },
    ],
    requests: [
      { label: "Week 1", value: 10 },
      { label: "Week 2", value: 15 },
      { label: "Week 3", value: 20 },
      { label: "Week 4", value: 25 },
    ],
  },
  week: {
    admissions: [
      { label: "Day 1", value: 10 },
      { label: "Day 2", value: 12 },
      { label: "Day 3", value: 15 },
      { label: "Day 4", value: 18 },
      { label: "Day 5", value: 20 },
      { label: "Day 6", value: 22 },
      { label: "Day 7", value: 25 },
    ],
    updates: [
      { label: "Day 1", value: 5 },
      { label: "Day 2", value: 7 },
      { label: "Day 3", value: 8 },
      { label: "Day 4", value: 10 },
      { label: "Day 5", value: 12 },
      { label: "Day 6", value: 13 },
      { label: "Day 7", value: 15 },
    ],
    requests: [
      { label: "Day 1", value: 2 },
      { label: "Day 2", value: 3 },
      { label: "Day 3", value: 4 },
      { label: "Day 4", value: 5 },
      { label: "Day 5", value: 6 },
      { label: "Day 6", value: 7 },
      { label: "Day 7", value: 8 },
    ],
  },
  year: {
    admissions: [
      { label: "Jan", value: 200 },
      { label: "Feb", value: 220 },
      { label: "Mar", value: 240 },
      { label: "Apr", value: 260 },
      { label: "May", value: 280 },
      { label: "Jun", value: 300 },
      { label: "Jul", value: 320 },
      { label: "Aug", value: 340 },
      { label: "Sep", value: 360 },
      { label: "Oct", value: 380 },
      { label: "Nov", value: 400 },
      { label: "Dec", value: 420 },
    ],
    updates: [
      { label: "Jan", value: 100 },
      { label: "Feb", value: 110 },
      { label: "Mar", value: 120 },
      { label: "Apr", value: 130 },
      { label: "May", value: 140 },
      { label: "Jun", value: 150 },
      { label: "Jul", value: 160 },
      { label: "Aug", value: 170 },
      { label: "Sep", value: 180 },
      { label: "Oct", value: 190 },
      { label: "Nov", value: 200 },
      { label: "Dec", value: 210 },
    ],
    requests: [
      { label: "Jan", value: 40 },
      { label: "Feb", value: 45 },
      { label: "Mar", value: 50 },
      { label: "Apr", value: 55 },
      { label: "May", value: 60 },
      { label: "Jun", value: 65 },
      { label: "Jul", value: 70 },
      { label: "Aug", value: 75 },
      { label: "Sep", value: 80 },
      { label: "Oct", value: 85 },
      { label: "Nov", value: 90 },
      { label: "Dec", value: 95 },
    ],
  },
};

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [timeframe, setTimeframe] = useState<"month" | "week" | "year">("month");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <div className="p-6 min-h-screen bg-gray-50 dark:bg-neutral-900">
        <p className="text-center text-gray-500 dark:text-gray-400">
          Loading dashboard...
        </p>
      </div>
    );
  }

  const cardHover = {
    whileHover: { scale: 1.03, boxShadow: "0 12px 24px rgba(0,0,0,0.12)" },
  };

  const buttonHover = {
    whileHover: { scale: 1.05, backgroundColor: "#f3f4f6" },
    whileTap: { scale: 0.95 },
  };

  const stats = [
    {
      title: "Admissions",
      value: "120",
      subtitle: "+15%",
      icon: <GraduationCap className="text-blue-600" />,
    },
    {
      title: "Portfolio Updates",
      value: "73",
      subtitle: "+8%",
      icon: <BookOpen className="text-emerald-600" />,
    },
    {
      title: "Counseling Requests",
      value: "45",
      subtitle: "+22%",
      icon: <Users className="text-indigo-600" />,
    },
  ];

  return (
   <motion.div
  suppressHydrationWarning
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
  className="flex bg-gray-50 dark:bg-neutral-900 min-h-screen"
>
  {/* SIDENAVBAR */}
  {sidebarOpen && (
    <aside className="w-45 h-150 bg-white dark:bg-neutral-800 rounded-xl shadow-md flex flex-col justify-between pt-6 pb-6 px-6 mt-6 ml-4">
      {/* --- Top Section --- */}
      <div>
        <h2 className="text-lg font-bold text-blue-600 mb-6">Admin</h2>
        <nav className="flex flex-col gap-3 text-sm">
          <Link href="/admin/dashboard/users" className="hover:text-emerald-600 transition text-bold text-lg">
            Users
          </Link>
          <Link href="/admin/dashboard/studentsList" className="hover:text-emerald-600 transition text-bold text-lg">
            StudentsList
          </Link>
          <Link href="/admin/dashboard/programs" className="hover:text-emerald-600 transition text-bold text-lg">
            Programs
          </Link>
          <Link href="/admin/dashboard/taskManagement" className="hover:text-emerald-600 transition text-bold text-lg">
            Assign Task 
          </Link>
          <Link href="/admin/dashboard/settings" className="hover:text-emerald-600 transition text-bold text-lg">
            Settings
          </Link>
        </nav>
      </div>

      {/* --- Bottom Section --- */}
      <footer className="flex flex-col items-center mt-6">
        {/* Decorative line */}
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent rounded-full" />

        {/* Small footer text */}
        <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-2">
          © 2025 Largify
        </span>
      </footer>
    </aside>
  )}
      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 space-y-6">
        <header className="rounded-xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md shadow-sm border px-6 py-3 mb-6 flex justify-between items-center">
           {/* Left side: Toggle + Title */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="bg-blue-600 hover:bg-blue-800 text-white"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <List size={18} />
            </Button>
            <h1 className="text-xl font-bold text-blue-700 dark:text-blue-400">
              Admin Dashboard
            </h1>
          </div>
        </header>

        {/* SECTION HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-300">
              Site Analytics
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Track student engagement, admissions, and counseling performance.
            </p>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-3">
            {/* Timeframe Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div {...buttonHover}>
                  <Button className="flex items-center gap-1 variant-outline size-sm  bg-blue-600 hover:bg-blue-800 text-white">
                    {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}{" "}
                    <ChevronDown size={16} />
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTimeframe("week")}>
                  Week
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeframe("month")}>
                  Month
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeframe("year")}>
                  Year
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div {...buttonHover}>
                  <Button className="variant-outline size-sm  bg-blue-600 hover:bg-blue-800 text-white">
                    <Bell size={16} />
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>No new notifications</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Settings */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div {...buttonHover}>
                  <Button className="variant-outline size-sm  bg-blue-600 hover:bg-blue-800 text-white">
                    <Settings size={16} />
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>General</DropdownMenuItem>
                <DropdownMenuItem>Security</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div {...buttonHover}>
                  <Button className="variant-outline size-sm  bg-blue-600 hover:bg-blue-800 text-white">
                    <User size={16} />
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* QUICK STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <motion.div key={i} {...cardHover}>
              <Card className="rounded-xl border shadow-sm">
                <CardHeader className="flex justify-between items-center py-2">
                  <CardTitle className="text-sm">{stat.title}</CardTitle>
                  {stat.icon}
                </CardHeader>
                <CardContent className="py-2">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* ANALYTICAL GRAPHS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Admissions Trend",
              type: "line",
              key: "admissions",
              color: "#6366F1",
            },
            {
              title: "Portfolio Updates",
              type: "bar",
              key: "updates",
              color: "#6366F1",
            },
            {
              title: "Counseling Requests",
              type: "line",
              key: "requests",
              color: "#6366F1",
            },
          ].map((chart, i) => (
            <motion.div key={i} {...cardHover}>
              <Card className="rounded-lg shadow-sm">
                <CardHeader className="py-2">
                  <CardTitle className="text-sm">{chart.title}</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <ResponsiveContainer width="100%" height={160}>
                    {chart.type === "line" ? (
                      <LineChart
                        data={data[timeframe][chart.key as keyof TimeFrameData]}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="label" stroke="#6B7280" fontSize={10} />
                        <YAxis stroke="#6B7280" fontSize={10} />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke={chart.color}
                          strokeWidth={2}
                        />
                      </LineChart>
                    ) : (
                      <BarChart
                        data={data[timeframe][chart.key as keyof TimeFrameData]}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="label" stroke="#6B7280" fontSize={10} />
                        <YAxis stroke="#6B7280" fontSize={10} />
                        <Tooltip />
                        <Bar
                          dataKey="value"
                          fill={chart.color}
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
