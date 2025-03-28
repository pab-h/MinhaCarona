import { Request, Response } from "express";

import { CreateRideService } from "../../service/ride/CreateRideService";
import { FindByTravelRideService } from "../../service/ride/FindByTravelRideService";

import { RidePrismaRepository } from "../../repository/prisma/RidePrismaRepository";
import { UserPrismaRepository } from "../../repository/prisma/UserPrismaRepository";
import { VehiclePrismaRepository } from "../../repository/prisma/VehiclePrismaRepository";

import { createRideSchema } from "../../lib/zod";
import { findRideByTravelSchema } from "../../lib/zod";

export class RideController {

    public async findByTravel(req: Request, res: Response) {
        const {
            date,
            destination,
            origin
        } = findRideByTravelSchema.parse(req.body);

        const findByTravelService = new FindByTravelRideService(
            new RidePrismaRepository()
        );

        const { rides } = await findByTravelService.execute({
            date,
            destination,
            origin
        });

        res.status(200).json(rides);
    }

    public async create(req: Request, res: Response) {
        const ownerId = req.user.id;

        const {
            date,
            destination,
            origin,
            seats,
            vehicleId
        } = createRideSchema.parse(req.body);

        const createService = new CreateRideService(
            new RidePrismaRepository(),
            new UserPrismaRepository(),
            new VehiclePrismaRepository()
        );

        const {ride} = await createService.execute({
            date,
            destination,
            origin,
            ownerId,
            seats,
            vehicleId
        });

        res.status(201).json(ride);
    }
}