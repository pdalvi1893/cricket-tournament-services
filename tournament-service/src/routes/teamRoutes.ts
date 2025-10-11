import { Router } from "express";
import TeamController from "../controllers/TeamController";

const teamRouter = Router();

teamRouter.get("/teams", TeamController.fetchTeams);
teamRouter.post("/add-team", TeamController.addTeam);

export default teamRouter;