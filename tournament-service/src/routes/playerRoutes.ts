import { Router } from "express";
import PlayerController from "../controllers/PlayerController";
import { authMiddleware } from "../middleware";

const playerRouter = Router();

// @ts-ignore
playerRouter.get("/players", authMiddleware, PlayerController.fetchPlayers);
playerRouter.post(
    "/add-player", 
    // @ts-ignore
    authMiddleware, 
    PlayerController.addPlayer
);

export default playerRouter;