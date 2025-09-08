import { injectable, inject } from "tsyringe";
import { FarmerRepository } from "../repositories/farmer.repository";
import { Farmer } from "../domain/farmer";
import { AppError } from "../middlewares/errorHandler";
import { IFarmerService } from "./interface";

interface GetAllOptions {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  filters?: {
    village?: string;
    crop?: string;
    soilType?: string;
  };
}

@injectable()
export class FarmerService implements IFarmerService {
  constructor(
    @inject(FarmerRepository)
    private repo: FarmerRepository
  ) {}

  async create(
    farmer: Omit<Farmer, "id" | "createdAt" | "updatedAt">
  ): Promise<Farmer> {
    try {
      // Check if farmer already exists
      const existing = await this.repo.findByFarmerId(farmer.farmerId);
      if (existing) {
        throw new AppError(
          409,
          `Farmer with ID ${farmer.farmerId} already exists`
        );
      }

      return await this.repo.create(farmer);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error("Failed to create farmer:", error);
      throw new AppError(500, "Failed to create farmer");
    }
  }

  async get(farmerId: string): Promise<Farmer | null> {
    try {
      return await this.repo.findByFarmerId(farmerId);
    } catch (error) {
      console.error("Failed to fetch farmer:", error);
      throw new AppError(500, "Failed to fetch farmer");
    }
  }

  async update(
    farmerId: string,
    data: Partial<Omit<Farmer, "id" | "farmerId" | "createdAt" | "updatedAt">>
  ): Promise<Farmer> {
    try {
      const existing = await this.repo.findByFarmerId(farmerId);
      if (!existing) {
        throw new AppError(404, `Farmer with ID ${farmerId} not found`);
      }

      return await this.repo.update(farmerId, data);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error("Failed to update farmer:", error);
      throw new AppError(500, "Failed to update farmer");
    }
  }

  async delete(farmerId: string): Promise<void> {
    try {
      const existing = await this.repo.findByFarmerId(farmerId);
      if (!existing) {
        throw new AppError(404, `Farmer with ID ${farmerId} not found`);
      }

      await this.repo.delete(farmerId);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error("Failed to delete farmer:", error);
      throw new AppError(500, "Failed to delete farmer");
    }
  }

  async getAll(options?: GetAllOptions): Promise<Farmer[]> {
    try {
      if (options) {
        return await this.repo.getPaginated(options);
      }
      return await this.repo.findAll();
    } catch (error) {
      console.error("Failed to fetch farmers:", error);
      throw new AppError(500, "Failed to fetch farmers");
    }
  }

  async search(query: string, limit: number = 10): Promise<Farmer[]> {
    try {
      return await this.repo.search(query, limit);
    } catch (error) {
      console.error("Search farmers error:", error);
      throw new AppError(500, "Failed to search farmers");
    }
  }
}
