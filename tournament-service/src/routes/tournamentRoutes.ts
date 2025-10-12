import { Router } from "express";
import TournamentController from "../controllers/TournamentController";

const tournamentRouter = Router();

tournamentRouter.get("/start-match", TournamentController.startMatch);
tournamentRouter.post("/get-challenge-outcome", TournamentController.getChallengeOutcome);

export default tournamentRouter;
