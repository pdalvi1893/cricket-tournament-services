import { Router } from "express";
import LookupController from "../controllers/LookupController";
import { authMiddleware } from "../middleware";

const lookupRouter = Router();

// @ts-ignore
lookupRouter.get("/lookups", authMiddleware, LookupController.fetchItems);
lookupRouter.post(
    "/add-item", 
    // @ts-ignore
    authMiddleware, 
    LookupController.addItem
);

export default lookupRouter;