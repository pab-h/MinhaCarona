import { Request, Response } from "express";
import { createUserSchema } from "../../../lib/zod";
import { CreateUserService } from "../../../service/user/CreateUserService";
import { UserPrismaRepository } from "../../../repository/prisma/UserPrismaRepository";

export class CreateUserController {
    public async execute(req: Request, res: Response) {
        const {
            email,
            name,
            password: password
        } = createUserSchema.parse(req.body);

        const createUserService = new CreateUserService(
            new UserPrismaRepository()
        );

        const {user} = await createUserService.execute({
            email,
            name,
            password
        });

        res.status(200).json(user);
    }
}