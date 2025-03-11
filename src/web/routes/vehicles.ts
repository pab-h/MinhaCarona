import { Router } from "express";
import ensureAuthentication from "../../middleware/ensureAuthentication"
import { VehicleController } from "../controller/VehicleController";

const routes = Router();

const vehicleController = new VehicleController();

routes.use(ensureAuthentication);

routes.post("/", vehicleController.create);

export default routes;
