import express, { Request, Response } from "express";
import tournamentService from "../services/TournamentService";

const getChallengeOutcome = async (req: Request, res: Response) => {
    try {

        const commentary = await tournamentService.getChallengeOutcome(req.body);

        return res.json({
            status: 200,
            message: "Commentary!",
            data: commentary,
        });
    } catch (error: any) {
        return res.json({
            status: 500,
            message: error.message,
        });
    }
};

const startMatch = async (req: Request, res: Response) => {
    try {
        const match = await tournamentService.startMatch();

        return res.json({
            status: 200,
            message: "Match started successfully!",
            data: match,
        });
    } catch (error: any) {
        return res.json({
            status: 500,
            message: error.message,
        });
    }
};

export default {
    getChallengeOutcome,
    startMatch,
};