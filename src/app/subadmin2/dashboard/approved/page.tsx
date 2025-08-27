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

// Sample approved students data
const initialApprovedStudents = [
  { id: 1, name: "Ali Khan", feeSlip: "uploaded", document: "uploaded", status: "Approved" },
  { id: 2, name: "Hassan Ali", feeSlip: "uploaded", document: "uploaded", status: "Approved" },
];

export default function ApprovedPage() {
  const [students] = useState(initialApprovedStudents);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Top Navbar / Page Header */}
      <header className="text-blue-600 rounded-2xl bg-white p-4 mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Approved Students</h1>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Verified Students</CardTitle>
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
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    <span className="text-green-600 font-semibold">{student.feeSlip}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-green-600 font-semibold">{student.document}</span>
                  </TableCell>
                  <TableCell>{student.status}</TableCell>
                  <TableCell>
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
