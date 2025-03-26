import { Router } from "express";
import ensureAuthentication from "../../middleware/ensureAuthentication";
import { ReservationController } from "../controller/ReservationController";

const routes = Router();

const reservationController = new ReservationController(); 

routes.use(ensureAuthentication);

routes.post("/:id", reservationController.create);
routes.put("/:id", reservationController.update);

export default routes;
