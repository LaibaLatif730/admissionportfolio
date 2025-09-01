"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface UserItem {
  id: number;
  name: string;
  email: string;
  role: "Portfolio Handler" | "Admission Handler" | "Counseling Handler" | "Admin";
  domain: string;
  permissions: string[];
  password?: string;
}

const initialUsers: UserItem[] = [
  {
    id: 1,
    name: "Sarah Khan",
    email: "sarah@school.edu",
    role: "Portfolio Handler",
    domain: "portfolio.school.edu",
    permissions: ["Add", "Edit", "Delete"],
    password: "********",
  },
  {
    id: 2,
    name: "Ali Raza",
    email: "ali@school.edu",
    role: "Admission Handler",
    domain: "admissions.school.edu",
    permissions: ["View", "Edit"],
    password: "********",
  },
];

const roleColors: Record<UserItem["role"], string> = {
  "Portfolio Handler": "bg-sky-100 text-sky-700",
  "Admission Handler": "bg-sky-50 text-sky-600",
  "Counseling Handler": "bg-sky-50 text-sky-600",
  "Admin": "bg-sky-200 text-sky-800",
};

const allPermissions = ["View", "Add", "Edit", "Delete"];

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserItem[]>(initialUsers);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false);
  const [isDomainDialogOpen, setIsDomainDialogOpen] = useState(false);
  const [isCredentialsDialogOpen, setIsCredentialsDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserItem | null>(null);
  const [newUser, setNewUser] = useState<Partial<UserItem>>({
    name: "",
    email: "",
    role: "Portfolio Handler",
    domain: "",
    permissions: [],
  });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.domain) return;
    const user: UserItem = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role as UserItem["role"],
      domain: newUser.domain,
      permissions: newUser.permissions || ["View"],
      password: "********",
    };
    setUsers([user, ...users]);
    setNewUser({ name: "", email: "", role: "Portfolio Handler", domain: "", permissions: [] });
    setIsUserDialogOpen(false);
  };

  const handleEditUser = (id: number) => {
    const updatedName = prompt("Enter new name:");
    const updatedEmail = prompt("Enter new email:");
    if (!updatedName || !updatedEmail) return;
    setUsers(users.map((u) => (u.id === id ? { ...u, name: updatedName, email: updatedEmail } : u)));
  };

  const handleDeleteUser = (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const openPermissionsModal = (user: UserItem) => {
    setCurrentUser(user);
    setIsPermissionsDialogOpen(true);
  };

  const openDomainModal = (user: UserItem) => {
    setCurrentUser(user);
    setIsDomainDialogOpen(true);
  };

  const openCredentialsModal = (user: UserItem) => {
    setCurrentUser(user);
    setIsCredentialsDialogOpen(true);
  };

  const togglePermission = (perm: string) => {
    if (!currentUser) return;
    const updatedPermissions = currentUser.permissions.includes(perm)
      ? currentUser.permissions.filter((p) => p !== perm)
      : [...currentUser.permissions, perm];
    setCurrentUser({ ...currentUser, permissions: updatedPermissions });
    setUsers(users.map((u) => (u.id === currentUser.id ? { ...u, permissions: updatedPermissions } : u)));
  };

  const updateDomain = (domain: string) => {
    if (!currentUser) return;
    setCurrentUser({ ...currentUser, domain });
    setUsers(users.map((u) => (u.id === currentUser.id ? { ...u, domain } : u)));
  };

  const updatePassword = (password: string) => {
    if (!currentUser) return;
    setCurrentUser({ ...currentUser, password });
    setUsers(users.map((u) => (u.id === currentUser.id ? { ...u, password } : u)));
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-navy-800">User Management</h1>
        <p className="text-sky-700 mt-1">
          Manage sub-admins, roles, domains, login credentials, and permissions.
        </p>
      </header>

      {/* Controls */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <Button
          className="bg-sky-100 hover:bg-sky-200 text-sky-700"
          onClick={() => setIsUserDialogOpen(true)}
        >
          ➕ Add New User
        </Button>
      </div>

      {/* Users Table */}
      <Card className="shadow-md border border-sky-100">
        <CardHeader className="bg-sky-50">
          <CardTitle className="text-sky-800">List of Sub-Admins</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-sky-100 text-left text-sky-700">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Domain</th>
                <th className="p-3">Permissions</th>
                <th className="p-3">Password</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t hover:bg-sky-50">
                  <td className="p-3 font-medium text-sky-800">{u.name}</td>
                  <td className="p-3 text-sky-700">{u.email}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${roleColors[u.role]}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3 text-sky-700">{u.domain}</td>
                  <td className="p-3 text-sky-800">{u.permissions.join(", ")}</td>
                  <td className="p-3 text-sky-700">{u.password}</td>
                  <td className="p-3 flex gap-1 flex-wrap">
                    <Button
                      className="bg-sky-50 hover:bg-sky-100 text-sky-700"
                      onClick={() => handleEditUser(u.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="bg-red-100 hover:bg-red-200 text-red-700"
                      onClick={() => handleDeleteUser(u.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      className="bg-sky-50 hover:bg-sky-100 text-sky-700"
                      onClick={() => openPermissionsModal(u)}
                    >
                      ⚙️ Permissions
                    </Button>
                    <Button
                      className="bg-sky-50 hover:bg-sky-100 text-sky-700"
                      onClick={() => openDomainModal(u)}
                    >
                      🌐 Domain
                    </Button>
                    <Button
                      className="bg-sky-50 hover:bg-sky-100 text-sky-700"
                      onClick={() => openCredentialsModal(u)}
                    >
                      🔑 Credentials
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Add User Modal */}
      {isUserDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md border border-sky-100">
            <h2 className="text-xl font-bold mb-4 text-sky-800">Add New User</h2>
            <label className="block mb-2 text-sky-700">
              Name:
              <input
                type="text"
                className="w-full border border-sky-200 rounded px-2 py-1 mt-1"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </label>
            <label className="block mb-2 text-sky-700">
              Email:
              <input
                type="email"
                className="w-full border border-sky-200 rounded px-2 py-1 mt-1"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </label>
            <label className="block mb-2 text-sky-700">
              Role:
              <select
                className="w-full border border-sky-200 rounded px-2 py-1 mt-1"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value as any })}
              >
                <option>Portfolio Handler</option>
                <option>Admission Handler</option>
                <option>Counseling Handler</option>
                <option>Admin</option>
              </select>
            </label>
            <label className="block mb-2 text-sky-700">
              Domain:
              <input
                type="text"
                className="w-full border border-sky-200 rounded px-2 py-1 mt-1"
                value={newUser.domain}
                onChange={(e) => setNewUser({ ...newUser, domain: e.target.value })}
              />
            </label>
            <div className="flex justify-end gap-2 mt-4">
              <Button className="bg-sky-100 hover:bg-sky-200 text-sky-700" onClick={() => setIsUserDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-sky-200 hover:bg-sky-300 text-sky-800" onClick={handleAddUser}>
                Add
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Permissions Modal */}
      {isPermissionsDialogOpen && currentUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm border border-sky-100">
            <h2 className="text-xl font-bold mb-4 text-sky-800">Manage Permissions - {currentUser.name}</h2>
            <div className="flex flex-wrap gap-2">
              {allPermissions.map((perm) => (
                <Button
                  key={perm}
                  className={`${currentUser.permissions.includes(perm)
                    ? "bg-sky-600 text-white"
                    : "bg-sky-100 text-sky-700"} hover:bg-sky-200`}
                  onClick={() => togglePermission(perm)}
                >
                  {perm}
                </Button>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <Button className="bg-sky-100 hover:bg-sky-200 text-sky-700" onClick={() => setIsPermissionsDialogOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Domain Modal */}
      {isDomainDialogOpen && currentUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm border border-sky-100">
            <h2 className="text-xl font-bold mb-4 text-sky-800">Edit Domain - {currentUser.name}</h2>
            <input
              type="text"
              id="domain"
              aria-label="Domain"
              className="w-full border border-sky-200 rounded px-2 py-1 mb-4"
              value={currentUser.domain}
              onChange={(e) => updateDomain(e.target.value)}
            />
            <div className="flex justify-end">
              <Button className="bg-sky-100 hover:bg-sky-200 text-sky-700" onClick={() => setIsDomainDialogOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Credentials Modal */}
      {isCredentialsDialogOpen && currentUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm border border-sky-100">
            <h2 className="text-xl font-bold mb-4 text-sky-800">Edit Credentials - {currentUser.name}</h2>
            <label htmlFor="password" className="block mb-2 text-sky-700">
              Password:
            </label>
            <input
              id="password"
              type="password"
              className="w-full border border-sky-200 rounded px-2 py-1 mb-4"
              value={currentUser.password}
              onChange={(e) => updatePassword(e.target.value)}
            />

            <div className="flex justify-end">
              <Button className="bg-sky-100 hover:bg-sky-200 text-sky-700" onClick={() => setIsCredentialsDialogOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
