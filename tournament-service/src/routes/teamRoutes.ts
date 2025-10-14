import { Router } from "express";
import TeamController from "../controllers/TeamController";
import { authMiddleware } from "../middleware";

const teamRouter = Router();

// @ts-ignore
teamRouter.get("/teams", TeamController.fetchTeams);
teamRouter.post(
    "/add-team",
    // @ts-ignore
    authMiddleware,
    TeamController.addTeam
);

export default teamRouter;