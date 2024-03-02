import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middlewares/protectRoute.js";
const router = express.Router();

router.get("/:id", protectRoute, getMessages); // id is the user's id of the reciever
router.post("/send/:id", protectRoute, sendMessage); // id is the user's id of the reciever

export default router;
