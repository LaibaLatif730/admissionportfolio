"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  priority: string;
  deadline: string;
}

export default function SubAdminTaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = () => {
    if (!title || !description || !assignedTo || !deadline) return;
    const newTask: Task = {
      id: tasks.length + 1,
      title,
      description,
      assignedTo,
      priority,
      deadline,
    };
    setTasks([...tasks, newTask]);
    setTitle("");
    setDescription("");
    setAssignedTo("");
    setPriority("Medium");
    setDeadline("");
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-black min-h-screen">
        {/* Top Navbar */}
    <header className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md">
    <h1 className="text-xl font-bold text-blue-700">Task Management</h1>
    </header>
      {/* Task Form */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Post New Query / Task</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Select onValueChange={setAssignedTo} value={assignedTo}>
            <SelectTrigger>
              <SelectValue placeholder="Assign To (e.g. Portfolio Handler)" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Portfolio Handler">Admission Handler</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setPriority} value={priority}>
            <SelectTrigger>
              <SelectValue placeholder="Select Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          <Button onClick={handleSubmit} className="w-full bg-blue-600">Submit Task</Button>
        </CardContent>
      </Card>

      {/* Task List */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Posted Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Deadline</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.id}</TableCell>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{task.assignedTo}</TableCell>
                    <TableCell>{task.priority}</TableCell>
                    <TableCell>{task.deadline}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">
                    No tasks posted yet.
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
