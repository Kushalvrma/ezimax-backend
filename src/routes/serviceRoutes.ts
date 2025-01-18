import express from "express";
import { getServices, postService } from "../controllers/serviceController";

const router = express.Router();

router.get("/", getServices);
router.post("/", postService);

export default router;
