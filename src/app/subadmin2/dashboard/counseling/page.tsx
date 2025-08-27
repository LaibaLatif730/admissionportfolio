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

// Sample counseling requests
const initialRequests = [
  { id: 1, name: "Ali Khan", contact: "ali@example.com", message: "Need guidance for admission", status: "Pending" },
  { id: 2, name: "Sara Ahmed", contact: "sara@example.com", message: "Questions about fee structure", status: "Pending" },
  { id: 3, name: "Hassan Ali", contact: "hassan@example.com", message: "Career counseling", status: "Pending" },
];

export default function CounselingRequestsPage() {
  const [requests, setRequests] = useState(initialRequests);

  // Remove record once counseling is complete
  const handleComplete = (id: number) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Top Navbar / Page Header */}
      <header className=" text-blue-600  rounded-2xl bg-white p-4 mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Counseling Requests</h1>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Pending Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell>{req.id}</TableCell>
                  <TableCell>{req.name}</TableCell>
                  <TableCell>{req.contact}</TableCell>
                  <TableCell>{req.message}</TableCell>
                  <TableCell>{req.status}</TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      size="sm"
                      className="text-white hover:bg-blue-800 bg-blue-600"
                      onClick={() => handleComplete(req.id)}
                    >
                      Complete
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
              {requests.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    No pending counseling requests.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
