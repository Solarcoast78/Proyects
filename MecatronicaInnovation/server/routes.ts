import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertReviewSchema, insertCollaborationRequestSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes for reviews
  app.post("/api/reviews", async (req, res) => {
    try {
      const reviewData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(reviewData);
      res.json(review);
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(400).json({ error: "Invalid review data" });
    }
  });

  app.get("/api/reviews/:challengeType", async (req, res) => {
    try {
      const { challengeType } = req.params;
      const reviews = await storage.getReviewsByChallenge(challengeType);
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  // API Routes for collaboration requests
  app.post("/api/collaboration", async (req, res) => {
    try {
      const requestData = insertCollaborationRequestSchema.parse(req.body);
      const collaborationRequest = await storage.createCollaborationRequest(requestData);
      res.json(collaborationRequest);
    } catch (error) {
      console.error("Error creating collaboration request:", error);
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
