import { Router } from "express";
import PlayerController from "../controllers/PlayerController";

const playerRouter = Router();

playerRouter.get("/players", PlayerController.fetchPlayers);
playerRouter.post("/add-player", PlayerController.addPlayer);

export default playerRouter;