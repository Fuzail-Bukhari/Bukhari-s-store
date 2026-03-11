import express from "express";
import {
  createOrder, getMyOrders, getAllOrders, updateOrderDelivered
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/", protect, admin, getAllOrders);
router.put("/:id/deliver", protect, admin, updateOrderDelivered);

export default router;