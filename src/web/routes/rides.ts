import { Router } from "express";
import ensureAuthentication from "../../middleware/ensureAuthentication";
import { CreateRideController } from "../controller/ride/CreateRideController";

const routes = Router();

const createRideController = new CreateRideController(); 

routes.use(ensureAuthentication);

routes.post("/:id", createRideController.execute);

export default routes;
