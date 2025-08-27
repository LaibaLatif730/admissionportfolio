"use client";

import { PortfolioItem } from "@/types";

interface PortfolioCardProps {
  item: PortfolioItem;
}

export default function PortfolioCard({ item }: PortfolioCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
      <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-blue-600 mb-2">{item.title}</h3>
        <p className="text-gray-700">{item.description}</p>
      </div>
    </div>
  );
}
