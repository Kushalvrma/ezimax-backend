import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Automotive } from "../models/Automotive";

// Get all automotives
export const getAutomotives = async (req: Request, res: Response) => {
    try {
        const automotiveRepo = AppDataSource.getRepository(Automotive);
        const automotives = await automotiveRepo.find();
        if (automotives.length > 0) {
            res.status(200).json({
                success: true,
                message: "Automotives retrieved successfully",
                data: automotives
            });
        } else {
            res.status(404).json({
                success: false,
                message: "No automotives found"
            });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: "Error retrieving automotives",
                error: error.message
            });
        } else {
            res.status(500).json({
                success: false,
                message: "An unknown error occurred"
            });
        }
    }
};

// Post a new automotive
export const postAutomotive = async (req: Request, res: Response) => {
    try {
        const automotiveRepo = AppDataSource.getRepository(Automotive);
        const automotive = automotiveRepo.create(req.body);
        const result = await automotiveRepo.save(automotive);
        res.status(201).json({
            success: true,
            message: "Automotive created successfully",
            data: result
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: "Error creating automotive",
                error: error.message
            });
        } else {
            res.status(500).json({
                success: false,
                message: "An unknown error occurred"
            });
        }
    }
};
