import { Request, Response } from "express";
import { loginUserSchema } from "../../lib/zod";
import { AuthService } from "../../service/AuthService";
import { UserPrismaRepository } from "../../repository/prisma/UserPrismaRepository";

export class AuthController {
    public async execute(req: Request, res: Response) {
        const { 
            email,
            password 
        } = loginUserSchema.parse(req.body);

        const authService = new AuthService(
            new UserPrismaRepository()
        );

        const { token } = await authService.execute({
            email,
            password
        });

        res.status(200).json({ token });
    }
}