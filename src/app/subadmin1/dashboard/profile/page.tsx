"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProfilePage: React.FC = () => {
  const [domain, setDomain] = useState("myschool.com");
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#3b82f6"); // blue-600

  const handleSaveLogin = () => {
    console.log("Login details updated:", { domain, username, password });
    // integrate API call to save login details
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-blue-600">Profile Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-blue-600">Login Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-3">
            <label htmlFor="domain" className="font-semibold">Domain</label>
            <input
              id="domain"
              type="text"
              className="border rounded px-3 py-2 w-full"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />

            <label htmlFor="username" className="font-semibold">Username</label>
            <input
              id="username"
              type="text"
              className="border rounded px-3 py-2 w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password" className="font-semibold">Password</label>
            <input
              id="password"
              type="password"
              className="border rounded px-3 py-2 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button className="mt-2 w-full bg-blue-600 hover:bg-blue-800 text-white" onClick={handleSaveLogin}>
              Update Login Details
            </Button>
          </div>

          <div className="flex flex-col gap-3">
            <CardTitle className="text-lg text-blue-600">Site Color Scheme</CardTitle>
            <label htmlFor="siteColor" className="font-semibold">Primary Color</label>
            <input
              type="color"
              id="siteColor"
              className="w-16 h-10 p-1 border rounded"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
            />
            <p className="text-sm text-gray-600 mt-1">Choose the main color of your website.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
