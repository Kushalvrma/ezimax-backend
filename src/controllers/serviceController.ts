import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Service } from "../models/Service";

// Get all services
export const getServices = async (req: Request, res: Response) => {
    try {
        const serviceRepo = AppDataSource.getRepository(Service);
        const services = await serviceRepo.find();
        if (services.length > 0) {
            res.status(200).json({
                success: true,
                message: "Services retrieved successfully",
                data: services
            });
        } else {
            res.status(404).json({
                success: false,
                message: "No services found"
            });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: "Error retrieving services",
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

// Post a new service
export const postService = async (req: Request, res: Response) => {
    try {
        const serviceRepo = AppDataSource.getRepository(Service);
        const service = serviceRepo.create(req.body);
        const result = await serviceRepo.save(service);
        res.status(201).json({
            success: true,
            message: "Service created successfully",
            data: result
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: "Error creating service",
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
