import { Router } from "express";

import { CreateUserController } from "../controller/user/CreateUserController";
import { SeeUserController } from "../controller/user/SeeUserController";

const createUserController = new CreateUserController();
const seeUserController = new SeeUserController();

const routes = Router();

routes.post("/", createUserController.execute);
routes.get("/:id", seeUserController.execute);

export default routes;
