import { Router } from "express";
import ensureAuthentication from "../../middleware/ensureAuthentication";
import { RideController } from "../controller/RideController";

const routes = Router();

const rideController = new RideController(); 

routes.use(ensureAuthentication);

routes.post("/", rideController.create);

export default routes;
