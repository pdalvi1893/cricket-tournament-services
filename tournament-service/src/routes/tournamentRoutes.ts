import { Router } from "express";
import TournamentController from "../controllers/TournamentController";
import { authMiddleware } from "../middleware";

const tournamentRouter = Router();

// @ts-ignore
tournamentRouter.get("/start-match", TournamentController.startMatch);
tournamentRouter.post(
    "/get-challenge-outcome",
    // @ts-ignore
    authMiddleware,
    TournamentController.getChallengeOutcome
);

export default tournamentRouter;
