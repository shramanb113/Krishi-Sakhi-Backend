// src/routes/index.ts (updated with proper query validation)
import { Router } from "express";
import { ChatController } from "../controllers/chat.controller";
import { FarmerController } from "../controllers/farmer.controller";
import { ActivityController } from "../controllers/activity.controller";
import { HealthController } from "../controllers/health.controller";
import {
  validateRequest,
  validateQuery,
  validateParams,
  farmerSchema,
  activitySchema,
  chatSchema,
  farmerParamsSchema,
  userParamsSchema,
  activityParamsSchema,
  chatParamsSchema,
  paginationQuerySchema,
  activitiesQuerySchema,
  farmersListQuerySchema,
  farmersSearchQuerySchema,
  searchQuerySchema,
  typeParamsSchema,
} from "../middlewares/validator";
import z from "zod";

const router = Router();
const chatController = new ChatController();
const farmerController = new FarmerController();
const activityController = new ActivityController();

// Health routes
router.get("/health", HealthController.check);
router.get("/health/ready", HealthController.readiness);
router.get("/health/live", HealthController.liveness);

// Farmer routes
router.post(
  "/farmers",
  validateRequest(farmerSchema),
  farmerController.createFarmer.bind(farmerController)
);
router.get(
  "/farmers",
  validateQuery(farmersListQuerySchema),
  farmerController.getAllFarmers.bind(farmerController)
);
router.get(
  "/farmers/search",
  validateQuery(farmersSearchQuerySchema),
  farmerController.searchFarmers.bind(farmerController)
);
router.get(
  "/farmers/:farmerId",
  validateParams(farmerParamsSchema),
  farmerController.getFarmer.bind(farmerController)
);
router.put(
  "/farmers/:farmerId",
  validateParams(farmerParamsSchema),
  validateRequest(farmerSchema.partial()),
  farmerController.updateFarmer.bind(farmerController)
);
router.delete(
  "/farmers/:farmerId",
  validateParams(farmerParamsSchema),
  farmerController.deleteFarmer.bind(farmerController)
);

// Activity routes
router.post(
  "/activities",
  validateRequest(activitySchema),
  activityController.createActivity.bind(activityController)
);
router.get(
  "/activities/farmer/:farmerId",
  validateParams(farmerParamsSchema),
  activityController.getActivitiesByFarmerId.bind(activityController)
);
router.get(
  "/activities",
  activityController.getRecentActivities.bind(activityController)
);
router.delete(
  "/activities/:activityId",
  validateParams(activityParamsSchema),
  activityController.deleteActivity.bind(activityController)
);
router.get(
  "/activities/farmer/:farmerId/type/:type",
  validateParams(typeParamsSchema),
  activityController.getActivitiesByType.bind(activityController)
);

// Chat routes
router.post(
  "/chat/:userId",
  validateParams(chatParamsSchema),
  validateRequest(chatSchema),
  chatController.sendMessage.bind(chatController)
);
router.delete(
  "/chat/:userId/history",
  validateParams(chatParamsSchema),
  chatController.clearChatHistory.bind(chatController)
);
router.get(
  "/chat/:userId/history",
  validateParams(chatParamsSchema),
  validateQuery(
    z.object({
      limit: z
        .string()
        .regex(/^\d+$/)
        .transform(Number)
        .default("10")
        .optional(),
    })
  ),
  chatController.getChatHistory.bind(chatController)
);

// 404 handler for API routes
router.use("*", (req, res) => {
  res.status(404).json({
    error: "API endpoint not found",
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
  });
});

export default router;
