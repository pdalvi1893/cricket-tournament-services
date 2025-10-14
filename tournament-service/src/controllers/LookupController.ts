import { Request, Response } from "express";
import { Player } from "../database";
import config from "../config/config";
import { IPlayer } from "../database";
import { ApiError } from "../utils";
import { AuthRequest } from "../middleware";
import lookupService from "../services/LookupService";


const fetchItems = async (req: AuthRequest, res: Response) => {
    try {
        const items = await lookupService.fetchItems(req.query);

        return res.json({
            status: 200,
            message: "Players fetched successfully!",
            data: items,
        });
    } catch (error: any) {
        return res.json({
            status: 500,
            message: error.message,
        });
    }
};

const addItem = async (req: AuthRequest, res: Response) => {
    try {
        const item = await lookupService.addItem(req.body);

        return res.json({
            status: 200,
            message: "Item added successfully!",
            data: item,
        });
    } catch (error: any) {
        return res.json({
            status: 500,
            message: error.message,
        });
    }
};

export default {
    fetchItems,
    addItem,
};