import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Quote } from "../models/Quote";
import fs from "fs";
import path from "path";



// Get all quotes with relations
export const getQuotes = async (req: Request, res: Response) => {
    try {
        const quoteRepo = AppDataSource.getRepository(Quote);
        const quotes = await quoteRepo.find({ relations: ["service", "automotive"] });
        if (quotes.length > 0) {
            res.status(200).json({
                success: true,
                message: "Quotes retrieved successfully",
                data: quotes
            });
        } else {
            res.status(404).json({
                success: false,
                message: "No quotes found"
            });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: "Error retrieving quotes",
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

// Post a new quote
export const postQuote = async (req: Request, res: Response) => {
    try {
        const { name, email, address, city, state, phone, serviceId, automotiveId, vehicleYear, vehicleMake, vehicleModel, note } = req.body;
        const quoteRepo = AppDataSource.getRepository(Quote);

        const quote = quoteRepo.create({
            name,
            email,
            address,
            city,
            state,
            phone,
            service: { id: serviceId },
            automotive: { id: automotiveId },
            vehicleYear,
            vehicleMake,
            vehicleModel,
            note,
            imagePath: req.file?.path || "",
        });

        const result = await quoteRepo.save(quote);
        res.status(201).json({
            success: true,
            message: "Quote created successfully",
            data: result
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: "Error creating quote",
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

export const deleteQuote = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params; // Get the quote ID from the request parameters
        const quoteRepo = AppDataSource.getRepository(Quote);

        // Find the quote by ID
        const quote = await quoteRepo.findOne({ where: { id: parseInt(id) } });

        if (!quote) {
            return res.status(404).json({
                success: false,
                message: "Quote not found",
            });
        }

        // Delete the quote from the database
        await quoteRepo.remove(quote);

        // Respond with success
        return res.status(200).json({
            success: true,
            message: "Quote deleted successfully",
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({
                success: false,
                message: "Error deleting quote",
                error: error.message,
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "An unknown error occurred",
            });
        }
    }
};



