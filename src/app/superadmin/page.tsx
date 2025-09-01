"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function SuperAdminDashboard() {
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const schools = [
    { id: 1, name: "Greenfield School", admin: "Ali Khan", students: 320, teachers: 25, status: "Active" },
    { id: 2, name: "City Grammar", admin: "Sara Ahmed", students: 210, teachers: 18, status: "Inactive" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 🔹 Top Navbar */}
      <header className="border bg-white text-blue-600 rounded-2xl p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Superadmin Panel</h1>
        <nav className="space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpenDialog("schools")}
            className="hover:text-blue-800 hover:bg-blue-400"
          >
            Schools
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpenDialog("admins")}
            className="hover:text-blue-800 hover:bg-blue-400"
          >
            Admins
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpenDialog("settings")}
            className="hover:text-blue-800 hover:bg-blue-400"
          >
            Settings
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpenDialog("reports")}
            className="hover:text-blue-800 hover:bg-blue-400"
          >
            Reports
          </Button>
        </nav>
      </header>

      {/* 🔹 Main Content */}
      <main className="p-6 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader><CardTitle>Total Schools</CardTitle></CardHeader>
            <CardContent><p className="text-2xl font-bold">12</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Total Students</CardTitle></CardHeader>
            <CardContent><p className="text-2xl font-bold">4,560</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Total Teachers</CardTitle></CardHeader>
            <CardContent><p className="text-2xl font-bold">320</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Active Plans</CardTitle></CardHeader>
            <CardContent><p className="text-2xl font-bold">9</p></CardContent>
          </Card>
        </div>

        {/* Schools Management */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-600">Schools Management</h2>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>School Name</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Teachers</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schools.map((school) => (
                <TableRow key={school.id}>
                  <TableCell>{school.name}</TableCell>
                  <TableCell>{school.admin}</TableCell>
                  <TableCell>{school.students}</TableCell>
                  <TableCell>{school.teachers}</TableCell>
                  <TableCell>{school.status}</TableCell>
                  <TableCell>
                    <div className="space-x-2">
                      <Button  size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-400 bg-white">View</Button>
                      <Button  size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-400 bg-white">Edit</Button>
                      <Button  size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-400 bg-white">Delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>

      {/* 🔹 Dialogs */}
      <Dialog open={openDialog === "schools"} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New School</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <Input placeholder="School Name" />
            <Input placeholder="School Email" />
            <Input placeholder="School Address" />
          </form>
          <DialogFooter>
            <Button className="bg-blue-600 text-white hover:bg-blue-800" onClick={() => setOpenDialog(null)}>Cancel</Button>
            <Button className="bg-blue-600 text-white hover:bg-blue-800">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openDialog === "admins"} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New School Admin</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <Input placeholder="Admin Name" />
            <Input placeholder="Admin Email" />
            <Input placeholder="Assign School ID" />
          </form>
          <DialogFooter>
            <Button className="bg-blue-600 text-white hover:bg-blue-800" onClick={() => setOpenDialog(null)}>Cancel</Button>
            <Button className="bg-blue-600 text-white hover:bg-blue-800">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openDialog === "settings"} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Platform Settings</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <Input placeholder="Platform Name" />
            <Input placeholder="Support Email" />
          </form>
          <DialogFooter>
            <Button className="bg-blue-600 text-white hover:bg-blue-800" onClick={() => setOpenDialog(null)}>Cancel</Button>
            <Button className="bg-blue-600 text-white hover:bg-blue-800">Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openDialog === "reports"} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Report</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <Input placeholder="Report Type (e.g., Monthly)" />
            <Input placeholder="Select Date Range" />
          </form>
          <DialogFooter>
            <Button className="bg-blue-600 text-white hover:bg-blue-800" onClick={() => setOpenDialog(null)}>Cancel</Button>
            <Button className="bg-blue-600 text-white hover:bg-blue-800">Generate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
