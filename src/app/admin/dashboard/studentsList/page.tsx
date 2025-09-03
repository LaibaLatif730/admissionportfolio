"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface Student {
  id: number;
  name: string;
  email: string;
  program: string;
  status: "Admitted" | "Pending" | "Graduated";
}

const initialStudents: Student[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", program: "Computer Science", status: "Admitted" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", program: "Business Administration", status: "Pending" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", program: "Psychology", status: "Graduated" },
  { id: 4, name: "Diana Prince", email: "diana@example.com", program: "Physics", status: "Admitted" },
  { id: 5, name: "Evan Davis", email: "evan@example.com", program: "Mathematics", status: "Pending" },
];

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState<Student>({
    id: students.length + 1,
    name: "",
    email: "",
    program: "",
    status: "Admitted",
  });

  const studentsPerPage = 5;

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(filter.toLowerCase()) ||
      s.email.toLowerCase().includes(filter.toLowerCase()) ||
      s.program.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);

  const exportCSV = () => {
    const headers = ["ID", "Name", "Email", "Program", "Status"];
    const rows = filteredStudents.map((s) => [s.id, s.name, s.email, s.program, s.status]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "students.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: Student["status"]) => {
    const base = "px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case "Admitted":
        return <span className={`${base} bg-green-100 text-green-800`}>{status}</span>;
      case "Pending":
        return <span className={`${base} bg-yellow-100 text-yellow-800`}>{status}</span>;
      case "Graduated":
        return <span className={`${base} bg-gray-200 text-gray-800`}>{status}</span>;
      default:
        return <span className={base}>{status}</span>;
    }
  };

  const handleAddStudent = () => {
    setStudents([...students, { ...newStudent, id: students.length + 1 }]);
    setNewStudent({ id: students.length + 2, name: "", email: "", program: "", status: "Admitted" });
    setModalOpen(false);
  };

  return (
    <main className="p-8 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
<header className="relative rounded-xl p-4 shadow-md overflow-hidden mb-6">
  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-blue-600/5 dark:from-blue-600/10 dark:to-blue-600/10 blur-xl" />
  
  <div className="relative flex justify-between items-center">
    {/* Left side: Title */}
    <h1 className="text-2xl font-bold text-blue-600">Student List</h1>

    {/* Right side: Buttons + Search */}
    <div className="flex flex-wrap gap-2 items-center">
      <Button className="bg-gray-400 text-gray-900 hover:bg-gray-500" onClick={exportCSV}>
        Export CSV
      </Button>
      <Button className="bg-gray-400 text-gray-900 hover:bg-gray-500" onClick={() => setModalOpen(true)}>
        Add New Student
      </Button>
      <input
        type="text"
        placeholder="Filter by name, email, program..."
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          setCurrentPage(1);
        }}
        className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  </div>
</header>


      {/* Student Table */}
      <section className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Student Records</h2>

        <div className="overflow-x-auto max-h-[400px] relative">
          {currentStudents.length > 0 ? (
            <table className="w-full table-auto border-collapse text-left">
              <thead className="bg-blue-50 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2 text-blue-700 font-medium">ID</th>
                  <th className="px-4 py-2 text-blue-700 font-medium">Name</th>
                  <th className="px-4 py-2 text-blue-700 font-medium">Email</th>
                  <th className="px-4 py-2 text-blue-700 font-medium">Program</th>
                  <th className="px-4 py-2 text-blue-700 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-blue-50">
                    <td className="px-4 py-3 text-gray-700">{student.id}</td>
                    <td className="px-4 py-3 text-gray-700">{student.name}</td>
                    <td className="px-4 py-3 text-gray-700">{student.email}</td>
                    <td className="px-4 py-3 text-gray-700">{student.program}</td>
                    <td className="px-4 py-3">{getStatusBadge(student.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                alt="No records"
                className="w-24 h-24 mb-4 opacity-50"
              />
              <p className="text-lg font-medium">No student records found.</p>
              <p className="text-sm mt-1">Try adjusting your filters or adding new students.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && currentStudents.length > 0 && (
          <div className="mt-4 flex justify-center gap-2">
            <Button
              className="bg-gray-300 text-gray-800 hover:bg-gray-400"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {[...Array(totalPages)].map((_, idx) => (
              <Button
                key={idx}
                className={`px-4 ${
                  currentPage === idx + 1 ? "bg-gray-500 text-white" : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                }`}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </Button>
            ))}
            <Button
              className="bg-gray-300 text-gray-800 hover:bg-gray-400"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </section>

      {/* Add Student Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">Add New Student</h3>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Name"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="email"
                placeholder="Email"
                value={newStudent.email}
                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                placeholder="Program"
                value={newStudent.program}
                onChange={(e) => setNewStudent({ ...newStudent, program: e.target.value })}
                className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <select
              title="student"
                value={newStudent.status}
                onChange={(e) => setNewStudent({ ...newStudent, status: e.target.value as Student["status"] })}
                className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="Admitted">Admitted</option>
                <option value="Pending">Pending</option>
                <option value="Graduated">Graduated</option>
              </select>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button className="bg-gray-300 text-gray-800 hover:bg-gray-400" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button
                className="bg-gray-500 text-white hover:bg-gray-600"
                onClick={handleAddStudent}
                disabled={!newStudent.name || !newStudent.email || !newStudent.program}
              >
                Add Student
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
