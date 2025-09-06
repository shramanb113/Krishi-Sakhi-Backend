import { Farmer } from "../domain/farmer";
import { Activity } from "../domain/activity";
import { Message } from "../domain/message";

export interface IChatService {
  handle(userId: string, textMl: string): Promise<string>;
  clearHistory(userId: string): Promise<void>;
  getHistory(userId: string, limit?: number): Promise<Message[]>;
}

export interface IFarmerService {
  create(
    farmer: Omit<Farmer, "id" | "createdAt" | "updatedAt">
  ): Promise<Farmer>;
  get(farmerId: string): Promise<Farmer | null>;
  update(
    farmerId: string,
    data: Partial<Omit<Farmer, "id" | "farmerId" | "createdAt" | "updatedAt">>
  ): Promise<Farmer>;
  delete(farmerId: string): Promise<void>;
  getAll(options?: {
    page: number;
    limit: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    filters?: {
      village?: string;
      crop?: string;
      soilType?: string;
    };
  }): Promise<Farmer[]>;
  search(query: string, limit?: number): Promise<Farmer[]>;
}

export interface IActivityService {
  log(
    activity: Omit<Activity, "id" | "createdAt" | "updatedAt">
  ): Promise<Activity>;
  getByFarmer(farmerId: string): Promise<Activity[]>;
  getRecent(limit?: number): Promise<Activity[]>;
  delete(activityId: string): Promise<void>;
}
