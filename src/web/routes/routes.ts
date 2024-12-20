import { Router } from 'express';
import {handlerError} from "../../middleware/ErrorHandler"

import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../../docs"

import UsersRoutes from "./users";
import AuthRoutes from "./auth";

const routes = Router();

routes.use(
    "/docs", 
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocs)
);

routes.use("/users", UsersRoutes);
routes.use("/auth", AuthRoutes);

routes.use(handlerError);

export { routes };
