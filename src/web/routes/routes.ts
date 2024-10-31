import { Router } from 'express';
import {handlerError} from "../../middleware/ErrorHandler"

import UsersRoutes from "./users";

const routes = Router();

routes.use("/users", UsersRoutes);

routes.use(handlerError);

export { routes };
