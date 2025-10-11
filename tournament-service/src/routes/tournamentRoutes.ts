import { Router } from "express";
import TournamentController from "../controllers/TournamentController";

const userRouter = Router();

userRouter.post("/watch", TournamentController.login);

export default userRouter;
