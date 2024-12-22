import { Router } from 'express';
import {handlerError} from "../../middleware/ErrorHandler"

import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../../docs"

import usersRoutes from "./users";
import authRoutes from "./auth";
import vehiclesRoutes from './vehicles';

const routes = Router();

routes.use(
    "/docs", 
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocs)
);

routes.use("/users", usersRoutes);
routes.use("/auth", authRoutes);
routes.use("/vehicles", vehiclesRoutes);

routes.use(handlerError);

export { routes };
