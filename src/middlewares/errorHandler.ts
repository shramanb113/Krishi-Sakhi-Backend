// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational = true
  ) {
    super(message);
    this.name = "AppError";

    // Capture stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let details: any = undefined;

  // Log error
  console.error("Error:", {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
    ip: req.ip,
    userAgent: req.get("User-Agent"),
  });

  // Handle specific error types
  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation Failed";
    details = err.errors.map((error) => ({
      field: error.path.join("."),
      message: error.message,
      code: error.code,
    }));
  } else if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation Error";
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  } else if (err.code === "P2002") {
    statusCode = 409;
    message = "Duplicate entry found";
  } else if (err.code === "P2025") {
    statusCode = 404;
    message = "Record not found";
  }

  // Don't leak error details in production for 500 errors
  if (process.env.NODE_ENV === "production" && statusCode === 500) {
    message = "Internal Server Error";
    details = undefined;
  }

  const response: any = {
    error: message,
    timestamp: new Date().toISOString(),
  };

  // Add details if they exist (for validation errors, etc.)
  if (details) {
    response.details = details;
  }

  // Add stack trace in development
  if (process.env.NODE_ENV === "development" && statusCode === 500) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
}
