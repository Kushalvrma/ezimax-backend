import express from "express";
import { upload } from "../config/multerConfig";
import { getQuotes, postQuote } from "../controllers/quoteController";
import { deleteQuote } from "../controllers/quoteController";

const router = express.Router();

router.get("/", getQuotes);
router.post("/", upload.single("image"), postQuote);
router.delete("/:id", deleteQuote);  // Ensure the function is correctly referenced

export default router;
