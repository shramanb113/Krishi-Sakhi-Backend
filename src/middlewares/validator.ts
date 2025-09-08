// src/middlewares/validator.ts
import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { AppError } from "./errorHandler";

export const validateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.parse(req.body);
      req.body = result; // Use validated and transformed data
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(error);
      } else {
        next(new AppError(500, "Unexpected validation error"));
      }
    }
  };
};

export const validateQuery = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.parse(req.query);
      req.query = result; // Use validated and transformed query params
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(error);
      } else {
        next(new AppError(500, "Unexpected validation error"));
      }
    }
  };
};

export const validateParams = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.parse(req.params);
      req.params = result; // Use validated and transformed params
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(error);
      } else {
        next(new AppError(500, "Unexpected validation error"));
      }
    }
  };
};

// Request body schemas
export const farmerSchema = z.object({
  farmerId: z
    .string()
    .min(1, "Farmer ID is required")
    .max(50, "Farmer ID too long"),
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  phone: z
    .string()
    .regex(/^[0-9+\-\s()]{10,15}$/, "Invalid phone number")
    .optional()
    .or(z.literal("")),
  village: z
    .string()
    .max(100, "Village name too long")
    .optional()
    .or(z.literal("")),
  lat: z.number().min(-90).max(90).optional().nullable(),
  lon: z.number().min(-180).max(180).optional().nullable(),
  landSizeHectares: z.number().min(0).max(1000).optional().nullable(),
  crops: z.array(z.string().max(50)).default([]),
  soilType: z.string().max(50).optional().or(z.literal("")),
  irrigation: z.string().max(50).optional().or(z.literal("")),
  language: z.string().default("ml"),
});

export const activitySchema = z.object({
  farmerId: z.string().min(1, "Farmer ID is required"),
  type: z.string().min(1, "Activity type is required").max(50, "Type too long"),
  details: z
    .string()
    .min(1, "Details are required")
    .max(1000, "Details too long"),
});

export const chatSchema = z.object({
  message: z
    .string()
    .min(1, "Message is required")
    .max(1000, "Message too long"),
});

// URL parameter schemas
export const farmerParamsSchema = z.object({
  farmerId: z.string().min(1, "Farmer ID is required"),
});

export const userParamsSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});

export const activityParamsSchema = z.object({
  activityId: z.string().uuid("Invalid activity ID"),
});

export const typeParamsSchema = z.object({
  farmerId: z.string().min(1, "Farmer ID is required"),
  type: z.string().min(1, "Type is required"),
});

export const chatParamsSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});

// Base pagination schema (reusable)
export const paginationQuerySchema = z.object({
  page: z
    .string()
    .regex(/^\d+$/, "Page must be a number")
    .transform(Number)
    .default("1")
    .optional(),
  limit: z
    .string()
    .regex(/^\d+$/, "Limit must be a number")
    .transform(Number)
    .default("20")
    .optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc").optional(),
});

// Activity-specific query schema
export const activitiesQuerySchema = paginationQuerySchema.extend({
  type: z.string().optional(),
  startDate: z.string().datetime({ offset: true }).optional(),
  endDate: z.string().datetime({ offset: true }).optional(),
});

// Farmer list query schema (for GET /farmers)
export const farmersListQuerySchema = paginationQuerySchema.extend({
  village: z.string().optional(),
  crop: z.string().optional(),
  soilType: z.string().optional(),
});

// Farmer search query schema (for GET /farmers/search)
export const farmersSearchQuerySchema = z.object({
  q: z
    .string()
    .min(1, "Search query is required")
    .max(100, "Search query too long"),
  limit: z
    .string()
    .regex(/^\d+$/, "Limit must be a number")
    .transform(Number)
    .default("10")
    .optional(),
});

// Generic search query schema
export const searchQuerySchema = z.object({
  q: z
    .string()
    .min(1, "Search query is required")
    .max(100, "Search query too long"),
  limit: z
    .string()
    .regex(/^\d+$/, "Limit must be a number")
    .transform(Number)
    .default("10")
    .optional(),
});

// Combined schemas for common use cases (keep this for backward compatibility if needed)
export const paramsSchema = z.object({
  farmerId: z.string().min(1, "Farmer ID is required"),
  userId: z.string().min(1, "User ID is required"),
  activityId: z.string().uuid("Invalid activity ID"),
});
