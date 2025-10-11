import express, { Request, Response } from "express";
import { Player } from "../database";
import config from "../config/config";
import { IPlayer } from "../database";
import { ApiError } from "../utils";
import playerService from "../services/PlayerService";


const fetchPlayers = async (req: Request, res: Response) => {
    try {
        const players = await playerService.fetchPlayers();

        return res.json({
            status: 200,
            message: "Players fetched successfully!",
            data: players,
        });
    } catch (error: any) {
        return res.json({
            status: 500,
            message: error.message,
        });
    }
};

const addPlayer = async (req: Request, res: Response) => {
    try {
        const { name, order, team } = req.body;

        const player = await playerService.addPlayer({
            name,
            order,
            team,
        });

        return res.json({
            status: 200,
            message: "Player added successfully!",
            data: player,
        });
    } catch (error: any) {
        return res.json({
            status: 500,
            message: error.message,
        });
    }
};

export default {
    fetchPlayers,
    addPlayer,
};