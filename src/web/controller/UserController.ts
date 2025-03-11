import { Request, Response } from "express";
import { createUserSchema, idSchema } from "../../lib/zod";
import { CreateUserService } from "../../service/user/CreateUserService";
import { UserPrismaRepository } from "../../repository/prisma/UserPrismaRepository";
import { SeeUserService } from "../../service/user/SeeUserService";

export class UserController {

    public async see(req: Request, res: Response) {
        const {id} = idSchema.parse(req.params);

        const seeUserService = new SeeUserService(
            new UserPrismaRepository()
        );

        const {user} = await seeUserService.execute({id});

        res.status(200).json(user);
    }

    public async create(req: Request, res: Response) {
        const {
            email,
            name,
            password
        } = createUserSchema.parse(req.body);

        const createUserService = new CreateUserService(
            new UserPrismaRepository()
        );

        const {user} = await createUserService.execute({
            email,
            name,
            password
        });

        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    }
}