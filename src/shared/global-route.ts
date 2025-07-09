import { Router } from "express";

import authRoutes from "@/modules/auth/presentation/auth.routes";
import { isAuthenticated } from "./guards/isAuthenticated";

const router = Router();

router.use("/auth", authRoutes);

// Health check
router.get("/check-health", isAuthenticated, (req, res) => {
  res.json({ message: "OK" });
});

export default router;
