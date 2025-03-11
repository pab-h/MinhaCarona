import { Router } from "express";

import { UserController } from "../controller/UserController";

const userController = new UserController();

const routes = Router();

routes.post("/", userController.create);
routes.get("/:id", userController.see);

export default routes;
