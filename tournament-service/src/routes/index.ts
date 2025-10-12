import { Router } from "express";
import playerRouter from "./playerRoutes";
import teamRouter from "./teamRoutes";
import tournamentRouter from "./tournamentRoutes";
import lookupRouter from "./lookupRoutes";

const routes: Router[] = [
    playerRouter,
    teamRouter,
    tournamentRouter,
    lookupRouter,
];

export default routes;