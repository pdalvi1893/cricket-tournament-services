import { Router } from "express";
import playerRouter from "./playerRoutes";
import teamRouter from "./teamRoutes";
import tournamentRouter from "./tournamentRoutes";

const routes: Router[] = [
    playerRouter,
    teamRouter,
    tournamentRouter
];

export default routes;