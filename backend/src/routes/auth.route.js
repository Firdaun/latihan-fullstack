// src/routes/auth.route.js
import express from "express";
import { authController } from "../controller/auth.controller.js";

const router = express.Router();

router.post('/validate-key', authController.validateKey);

export const authRouter = router;