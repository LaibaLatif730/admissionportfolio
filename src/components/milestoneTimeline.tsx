"use client";

import { Milestone } from "@/types";

interface TimelineProps {
  milestones: Milestone[];
}

export default function MilestoneTimeline({ milestones }: TimelineProps) {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Milestones</h2>
      <ul className="border-l-2 border-blue-600 pl-4">
        {milestones.map((m) => (
          <li key={m.id} className="mb-6 relative">
            <span className="absolute -left-3 top-0 w-6 h-6 bg-blue-600 rounded-full"></span>
            <p className="text-gray-500 text-sm">{m.date}</p>
            <h3 className="text-lg font-semibold text-gray-900">{m.title}</h3>
            <p className="text-gray-700">{m.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
