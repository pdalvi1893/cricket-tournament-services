import express, { Request, Response } from "express";
import { Team } from "../database";
import config from "../config/config";
import { ITeam } from "../database";
import { ApiError } from "../utils";
import teamService from "../services/TeamService";

const fetchTeams = async (req: Request, res: Response) => {
    try {
        const teams = await teamService.fetchTeams();

        return res.json({
            status: 200,
            message: "Teams fetched successfully!",
            data: teams,
        });
    } catch (error: any) {
        return res.json({
            status: 500,
            message: error.message,
        });
    }
};

const addTeam = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;


        const team = await teamService.addTeam({
            name,
        });

        return res.json({
            status: 200,
            message: "User registered successfully!",
            data: team,
        });
    } catch (error: any) {
        return res.json({
            status: 500,
            message: error.message,
        });
    }
};

export default {
    fetchTeams,
    addTeam,
};