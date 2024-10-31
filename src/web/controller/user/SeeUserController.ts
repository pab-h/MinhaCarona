import { Request, Response } from "express";
import { idSchema } from "../../../lib/zod";
import { SeeUserService } from "../../../service/user/SeeUserService";
import { UserPrismaRepository } from "../../../repository/prisma/UserPrismaRepository";

export class SeeUserController {
    public async execute(req: Request, res: Response) {
        const {id} = idSchema.parse(req.params);

        const seeUserService = new SeeUserService(
            new UserPrismaRepository()
        );

        const {user} = await seeUserService.execute({id});

        res.status(200).json(user);
    }
}