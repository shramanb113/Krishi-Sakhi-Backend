// src/controllers/health.controller.ts
import { Request, Response } from "express";
import { prisma } from "../infra/prismaClient";

export class HealthController {
  static async check(req: Request, res: Response): Promise<void> {
    try {
      // Check database connection
      await prisma.$queryRaw`SELECT 1`;

      res.json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        database: "connected",
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        environment: process.env.NODE_ENV,
      });
    } catch (error) {
      res.status(503).json({
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        database: "disconnected",
        error: "Database connection failed",
      });
    }
  }

  static async readiness(req: Request, res: Response): Promise<void> {
    try {
      // Check if all services are ready
      await prisma.$queryRaw`SELECT 1`;

      res.json({
        status: "ready",
        timestamp: new Date().toISOString(),
        services: {
          database: true,
          // Add other services here as needed
        },
      });
    } catch (error) {
      res.status(503).json({
        status: "not_ready",
        timestamp: new Date().toISOString(),
        services: {
          database: false,
        },
        error: "Service not ready",
      });
    }
  }

  static liveness(req: Request, res: Response): void {
    res.json({
      status: "alive",
      timestamp: new Date().toISOString(),
    });
  }
}
