// src/types/index.ts

export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category?: string; // Event, Achievement, Success Story, etc.
}

export interface Milestone {
  id: number;
  date: string;
  title: string;
  description: string;
}
