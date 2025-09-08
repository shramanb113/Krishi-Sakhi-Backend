import { Activity } from "../domain/activity";
import { Farmer } from "../domain/farmer";
import { Message } from "../domain/message";

export interface IActivityRepository {
  create(
    activity: Omit<Activity, "id" | "createdAt" | "updatedAt">
  ): Promise<Activity>;
  findByFarmerId(farmerId: string, limit?: number): Promise<Activity[]>;
  findRecent(limit?: number): Promise<Activity[]>;
  deleteById(activityId: string): Promise<void>;
  findByType(farmerId: string, type: string): Promise<Activity[]>;
  findByDateRange(
    farmerId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Activity[]>;
}

export interface IFarmerRepository {
  create(
    farmer: Omit<Farmer, "id" | "createdAt" | "updatedAt">
  ): Promise<Farmer>;
  findByFarmerId(farmerId: string): Promise<Farmer | null>;
  update(
    farmerId: string,
    data: Partial<Omit<Farmer, "id" | "farmerId" | "createdAt" | "updatedAt">>
  ): Promise<Farmer>;
  delete(farmerId: string): Promise<void>;
  findAll(): Promise<Farmer[]>;
  search(query: string, limit?: number): Promise<Farmer[]>;
}

export interface IChatRepository {
  save(
    userId: string,
    role: "user" | "assistant",
    content: string
  ): Promise<void>;
  findHistory(userId: string, limit?: number): Promise<Message[]>;
  clearHistory(userId: string): Promise<void>;
  findRecentMessages(limit?: number): Promise<Message[]>;
  countMessages(userId: string): Promise<number>;
}
