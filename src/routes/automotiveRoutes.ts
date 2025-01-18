import express from "express";
import { getAutomotives, postAutomotive } from "../controllers/automotiveController";

const router = express.Router();

router.get("/", getAutomotives);
router.post("/", postAutomotive);

export default router;
