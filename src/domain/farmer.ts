// src/domain/farmer.ts
export interface Farmer {
  id: string;
  farmerId: string;
  name: string;
  phone?: string;
  village?: string;
  lat?: number;
  lon?: number;
  landSizeHectares?: number;
  crops: string[];
  soilType?: string;
  irrigation?: string;
  language: string;
  createdAt: Date;
  updatedAt: Date;
}
