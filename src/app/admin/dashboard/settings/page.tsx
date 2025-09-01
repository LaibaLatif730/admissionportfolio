// src/app/admin/settings/page.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const [theme, setTheme] = useState("light");

  return (
    <main className="p-6 space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold text-blue-600">⚙️ Settings</h1>
        <p className="text-gray-600">
          Customize color schemes, branding, and manage security (password, domain, email).
        </p>
      </header>

      {/* Tabs for Settings Sections */}
      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="appearance" className="bg-blue-100 text-blue-700 hover:bg-blue-200">🎨 Appearance</TabsTrigger>
          <TabsTrigger value="branding" className="bg-blue-100 text-blue-700 hover:bg-blue-200">🏷 Branding</TabsTrigger>
          <TabsTrigger value="security" className="bg-blue-100 text-blue-700 hover:bg-blue-200">🔒 Security</TabsTrigger>
          <TabsTrigger value="email" className="bg-blue-100 text-blue-700 hover:bg-blue-200">📧 Email Config</TabsTrigger>
        </TabsList>

        {/* Appearance */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Theme</Label>
                <div className="flex gap-4 mt-2">
                  <Button
                    className={theme === "light" ? "bg-blue-600 text-white" : "border border-blue-500 text-blue-600"}
                    onClick={() => setTheme("light")}
                  >
                    Light
                  </Button>
                  <Button
                    className={theme === "dark" ? "bg-blue-600 text-white" : "border border-blue-500 text-blue-600"}
                    onClick={() => setTheme("dark")}
                  >
                    Dark
                  </Button>
                </div>
              </div>

              <div>
                <Label>Primary Color</Label>
                <Input type="color" defaultValue="#2563eb" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Branding */}
        <TabsContent value="branding">
          <Card>
            <CardHeader>
              <CardTitle>Branding</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Site Name</Label>
                <Input placeholder="Enter site name" />
              </div>
              <div>
                <Label>Logo URL</Label>
                <Input placeholder="https://example.com/logo.png" />
              </div>
              <div>
                <Label>Favicon URL</Label>
                <Input placeholder="https://example.com/favicon.ico" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Change Password</Label>
                <Input type="password" placeholder="New password" />
              </div>
              <div>
                <Label>Domain</Label>
                <Input placeholder="www.example.com" />
              </div>
              <div className="flex items-center justify-between">
                <Label>Two-Factor Authentication</Label>
                <Switch className="bg-blue-600 checked:bg-blue-700" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Config */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>SMTP Host</Label>
                <Input placeholder="smtp.example.com" />
              </div>
              <div>
                <Label>SMTP Port</Label>
                <Input type="number" placeholder="465" />
              </div>
              <div>
                <Label>Email Username</Label>
                <Input placeholder="user@example.com" />
              </div>
              <div>
                <Label>Email Password</Label>
                <Input type="password" placeholder="********" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-800 text-white">
          Save Changes
        </Button>
      </div>
    </main>
  );
}
