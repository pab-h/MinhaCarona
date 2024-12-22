import { Router } from "express";

import { CreateUserController } from "../controller/user/CreateUserController";
import { SeeUserController } from "../controller/user/SeeUserController";
import ensureAuthentication from "../../middleware/ensureAuthentication";

const createUserController = new CreateUserController();
const seeUserController = new SeeUserController();

const routes = Router();

routes.post("/", createUserController.execute);
routes.get("/:id", ensureAuthentication, seeUserController.execute);

export default routes;
