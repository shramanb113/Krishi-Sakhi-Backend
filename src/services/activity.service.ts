import { injectable, inject } from "tsyringe";
import { ActivityRepository } from "../repositories/activity.repository";
import { Activity } from "../domain/activity";
import { AppError } from "../middlewares/errorHandler";
import { IActivityService } from "./interface";

@injectable()
export class ActivityService implements IActivityService {
  constructor(
    @inject(ActivityRepository)
    private repo: ActivityRepository
  ) {}

  async log(
    activity: Omit<Activity, "id" | "createdAt" | "updatedAt">
  ): Promise<Activity> {
    try {
      return await this.repo.create(activity);
    } catch (error) {
      console.error("Failed to log activity:", error);
      throw new AppError(500, "Failed to log activity");
    }
  }

  async getByFarmer(farmerId: string): Promise<Activity[]> {
    try {
      return await this.repo.findByFarmerId(farmerId);
    } catch (error) {
      console.error("Failed to fetch activities:", error);
      throw new AppError(500, "Failed to fetch activities");
    }
  }

  async getRecent(limit = 50): Promise<Activity[]> {
    try {
      return await this.repo.findRecent(limit);
    } catch (error) {
      console.error("Failed to fetch recent activities:", error);
      throw new AppError(500, "Failed to fetch recent activities");
    }
  }

  async delete(activityId: string): Promise<void> {
    try {
      await this.repo.deleteById(activityId);
    } catch (error) {
      console.error("Failed to delete activity:", error);
      throw new AppError(500, "Failed to delete activity");
    }
  }

  async getByType(farmerId: string, type: string): Promise<Activity[]> {
    try {
      return await this.repo.findByType(farmerId, type);
    } catch (error) {
      console.error("Failed to fetch activities by type:", error);
      throw new AppError(500, "Failed to fetch activities by type");
    }
  }

  async getByDateRange(
    farmerId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Activity[]> {
    try {
      return await this.repo.findByDateRange(farmerId, startDate, endDate);
    } catch (error) {
      console.error("Failed to fetch activities by date range:", error);
      throw new AppError(500, "Failed to fetch activities by date range");
    }
  }
}
