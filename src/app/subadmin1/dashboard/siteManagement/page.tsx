"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Banner {
  id: number;
  title: string;
  image: string;
}

interface Service {
  id: number;
  title: string;
  description: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
}

interface ClassCourses {
  className: string;
  courses: Course[];
}

const SiteManagementPage: React.FC = () => {
  // Brand Kit state
  const [logo, setLogo] = useState("/images/logo.png");
  const [primaryColor, setPrimaryColor] = useState("#3b82f6"); // blue-600
  const [typography, setTypography] = useState("Inter, sans-serif");

  // Banners and Services
  const [banners, setBanners] = useState<Banner[]>([
    { id: 1, title: "Welcome Banner", image: "/images/banner.jpeg" },
  ]);

  const [services, setServices] = useState<Service[]>([
    { id: 1, title: "Library", description: "Well-stocked library with books for all grades." },
    { id: 2, title: "Science Lab", description: "Fully-equipped lab for practical experiments." },
    { id: 3, title: "Sports Facilities", description: "Playgrounds, gym, and indoor sports facilities." },
    { id: 4, title: "Extracurricular Activities", description: "Music, arts, clubs, and competitions." },
    { id: 5, title: "Transportation", description: "School bus service for safe and convenient travel." },
  ]);

  // Courses organized class-wise
  const [classCourses, setClassCourses] = useState<ClassCourses[]>([
    {
      className: "Class 1",
      courses: [
        { id: 1, title: "Math 101", description: "Basic Mathematics" },
        { id: 2, title: "English 101", description: "Basic English" },
      ],
    },
    {
      className: "Class 2",
      courses: [
        { id: 3, title: "Math 201", description: "Intermediate Math" },
        { id: 4, title: "English 201", description: "Intermediate English" },
      ],
    },
  ]);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"logo" | "color" | "typography" | "banner" | "service" | "course" | null>(null);
  const [tempValue, setTempValue] = useState<any>({});
  const [currentClass, setCurrentClass] = useState<string>("");

  const openDialog = (type: typeof dialogType, value?: any, className?: string) => {
    setDialogType(type);
    setTempValue(value || {});
    if (className) setCurrentClass(className);
    setDialogOpen(true);
  };

  const saveDialog = () => {
    switch (dialogType) {
      case "logo": setLogo(tempValue); break;
      case "color": setPrimaryColor(tempValue); break;
      case "typography": setTypography(tempValue); break;
      case "banner":
        setBanners([...banners.filter(b => b.id !== tempValue.id), { id: tempValue.id || Date.now(), title: tempValue.title, image: tempValue.image }]);
        break;
      case "service":
        setServices([...services.filter(s => s.id !== tempValue.id), { id: tempValue.id || Date.now(), title: tempValue.title, description: tempValue.description }]);
        break;
      case "course":
        setClassCourses(prev =>
          prev.map(cls => {
            if (cls.className === currentClass) {
              if (tempValue.course) {
                // Edit existing course
                return { ...cls, courses: cls.courses.map(c => c.id === tempValue.course.id ? { ...tempValue.course, ...tempValue } : c) };
              } else {
                // Add new course
                return { ...cls, courses: [...cls.courses, { id: Date.now(), title: tempValue.title, description: tempValue.description }] };
              }
            }
            return cls;
          })
        );
        break;
    }
    setDialogOpen(false);
    setDialogType(null);
    setTempValue({});
    setCurrentClass("");
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-blue-600">Site Management Dashboard</h1>

      {/* Brand Kit */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-blue-600">Brand Kit</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex flex-col items-center gap-2">
            <img src={logo} alt="Logo" className="w-24 h-24 object-contain border rounded" />
            <Button className="mt-2 w-full border hover:bg-blue-400 bg-white text-blue-600 hover:text-blue-800" onClick={() => openDialog("logo")}>Update Logo</Button>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded border" style={{ backgroundColor: primaryColor }} />
            <Button className="mt-2 w-full border hover:bg-blue-400 bg-white text-blue-600 hover:text-blue-800" onClick={() => openDialog("color")}>Update Primary Color</Button>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="font-semibold text-center">{typography}</p>
            <Button className="mt-2 w-full border hover:bg-blue-400 bg-white text-blue-600 hover:text-blue-800" onClick={() => openDialog("typography")}>Update Typography</Button>
          </div>
        </CardContent>
      </Card>

      {/* Banners and Services Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Homepage Banners */}
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-xl text-blue-600">Homepage Banners</CardTitle>
            <Button className="border hover:bg-blue-400 bg-white text-blue-600 hover:text-blue-800" onClick={() => openDialog("banner")}>Add New Banner</Button>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {banners.map((b) => (
              <div key={b.id} className="border rounded p-2 flex flex-col items-center gap-2">
                <img src={b.image} alt={b.title} className="w-500 h-100 object-contain rounded" />
                <p className="font-semibold text-center">{b.title}</p>
                <div className="flex gap-2 mt-1">
                  <Button size="sm" className="border hover:bg-blue-400 bg-white text-blue-600 hover:text-blue-800" onClick={() => openDialog("banner", b)}>Edit</Button>
                  <Button size="sm"className="border hover:bg-blue-400 bg-white text-blue-600 hover:text-blue-800" onClick={() => setBanners(banners.filter(ban => ban.id !== b.id))}>Delete</Button>
                  <Button size="sm" className="border hover:bg-blue-400 bg-white text-blue-600 hover:text-blue-800">Preview</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Services Section */}
<Card>
  <CardHeader>
    <CardTitle className="text-xl text-blue-600">School Services</CardTitle>
  </CardHeader>
  <CardContent className="grid grid-cols-1 gap-4">
    {services.map((s) => (
      <div key={s.id} className="border rounded p-2 flex justify-between items-center">
        <div>
          <p className="font-bold text-lg">{s.title}</p>
          <p className="text-sm text-gray-600 truncate">{s.description}</p>
        </div>
        <Button  className=" border hover:bg-blue-400 bg-white text-blue-600 hover:text-blue-800"size="sm" onClick={() => openDialog("service", s)}>Edit</Button>
      </div>
    ))}
    <Button className="w-full mt-2 border hover:bg-blue-400 bg-white text-blue-600 hover:text-blue-800" onClick={() => openDialog("service")}>Add New Service</Button>
  </CardContent>
</Card>

      </div>

      {/* Courses Section (Class-wise) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-blue-600">Courses (Class-wise)</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {classCourses.map((cls) => (
            <div key={cls.className} className="border rounded p-4 flex flex-col gap-2">
              <h3 className="font-bold text-lg text-blue-600">{cls.className}</h3>
              {cls.courses.map((c) => (
                <div key={c.id} className="border rounded p-2 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{c.title}</p>
                    <p className="text-sm">{c.description}</p>
                  </div>
                  <Button size="sm" className="ml-2 border hover:bg-blue-400 bg-white text-blue-600 hover:text-blue-800" onClick={() => openDialog("course", { course: c }, cls.className)}>Edit</Button>
                </div>
              ))}
              <Button className="mt-2 w-full border hover:bg-blue-400 bg-white text-blue-600 hover:text-blue-800" onClick={() => openDialog("course", {}, cls.className)}>Add New Course</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Dialog Form */}
      {dialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <h2 className="text-xl font-bold text-blue-600 mb-4">Update {dialogType}</h2>

            {(dialogType === "logo" || dialogType === "color" || dialogType === "typography") && (
              <input
                type="text"
                id={`${dialogType}-input`}
                className="w-full border rounded px-3 py-2 mb-4"
                value={tempValue || ""}
                placeholder={`Enter ${dialogType}`}
                title={`Enter ${dialogType}`}
                onChange={(e) => setTempValue(e.target.value)}
              />
            )}

            {dialogType === "banner" && (
              <>
                <label htmlFor="bannerTitle" className="block mb-1 font-semibold">Banner Title</label>
                <input
                  id="bannerTitle"
                  type="text"
                  className="w-full border rounded px-3 py-2 mb-2"
                  value={tempValue.title || ""}
                  placeholder="Banner Title"
                  title="Banner Title"
                  onChange={(e) => setTempValue({ ...tempValue, title: e.target.value })}
                />
                <label htmlFor="bannerImage" className="block mb-1 font-semibold">Banner Image URL</label>
                <input
                  id="bannerImage"
                  type="text"
                  className="w-full border rounded px-3 py-2 mb-2"
                  value={tempValue.image || ""}
                  placeholder="Image URL"
                  title="Image URL"
                  onChange={(e) => setTempValue({ ...tempValue, image: e.target.value })}
                />
              </>
            )}

            {(dialogType === "service" || dialogType === "course") && (
              <>
                <label htmlFor="titleInput" className="block mb-1 font-semibold text-blue-600">Title</label>
                <input
                  id="titleInput"
                  type="text"
                  className="w-full border rounded px-3 py-2 mb-2"
                  value={tempValue.title || ""}
                  placeholder="Title"
                  title="Title"
                  onChange={(e) => setTempValue({ ...tempValue, title: e.target.value })}
                />
                <label htmlFor="descInput" className="block mb-1 font-semibold text-blue-600">Description</label>
                <textarea
                  id="descInput"
                  className="w-full border rounded px-3 py-2 mb-2"
                  value={tempValue.description || ""}
                  placeholder="Description"
                  title="Description"
                  onChange={(e) => setTempValue({ ...tempValue, description: e.target.value })}
                />
              </>
            )}

            <div className="flex justify-end gap-2 mt-4">
              <Button className="border hover:bg-blue-400 bg-white text-blue-600 hover:text-blue-800" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button className=" border hover:bg-blue-400 bg-white text-blue-600 hover:text-blue-800" onClick={saveDialog}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SiteManagementPage;
