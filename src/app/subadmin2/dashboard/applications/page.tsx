"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Sample data
const initialApplications = [
  { id: 1, name: "Ali Khan", feeSlip: "uploaded", document: "uploaded", status: "Pending" },
  { id: 2, name: "Sara Ahmed", feeSlip: "missing", document: "missing", status: "Pending" },
  { id: 3, name: "Hassan Ali", feeSlip: "uploaded", document: "uploaded", status: "Pending" },
];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState(initialApplications);

  // Handle Approve/Reject button clicks
  const handleAction = async (id: number, action: "approve" | "reject") => {
    try {
      // Call your API route (replace with actual API path)
      const res = await fetch("/api/subadmin2/dashboard/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
      });

      if (res.ok) {
        setApplications((prev) =>
          prev.map((app) =>
            app.id === id ? { ...app, status: action === "approve" ? "Approved" : "Rejected" } : app
          )
        );
      } else {
        console.error("Failed to perform action");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Top Navbar */}
      <header className="text-blue-600 rounded-2xl border bg-white p-4 mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Student Applications</h1>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Fee Slip</TableHead>
                <TableHead>Document</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>{app.id}</TableCell>
                  <TableCell>{app.name}</TableCell>
                  <TableCell>
                    {app.feeSlip === "uploaded" ? (
                      <span className="text-green-600 font-semibold">Uploaded</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Missing</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {app.document === "uploaded" ? (
                      <span className="text-green-600 font-semibold">Uploaded</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Missing</span>
                    )}
                  </TableCell>
                  <TableCell>{app.status}</TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      size="sm"
                      className="text-white hover:bg-blue-800 bg-blue-600"
                      disabled={app.status !== "Pending"}
                      onClick={() => handleAction(app.id, "approve")}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      className="text-white hover:bg-blue-800 bg-blue-600"
                      disabled={app.status !== "Pending"}
                      onClick={() => handleAction(app.id, "reject")}
                    >
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      className="text-white hover:bg-blue-800 bg-blue-600"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
