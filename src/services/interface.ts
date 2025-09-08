import { Activity } from '../domain/activity';
import { Farmer } from '../domain/farmer';
import { Message } from '../domain/message';

export interface IActivityService {
  log(
    activity: Omit<Activity, 'id' | 'farmerId' | 'createdAt' | 'updatedAt'>
  ): Promise<Activity>;
  getByFarmer(farmerId: string): Promise<Activity[]>;
  getRecent(limit?: number): Promise<Activity[]>;
  delete(activityId: string): Promise<void>;
  getByType(farmerId: string, type: string): Promise<Activity[]>;
  getByDateRange(
    farmerId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Activity[]>;
}

export interface IFarmerService {
  create(
    farmer: Omit<Farmer, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Farmer>;
  get(farmerId: string): Promise<Farmer | null>;
  update(
    farmerId: string,
    data: Partial<Omit<Farmer, 'id' | 'farmerId' | 'createdAt' | 'updatedAt'>>
  ): Promise<Farmer>;
  delete(farmerId: string): Promise<void>;
  getAll(): Promise<Farmer[]>;
  search(query: string, limit?: number): Promise<Farmer[]>;
}

export interface IChatService {
  handle(userId: string, textMl: string): Promise<string>;
  clearHistory(userId: string): Promise<void>;
  getHistory(userId: string, limit?: number): Promise<Message[]>;
}
