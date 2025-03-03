import { prisma } from "../../lib/prisma";
import { VehicleType } from "../../types/VehicleType";
import { VehicleRepository } from "../interface/VehicleRepository";

export class VehiclePrismaRepository implements VehicleRepository {
    public async findById(id: string): Promise<VehicleType | null> {
        return await prisma.vehicle.findUnique({ where: {id} });
    }

    public async create(
        {
            color,
            model,
            ownerId,
            plate,
            type
        }: Omit<VehicleType, "id" | "createdAt" | "updatedAt">
    ): Promise<VehicleType> {

        const vehicle = await prisma.vehicle.create({
            data: {
                color,
                model,
                plate,
                type,
                owner: {connect: { id: ownerId }}

            }
        })

        return vehicle;
    }

    public async findByPlate(plate: string): Promise<VehicleType | null> {
        const vehicleFound = await prisma.vehicle.findUnique({
            where: { plate }
        });

        return vehicleFound;
    }

}
