// src/domain/farmer.ts
// src/domain/farmer.ts
export interface Farmer {
  id: string;
  farmerId: string;
  name: string;
  phone: string | null;
  village: string | null;
  lat: number | null;
  lon: number | null;
  landSizeHectares: number | null;
  crops: string[];
  soilType: string | null;
  irrigation: string | null;
  language: string;
  createdAt: Date;
  updatedAt: Date;
}
