// src/server.ts
import "reflect-metadata";
import "./config/env";
import app from "./app";
import { prisma, disconnectPrisma } from "./infra/prismaClient";
import { ENV } from "./config/env";

const PORT = ENV.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`
🚀 Krishi Sakhi Backend Server Started!
📍 Port: ${PORT}
🌍 Environment: ${ENV.NODE_ENV}
📊 Log Level: ${ENV.LOG_LEVEL}
🗄️  Database: ${prisma ? "Connected" : "Disconnected"}
⏰ Started at: ${new Date().toISOString()}
  `);
});

// Graceful shutdown
const gracefulShutdown = async (signal: string) => {
  console.log(`\n📶 Received ${signal}, shutting down gracefully...`);

  server.close(async () => {
    console.log("🌐 HTTP server closed");

    try {
      await disconnectPrisma();
      console.log("🗄️  Database connection closed");
    } catch (error) {
      console.error("Error closing database connection:", error);
    }

    console.log("👋 Process terminated gracefully");
    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error(
      "⏰ Could not close connections in time, forcefully shutting down"
    );
    process.exit(1);
  }, 10000);
};

// Signal handlers
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

// Error handlers
process.on("uncaughtException", (error) => {
  console.error("💥 Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("💥 Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// Handle cleanup on exit
process.on("exit", (code) => {
  console.log(`Process exiting with code: ${code}`);
});
