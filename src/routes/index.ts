import { Router } from "express";
import { ChatController } from "../controllers/chat.controller";
import { FarmerController } from "../controllers/farmer.controller";
import { ActivityController } from "../controllers/activity.controller";
import { HealthController } from "../controllers/health.controller";

const router = Router();
const chatController = new ChatController();
const farmerController = new FarmerController();
const activityController = new ActivityController();

// Health
router.get("/health", HealthController.check);

// Farmer
router.post("/farmers", farmerController.createFarmer.bind(farmerController));
router.get(
  "/farmers/:farmerId",
  farmerController.getFarmer.bind(farmerController)
);

// Activities
router.post(
  "/activities",
  activityController.logActivity.bind(activityController)
);
router.get(
  "/activities/:farmerId",
  activityController.getActivities.bind(activityController)
);

// Chat
router.post("/chat/:userId", chatController.sendMessage.bind(chatController));

export default router;
