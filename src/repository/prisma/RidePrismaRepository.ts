import { prisma } from "../../lib/prisma";
import { RideType } from "../../types/RideType";
import { RideRepository } from "../interface/RideRepository";

export class RidePrismaRepository implements RideRepository {
    public async create({
        date,
        destination,
        origin,
        ownerId,
        seats,
        vehicleId
    }: Omit<RideType, "id" | "createdAt" | "updatedAt">): Promise<RideType> {
        return await prisma.ride.create({
            data: {
                date,
                destination,
                origin,
                seats,
                owner: {connect: { id: ownerId }},
                vehicle: {connect: { id: vehicleId }}
            }
        });
    }
}
