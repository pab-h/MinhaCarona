import { Request, Response } from "express";

import { createVehicleSchema } from "../../lib/zod";
import { CreateVehicleService } from "../../service/vehicle/CreateVehicleService";

import { UserPrismaRepository } from "../../repository/prisma/UserPrismaRepository";
import { VehiclePrismaRepository } from "../../repository/prisma/VehiclePrismaRepository";

export class VehicleController {
    public async create(req: Request, res: Response) {

        const ownerId = req.user.id;

        const {
            color,
            model,
            plate,
            type
        } = createVehicleSchema.parse(req.body);

        const createVehicleService = new CreateVehicleService(
            new VehiclePrismaRepository(),
            new UserPrismaRepository()
        );

        const {vehicle} = await createVehicleService.execute({
            color,
            model,
            ownerId,
            plate,
            type
        });

        res.status(201).json(vehicle);
    }
}