import { Router } from "express";
import LookupController from "../controllers/LookupController";

const lookupRouter = Router();

lookupRouter.get("/lookups", LookupController.fetchItems);
lookupRouter.post("/add-item", LookupController.addItem);

export default lookupRouter;