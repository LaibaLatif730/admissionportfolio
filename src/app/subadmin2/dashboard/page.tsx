"use client";

import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";  // ✅ Import motion
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { List ,Bell} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Cell 
} from "recharts";

// Sample data
const admissionsData = [
  { name: "Applications", count: 120 },
  { name: "Approved", count: 80 },
  { name: "Rejected", count: 40 },
];

const applications = [
  { id: 1, name: "Ali Khan", feeSlip: "uploaded", status: "Pending" },
  { id: 2, name: "Sara Ahmed", feeSlip: "missing", status: "Pending" },
];

const approvedStudents = [
  { id: 1, name: "Ali Khan", feeSlip: "uploaded", status: "Approved" },
];

const rejectedStudents = [
  { id: 2, name: "Sara Ahmed", feeSlip: "missing", status: "Rejected" },
];

const counselingRequests = [
  { id: 1, name: "Zainab Tariq", requestedAt: "2025-08-27" },
];

export default function AdmissionDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true); // ✅ Define sidebar state

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
        <aside className="w-45 h-210 bg-white dark:bg-neutral-800 rounded-xl shadow-md flex flex-col justify-between pt-6 pb-6 px-6 mt-6 ml-4">
          {/* --- Top Section --- */}
          <div>
            <h2 className="text-lg font-bold text-blue-600 mb-6">Admission</h2>
            <nav className="flex flex-col gap-6 text-sm">
              <Link href="/subadmin2/dashboard/applications" className="hover:text-emerald-600 transition text-bold text-xl">
              Applications
            </Link>
            <Link href="/subadmin2/dashboard/approved" className="hover:text-emerald-600 transition text-bold text-xl">
              Approved
            </Link>
            <Link href="/subadmin2/dashboard/rejected" className="hover:text-emerald-600 transition text-bold text-xl">
              Rejected
            </Link>
              <Link href="/subadmin2/dashboard/counseling" className="hover:text-emerald-600 transition text-bold text-xl">
              Counseling
            </Link>
            <Link href="/subadmin2/dashboard/postQuery" className="hover:text-emerald-600 transition text-bold text-xl">
              Query
            </Link>
            </nav>
          </div>
          {/* --- Bottom Section --- */}
          <footer className="flex flex-col items-center mt-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent rounded-full" />
            <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-2">
              © 2025 Largify
            </span>
          </footer>
        </aside>
      )}

      {/* MAIN CONTENT */}
      <div className="min-h-screen bg-gray-100 flex-1">
        {/* HEADER */}
  <header className="relative rounded-xl p-4 shadow-md overflow-hidden bg-white">
  <div className="relative flex justify-between items-center">
    {/* Left side: Toggle + Title */}
    <div className="flex items-center space-x-4">
      {/* Toggle Button */}
      <Button
        variant="outline"
        size="icon"
        className="bg-blue-600 hover:bg-blue-800 text-white"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <List size={18} />
      </Button>

      {/* Dashboard Title */}
      <h1 className="text-2xl font-bold text-blue-600">
        Addmission Handler
      </h1>
    </div>

    {/* Right side: Notification Icon */}
    <Button
      variant="outline"
      size="icon"
      className="bg-gray-100 hover:bg-gray-200"
    >
      <Bell size={22} className="text-blue-600" />
    </Button>
  </div>
</header>

        <main className="p-6 space-y-6">
          {/* Admissions Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Admissions Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={admissionsData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                  barCategoryGap="20%"
                >
                  <defs>
                    <linearGradient id="colorApprove" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#34D399" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#10B981" stopOpacity={0.6} />
                    </linearGradient>
                    <linearGradient id="colorReject" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F87171" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#EF4444" stopOpacity={0.6} />
                    </linearGradient>
                    <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#60A5FA" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.6} />
                    </linearGradient>
                  </defs>

                  <XAxis dataKey="name" tick={{ fontSize: 14, fontWeight: 600 }} />
                  <YAxis tick={{ fontSize: 14 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1E293B", borderRadius: "8px", border: "none" }}
                    itemStyle={{ color: "#fff" }}
                  />

                  {/* Assign colors based on category */}
                  <Bar
                    dataKey="count"
                    fill="#3B82F6"
                    radius={[8, 8, 0, 0]}
                    barSize={40}
                    label={{ position: "top", fontWeight: 600 }}
                  >
                    {admissionsData.map((entry, index) => {
                      let fill = "#3B82F6";
                      if (entry.name === "Approved") fill = "url(#colorApprove)";
                      else if (entry.name === "Rejected") fill = "url(#colorReject)";
                      else fill = "url(#colorPending)";
                      return <Cell key={`cell-${index}`} fill={fill} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

        {/* Application Requests Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600">Application Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Fee Slip</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>{app.id}</TableCell>
                    <TableCell>{app.name}</TableCell>
                    <TableCell>{app.feeSlip}</TableCell>
                    <TableCell>{app.status}</TableCell>
                    <TableCell className="space-x-2">
                      <Button size="sm" className="text-white bg-blue-600 hover:bg-blue-400">Approve</Button>
                      <Button size="sm"  className="text-white bg-blue-600 hover:bg-blue-400">Reject</Button>
                      <Button size="sm" className="text-white bg-blue-600 hover:bg-blue-400">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Approved Students Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600" >Approved Students</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Fee Slip</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {approvedStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.feeSlip}</TableCell>
                    <TableCell>{student.status}</TableCell>
                    <TableCell className="space-x-2">
                      <Button size="sm" className="text-white bg-blue-600 hover:bg-blue-400">View</Button>
                      <Button size="sm" className="text-white bg-blue-600 hover:bg-blue-400">Remove</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Rejected Students Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600">Rejected Students</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Fee Slip</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rejectedStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.feeSlip}</TableCell>
                    <TableCell>{student.status}</TableCell>
                    <TableCell className="space-x-2">
                      <Button size="sm" className="text-white bg-blue-600 hover:bg-blue-400">View</Button>
                      <Button size="sm" className="text-white bg-blue-600 hover:bg-blue-400">Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Counseling Requests Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600">Counseling Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Requested At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {counselingRequests.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell>{req.id}</TableCell>
                    <TableCell>{req.name}</TableCell>
                    <TableCell>{req.requestedAt}</TableCell>
                    <TableCell className="space-x-2">
                      <Button size="sm"className="text-white bg-blue-600 hover:bg-blue-400">Mark as Completed</Button>
                      <Button size="sm"className="text-white bg-blue-600 hover:bg-blue-400">Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  </motion.div> 
  );
}
