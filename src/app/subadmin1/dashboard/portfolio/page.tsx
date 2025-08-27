"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  type: "Event" | "Success Story" | "Achievement";
  date: string;
}

const initialPortfolio: PortfolioItem[] = [
  {
    id: 1,
    title: "Science Fair 2025",
    description: "Annual school science fair showcasing innovative projects.",
    image: "/images/ScienceFair.jpeg",
    type: "Event",
    date: "2025-03-15",
  },
  {
    id: 2,
    title: "Student Achievement Awards",
    description: "Recognizing top-performing students and their milestones.",
    image: "/images/StudentAchievementAward.jpeg",
    type: "Achievement",
    date: "2025-05-20",
  },
];

const PortfolioPage: React.FC = () => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(initialPortfolio);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState<Partial<PortfolioItem>>({
    title: "",
    description: "",
    image: "",
    type: "Event",
    date: "",
  });

  const handleAddItem = () => {
    if (!newItem.title || !newItem.description || !newItem.date) return;

    const item: PortfolioItem = {
      id: Date.now(),
      title: newItem.title,
      description: newItem.description,
      image: newItem.image || "/images/default.jpg",
      type: newItem.type as "Event" | "Success Story" | "Achievement",
      date: newItem.date,
    };
    setPortfolio([item, ...portfolio]);
    setNewItem({ title: "", description: "", image: "", type: "Event", date: "" });
    setIsDialogOpen(false);
  };

  const handleEditItem = (id: number) => {
    const updatedTitle = prompt("Enter new title:");
    const updatedDescription = prompt("Enter new description:");
    if (!updatedTitle || !updatedDescription) return;

    setPortfolio(
      portfolio.map((item) =>
        item.id === id
          ? { ...item, title: updatedTitle, description: updatedDescription }
          : item
      )
    );
  };

  const handleDeleteItem = (id: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setPortfolio(portfolio.filter((item) => item.id !== id));
    }
  };

  const handleOpenElementor = (id: number) => {
    alert("Open WordPress Elementor to replace image/text for this card. (Simulated)");
  };

  return (
    <div className="p-6">
      {/* Header */}
      <header className="relative rounded-xl p-4 shadow-md overflow-hidden mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-blue-600/5 dark:from-blue-600/10 dark:to-blue-600/10 blur-xl" />
        <div className="relative flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Portfolio Dashboard</h1>
        </div>
      </header>

      {/* Add New Item Button */}
      <Button
        className="mb-6 bg-blue-600 hover:bg-blue-800 text-white"
        onClick={() => setIsDialogOpen(true)}
      >
        Add New Item
      </Button>

      {/* Dialog Form */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <h2 className="text-xl font-bold text-blue-600 mb-4">Add New Portfolio Item</h2>

            <label className="block mb-2">
              Title:
              <input
                type="text"
                className="w-full border rounded px-2 py-1 mt-1"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              />
            </label>

            <label className="block mb-2">
              Description:
              <textarea
                className="w-full border rounded px-2 py-1 mt-1"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              />
            </label>

            <label className="block mb-2">
              Type:
              <select
                className="w-full border rounded px-2 py-1 mt-1"
                value={newItem.type}
                onChange={(e) =>
                  setNewItem({ ...newItem, type: e.target.value as any })
                }
              >
                <option value="Event">Event</option>
                <option value="Science Fair">Science Fair</option>
                <option value="Sports Gala">Sports Gala</option>
                <option value="Arts">Arts</option>
                <option value="Success Story">Success Story</option>
                <option value="Achievement">Achievement</option>
              </select>
            </label>

            <label className="block mb-2">
              Image URL:
              <input
                type="text"
                className="w-full border rounded px-2 py-1 mt-1"
                value={newItem.image}
                onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
              />
            </label>

            <label className="block mb-4">
              Date:
              <input
                type="date"
                className="w-full border rounded px-2 py-1 mt-1"
                value={newItem.date}
                onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
              />
            </label>

            <div className="flex justify-end gap-2">
              <Button
                className="bg-blue-600 hover:bg-blue-800 text-white"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-800 text-white" onClick={handleAddItem}>
                Add
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolio.map((item) => (
          <Card key={item.id} className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-blue-600">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <p className="font-semibold">{item.type}</p>
              <p className="mb-2">{item.description}</p>
              <p className="text-sm text-gray-500">{item.date}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                <Button
                  className="bg-yellow-400 hover:bg-yellow-600 text-white"
                  onClick={() => handleEditItem(item.id)}
                >
                  Edit
                </Button>
                <Button
                  className="bg-red-500 hover:bg-red-700 text-white"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  Delete
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-800 text-white"
                  onClick={() => handleOpenElementor(item.id)}
                >
                  Open in Elementor
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Timeline / Milestones */}
      <h2 className="text-2xl font-bold text-blue-600 mt-10 mb-4">
        Timeline / Milestones
      </h2>
      <div className="border-l-2 border-blue-600 ml-4 pl-4">
        {portfolio
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .map((item) => (
            <div key={item.id} className="mb-6 relative">
              <div className="absolute -left-4 w-3 h-3 bg-blue-600 rounded-full top-1.5"></div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-gray-500">{item.date}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PortfolioPage;
