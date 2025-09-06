import { Request, Response } from "express";
import { container } from "tsyringe";
import { FarmerService } from "../services/farmer.service";
import { AppError } from "../middlewares/errorHandler";

export class FarmerController {
  private farmerService = container.resolve(FarmerService);

  async createFarmer(req: Request, res: Response): Promise<void> {
    try {
      const farmer = await this.farmerService.create(req.body);

      res.status(201).json({
        success: true,
        data: farmer,
        message: "Farmer created successfully",
      });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error("Create farmer error:", error);
      throw new AppError(500, "Failed to create farmer");
    }
  }

  async getFarmer(req: Request, res: Response): Promise<void> {
    try {
      const farmerId = req.params.farmerId;
      const farmer = await this.farmerService.get(farmerId);

      if (!farmer) {
        throw new AppError(404, `Farmer with ID ${farmerId} not found`);
      }

      res.json({
        success: true,
        data: farmer,
      });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error("Get farmer error:", error);
      throw new AppError(500, "Failed to fetch farmer");
    }
  }

  async updateFarmer(req: Request, res: Response): Promise<void> {
    try {
      const farmerId = req.params.farmerId;
      const farmer = await this.farmerService.update(farmerId, req.body);

      res.json({
        success: true,
        data: farmer,
        message: "Farmer updated successfully",
      });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error("Update farmer error:", error);
      throw new AppError(500, "Failed to update farmer");
    }
  }

  async deleteFarmer(req: Request, res: Response): Promise<void> {
    try {
      const farmerId = req.params.farmerId;
      await this.farmerService.delete(farmerId);

      res.json({
        success: true,
        message: "Farmer deleted successfully",
      });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error("Delete farmer error:", error);
      throw new AppError(500, "Failed to delete farmer");
    }
  }

  async getAllFarmers(req: Request, res: Response): Promise<void> {
    try {
      const {
        page = 1,
        limit = 20,
        sortBy,
        sortOrder,
        village,
        crop,
        soilType,
      } = req.query;

      const farmers = await this.farmerService.getAll({
        page: Number(page),
        limit: Number(limit),
        sortBy: sortBy as string,
        sortOrder: sortOrder as "asc" | "desc",
        filters: {
          village: village as string,
          crop: crop as string,
          soilType: soilType as string,
        },
      });

      res.json({
        success: true,
        data: farmers,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total: farmers.length,
        },
      });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error("Get all farmers error:", error);
      throw new AppError(500, "Failed to fetch farmers");
    }
  }

  async searchFarmers(req: Request, res: Response): Promise<void> {
    try {
      const { q, limit = 10 } = req.query;

      if (!q) {
        throw new AppError(400, "Search query is required");
      }

      const farmers = await this.farmerService.search(
        q as string,
        Number(limit)
      );

      res.json({
        success: true,
        data: farmers,
        count: farmers.length,
        query: q,
        limit: Number(limit),
      });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error("Search farmers error:", error);
      throw new AppError(500, "Failed to search farmers");
    }
  }
}
