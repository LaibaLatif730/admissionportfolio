"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Menu } from "@headlessui/react";

interface Program {
  id: number;
  name: string;
  code: string;
  eligibility: string;
}

const initialPrograms: Program[] = [
  { id: 1, name: "Computer Science", code: "CS101", eligibility: "High School Diploma" },
  { id: 2, name: "Business Administration", code: "BA201", eligibility: "High School Diploma" },
  { id: 3, name: "Psychology", code: "PSY301", eligibility: "High School Diploma" },
];

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProgram, setEditProgram] = useState<Program | null>(null);
  const [newProgram, setNewProgram] = useState<Program>({
    id: programs.length + 1,
    name: "",
    code: "",
    eligibility: "",
  });
  const [filter, setFilter] = useState("");

  const handleAddProgram = () => {
    setPrograms([...programs, { ...newProgram, id: programs.length + 1 }]);
    setNewProgram({ id: programs.length + 2, name: "", code: "", eligibility: "" });
    setModalOpen(false);
  };

  const handleUpdateProgram = () => {
    if (!editProgram) return;
    setPrograms(programs.map((p) => (p.id === editProgram.id ? editProgram : p)));
    setEditProgram(null);
    setModalOpen(false);
  };

  const handleDeleteProgram = (id: number) => {
    if (confirm("Are you sure you want to delete this program?")) {
      setPrograms(programs.filter((p) => p.id !== id));
    }
  };

  const filteredPrograms = programs.filter(
    (p) =>
      p.name.toLowerCase().includes(filter.toLowerCase()) ||
      p.code.toLowerCase().includes(filter.toLowerCase()) ||
      p.eligibility.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <main className="p-8 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-blue-700 flex items-center gap-2">
            📘 Programs & Courses
          </h1>
          <p className="mt-1 text-gray-600 text-sm md:text-base">
            Add, edit, and manage all academic programs/courses. Assign eligibility criteria.
          </p>
        </div>

        <Button
          className="bg-blue-500 text-white hover:bg-blue-600"
          onClick={() => {
            setEditProgram(null);
            setModalOpen(true);
          }}
        >
          + Add New Program
        </Button>
      </header>

      {/* Filter/Search */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <Input
          type="text"
          placeholder="Search by name, code, or eligibility..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Programs Table */}
      <section className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Program Records</h2>

        <div className="overflow-x-auto max-h-[400px] relative">
          {filteredPrograms.length > 0 ? (
            <table className="w-full table-auto border-collapse text-left">
              <thead className="bg-blue-50 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2 text-blue-700 font-medium">ID</th>
                  <th className="px-4 py-2 text-blue-700 font-medium">Program Name</th>
                  <th className="px-4 py-2 text-blue-700 font-medium">Code</th>
                  <th className="px-4 py-2 text-blue-700 font-medium">Eligibility</th>
                  <th className="px-4 py-2 text-blue-700 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPrograms.map((program) => (
                  <tr key={program.id} className="hover:bg-blue-50">
                    <td className="px-4 py-3 text-gray-700">{program.id}</td>
                    <td className="px-4 py-3 text-gray-700">{program.name}</td>
                    <td className="px-4 py-3 text-gray-700">{program.code}</td>
                    <td className="px-4 py-3 text-gray-700">{program.eligibility}</td>
                    <td className="px-4 py-3">
                      <Menu as="div" className="relative inline-block text-left">
                        <Menu.Button className="bg-blue-500 text-white hover:bg-blue-600 px-3 py-1 rounded text-sm">
                          Actions
                        </Menu.Button>
                        <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white border rounded shadow-lg focus:outline-none z-50">
                          <Menu.Item>
                            {({ active }: { active: boolean }) => (
                              <button
                                className={`${
                                  active ? "bg-blue-100" : ""
                                } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                                onClick={() => {
                                  setEditProgram(program);
                                  setModalOpen(true);
                                }}
                              >
                                Edit
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }: { active: boolean }) => (
                              <button
                                className={`${
                                  active ? "bg-red-100" : ""
                                } block w-full text-left px-4 py-2 text-sm text-red-600`}
                                onClick={() => handleDeleteProgram(program.id)}
                              >
                                Delete
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Menu>
                    </td>
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
              <p className="text-lg font-medium">No programs found.</p>
              <p className="text-sm mt-1">Try adjusting your search or add new programs.</p>
            </div>
          )}
        </div>
      </section>

      {/* Add/Edit Program Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">
              {editProgram ? "Edit Program" : "Add New Program"}
            </h3>
            <div className="flex flex-col gap-3">
              <div>
                <Label>Program Name</Label>
                <Input
                  placeholder="Enter program name"
                  value={editProgram ? editProgram.name : newProgram.name}
                  onChange={(e) =>
                    editProgram
                      ? setEditProgram({ ...editProgram, name: e.target.value })
                      : setNewProgram({ ...newProgram, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Program Code</Label>
                <Input
                  placeholder="Enter program code"
                  value={editProgram ? editProgram.code : newProgram.code}
                  onChange={(e) =>
                    editProgram
                      ? setEditProgram({ ...editProgram, code: e.target.value })
                      : setNewProgram({ ...newProgram, code: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Eligibility Criteria</Label>
                <Input
                  placeholder="Enter eligibility criteria"
                  value={editProgram ? editProgram.eligibility : newProgram.eligibility}
                  onChange={(e) =>
                    editProgram
                      ? setEditProgram({ ...editProgram, eligibility: e.target.value })
                      : setNewProgram({ ...newProgram, eligibility: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                className="bg-gray-300 text-gray-800 hover:bg-gray-400"
                onClick={() => {
                  setModalOpen(false);
                  setEditProgram(null);
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-500 text-white hover:bg-blue-600"
                onClick={editProgram ? handleUpdateProgram : handleAddProgram}
                disabled={
                  !(editProgram
                    ? editProgram.name && editProgram.code && editProgram.eligibility
                    : newProgram.name && newProgram.code && newProgram.eligibility)
                }
              >
                {editProgram ? "Update Program" : "Add Program"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
