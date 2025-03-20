import { Request, Response } from "express";

import { CreateReservationService } from "../../service/reservation/CreateReservationService";

import { ReservationPrismaRepository } from "../../repository/prisma/ReservationPrismaRepository";
import { UserPrismaRepository } from "../../repository/prisma/UserPrismaRepository";
import { RidePrismaRepository } from "../../repository/prisma/RidePrismaRepository";
import { idSchema } from "../../lib/zod";

export class ReservationController {
    public async create(req: Request, res: Response) {

        const ownerId = req.user.id;
        const { id: rideId}  = idSchema.parse(req.params);

        const createService = new CreateReservationService(
            new ReservationPrismaRepository(),
            new UserPrismaRepository(),
            new RidePrismaRepository()
        );

        const { reservation } = await createService.execute({
            ownerId,
            rideId
        });

        res.status(201).json(reservation);

    }
}