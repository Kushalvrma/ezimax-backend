import express from "express";
import bodyParser from "body-parser";
import { AppDataSource } from "./config/data-source";
import serviceRoutes from "./routes/serviceRoutes";
import automotiveRoutes from "./routes/automotiveRoutes";
import quoteRoutes from "./routes/quoteRoutes";

const app = express();

app.use(bodyParser.json());
app.use("/uploads", express.static("src/uploads")); // Serve images
app.use("/services", serviceRoutes);
app.use("/automotives", automotiveRoutes);
app.use("/quotes", quoteRoutes);

export default app;
