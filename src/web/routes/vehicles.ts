import { Router } from "express";
import { CreateVehicleController } from "../controller/vehicle/CreateVehicleController";
import ensureAuthentication from "../../middleware/ensureAuthentication"

const routes = Router();

const createVehicleController = new CreateVehicleController();

routes.use(ensureAuthentication);

routes.post("/",createVehicleController.execute);

export default routes;
