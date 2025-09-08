import { injectable } from "tsyringe";
import { prisma } from "../infra/prismaClient";
import { Farmer } from "../domain/farmer";
import { IFarmerRepository } from "./interface";

interface GetPaginatedOptions {
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
export class FarmerRepository implements IFarmerRepository {
  async create(
    farmer: Omit<Farmer, "id" | "createdAt" | "updatedAt">
  ): Promise<Farmer> {
    return prisma.farmer.create({
      data: farmer,
    });
  }

  async findByFarmerId(farmerId: string): Promise<Farmer | null> {
    return prisma.farmer.findUnique({
      where: { farmerId },
    });
  }

  async update(
    farmerId: string,
    data: Partial<Omit<Farmer, "id" | "farmerId" | "createdAt" | "updatedAt">>
  ): Promise<Farmer> {
    return prisma.farmer.update({
      where: { farmerId },
      data,
    });
  }

  async delete(farmerId: string): Promise<void> {
    await prisma.farmer.delete({
      where: { farmerId },
    });
  }

  async findAll(): Promise<Farmer[]> {
    return prisma.farmer.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async getPaginated(options: GetPaginatedOptions): Promise<Farmer[]> {
    const {
      page,
      limit,
      sortBy = "createdAt",
      sortOrder = "desc",
      filters,
    } = options;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (filters?.village) {
      where.village = { contains: filters.village, mode: "insensitive" };
    }

    if (filters?.crop) {
      where.crops = { has: filters.crop };
    }

    if (filters?.soilType) {
      where.soilType = { contains: filters.soilType, mode: "insensitive" };
    }

    return prisma.farmer.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: limit,
    });
  }

  async search(query: string, limit: number = 10): Promise<Farmer[]> {
    return prisma.farmer.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { village: { contains: query, mode: "insensitive" } },
          { farmerId: { contains: query, mode: "insensitive" } },
        ],
      },
      take: limit,
      orderBy: { createdAt: "desc" },
    });
  }
}
