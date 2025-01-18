import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import app from "./app";
import * as dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const port = process.env.PORT || 3000;

// Initialize the database and start the server
AppDataSource.initialize()
    .then(() => {
        console.log(`Database connected successfully!`);
        
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error(`Error during Data Source initialization:`, error);
    });
