// src/container.ts
import "reflect-metadata";
import { container } from "tsyringe";
import { ChatRepository } from "./repositories/chat.repository";
import { FarmerRepository } from "./repositories/farmer.repository";
import { ActivityRepository } from "./repositories/activity.repository";
import { ChatService } from "./services/chat.service";
import { FarmerService } from "./services/farmer.service";
import { ActivityService } from "./services/activity.service";
import {
  IChatRepository,
  IActivityRepository,
  IFarmerRepository,
} from "./repositories/interface";
import {
  IChatService,
  IFarmerService,
  IActivityService,
} from "./services/interface";

// Register interfaces to implementations
container.registerSingleton<IChatRepository>("IChatRepository", ChatRepository);
container.registerSingleton<IFarmerRepository>(
  "IFarmerRepository",
  FarmerRepository
);
container.registerSingleton<IActivityRepository>(
  "IActivityRepository",
  ActivityRepository
);
container.registerSingleton<IChatService>("IChatService", ChatService);
container.registerSingleton<IFarmerService>("IFarmerService", FarmerService);
container.registerSingleton<IActivityService>(
  "IActivityService",
  ActivityService
);

// Register repositories
container.registerSingleton("ChatRepository", ChatRepository);
container.registerSingleton("FarmerRepository", FarmerRepository);
container.registerSingleton("ActivityRepository", ActivityRepository);

// Register services
container.registerSingleton("ChatService", ChatService);
container.registerSingleton("FarmerService", FarmerService);
container.registerSingleton("ActivityService", ActivityService);

export { container };
// Now you can import `container` from this file and resolve dependencies as needed

// Example usage:
// const chatService = container.resolve(ChatService);
// const farmerService = container.resolve(FarmerService);
// const activityService = container.resolve(ActivityService);

// This setup ensures that each service and repository is a singleton and can be easily injected wherever needed in the application.
