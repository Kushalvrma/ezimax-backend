import { DataSource } from "typeorm";
import { Service } from "../models/Service";
import { Automotive } from "../models/Automotive";
import { Quote } from "../models/Quote";

import * as dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Service, Automotive, Quote], // Explicitly reference all entities
  synchronize: true, // Ensure tables are auto-synced during development
  logging: false,
});
