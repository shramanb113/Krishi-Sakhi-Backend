import { Request, Response } from "express";
import { container } from "tsyringe";
import { ActivityService } from "../services/activity.service";
import { AppError } from "../middlewares/errorHandler";
import { IActivityService } from "../services/interface";

export class ActivityController {
  private activityService: IActivityService =
    container.resolve(ActivityService);

  async createActivity(req: Request, res: Response): Promise<void> {
    try {
      // Uses log() method from interface
      const activity = await this.activityService.log(req.body);

      res.status(201).json({
        success: true,
        data: activity,
        message: "Activity created successfully",
      });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error("Create activity error:", error);
      throw new AppError(500, "Failed to create activity");
    }
  }

  async getActivitiesByFarmerId(req: Request, res: Response): Promise<void> {
    try {
      const farmerId = req.params.farmerId;
      // Uses getByFarmer() method from interface
      const activities = await this.activityService.getByFarmer(farmerId);

      res.json({
        success: true,
        data: activities,
        count: activities.length,
      });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error("Get farmer activities error:", error);
      throw new AppError(500, "Failed to fetch activities");
    }
  }

  async getRecentActivities(req: Request, res: Response): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      // Uses getRecent() method from interface
      const activities = await this.activityService.getRecent(limit);

      res.json({
        success: true,
        data: activities,
        count: activities.length,
      });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error("Get recent activities error:", error);
      throw new AppError(500, "Failed to fetch recent activities");
    }
  }

  async deleteActivity(req: Request, res: Response): Promise<void> {
    try {
      const activityId = req.params.activityId;
      // Uses delete() method from interface
      await this.activityService.delete(activityId);

      res.json({
        success: true,
        message: "Activity deleted successfully",
      });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error("Delete activity error:", error);
      throw new AppError(500, "Failed to delete activity");
    }
  }

  async getActivitiesByType(req: Request, res: Response): Promise<void> {
    try {
      const farmerId = req.params.farmerId;
      const type = req.params.type;
      // Uses getByType() method from interface
      const activities = await this.activityService.getByType(farmerId, type);

      res.json({
        success: true,
        data: activities,
        count: activities.length,
        type: type,
      });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error("Get activities by type error:", error);
      throw new AppError(500, "Failed to fetch activities by type");
    }
  }

  async getActivitiesByDateRange(req: Request, res: Response): Promise<void> {
    try {
      const farmerId = req.params.farmerId;
      const startDate = new Date(req.query.startDate as string);
      const endDate = new Date(req.query.endDate as string);

      // Uses getByDateRange() method from interface
      const activities = await this.activityService.getByDateRange(
        farmerId,
        startDate,
        endDate
      );

      res.json({
        success: true,
        data: activities,
        count: activities.length,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error("Get activities by date range error:", error);
      throw new AppError(500, "Failed to fetch activities by date range");
    }
  }
}
