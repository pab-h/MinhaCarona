import { Router } from "express";
import ensureAuthentication from "../../middleware/ensureAuthentication";
import { RideController } from "../controller/RideController";

const routes = Router();

const rideController = new RideController(); 

routes.post("/", ensureAuthentication, rideController.create);
routes.get("/", rideController.findByTravel);

export default routes;
