import express from "express"
import { authController } from "../controller/auth.controller.js"

const router = express.Router()

router.post('/validate-key', authController.validateKey)
router.post('/validate-admin', authController.validateAdminKey)

export const authRouter = router