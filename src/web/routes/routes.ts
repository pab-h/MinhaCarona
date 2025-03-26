import { Router } from 'express';
import {handlerError} from "../../middleware/ErrorHandler"

import usersRoutes from "./users";
import authRoutes from "./auth";
import vehiclesRoutes from './vehicles';
import ridesRoutes from './rides';
import reservationsRoutes from "./reservations";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/auth", authRoutes);
routes.use("/vehicles", vehiclesRoutes);
routes.use("/rides", ridesRoutes);
routes.use("/reservations", reservationsRoutes);

routes.use(handlerError);

export { routes };
