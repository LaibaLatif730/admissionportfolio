"use client";
import Link from "next/link";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

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
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <header className="border bg-white text-blue-600 rounded-2xl p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admission Handler</h1>
        <nav className="space-x-4">
            <Link href="\subadmin2\dashboard\applications">
            <Button variant="outline" size="sm" className="hover:text-blue-800 hover:bg-blue-400">Applications</Button>
            </Link>
            <Link href="\subadmin2\dashboard\approved">
            <Button variant="outline" size="sm" className="hover:text-blue-800 hover:bg-blue-400">Approved</Button>
            </Link>
            <Link href="\subadmin2\dashboard\rejected">
            <Button variant="outline" size="sm" className="hover:text-blue-800 hover:bg-blue-400">Rejected</Button>
            </Link>
            <Link href="\subadmin2\dashboard\counseling">
            <Button variant="outline" size="sm" className="hover:text-blue-800 hover:bg-blue-400">Counseling</Button>
            </Link>
        </nav>
      </header>

      <main className="p-6 space-y-6">
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
          radius={[8, 8, 0, 0]} // rounded top corners
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
  );
}
