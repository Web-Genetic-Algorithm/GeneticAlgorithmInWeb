import express from "express";
import { handlePostRequest, handleGetResult } from "./controller.js";

const router = express.Router();

router.post("/optimize", handlePostRequest);
router.get("/optimize/result/:jobId", handleGetResult);

export default router;
