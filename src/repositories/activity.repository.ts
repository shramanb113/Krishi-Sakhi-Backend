import { injectable } from "tsyringe";
import { prisma } from "../infra/prismaClient";
import { Activity } from "../domain/activity";
import { IActivityRepository } from "./interface";

@injectable()
export class ActivityRepository implements IActivityRepository {
  async create(
    activity: Omit<Activity, "id" | "createdAt" | "updatedAt">
  ): Promise<Activity> {
    return prisma.activity.create({
      data: activity,
    });
  }

  async findByFarmerId(
    farmerId: string,
    limit: number = 20
  ): Promise<Activity[]> {
    return prisma.activity.findMany({
      where: { farmerId },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }

  async findRecent(limit: number = 50): Promise<Activity[]> {
    return prisma.activity.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }

  async deleteById(activityId: string): Promise<void> {
    await prisma.activity.delete({
      where: { id: activityId },
    });
  }

  async findByType(farmerId: string, type: string): Promise<Activity[]> {
    return prisma.activity.findMany({
      where: { farmerId, type },
      orderBy: { createdAt: "desc" },
    });
  }

  async findByDateRange(
    farmerId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Activity[]> {
    return prisma.activity.findMany({
      where: {
        farmerId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }
}
