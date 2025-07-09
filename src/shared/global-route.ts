import { Router } from "express";

import authRoutes from "@/modules/auth/presentation/auth.routes";
import { accessTokenGuard } from "./guards/isAuthenticated";

const router = Router();

router.use("/auth", authRoutes);

// Health check
router.get("/check-health", accessTokenGuard, (req, res) => {
  res.json({ message: "OK" });
});

export default router;
