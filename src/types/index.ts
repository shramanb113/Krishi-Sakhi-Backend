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
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  farmerId: string;
  type: string;
  details: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
  userId?: string;
}

export interface MandiPrice {
  commodity: string;
  market: string;
  price: number;
  unit: string;
  date: string;
  trend: 'up' | 'down' | 'stable';
}

export interface GovernmentScheme {
  id: string;
  name: string;
  description: string;
  eligibility: string[];
  benefits: string;
  applicationProcess: string;
  deadline?: string;
  category: string;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  condition: string;
  forecast: {
    date: string;
    condition: string;
    maxTemp: number;
    minTemp: number;
    rainfall: number;
  }[];
}