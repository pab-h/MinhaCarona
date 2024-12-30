import { randomBytes } from "crypto";
import { RideType } from "../../types/RideType";
import { RideRepository } from "../interface/RideRepository";

export class RideInMemoryRepository implements RideRepository {

    public rides: RideType[];

    public constructor() {
        this.rides = [];
    }

    public async create({
        date,
        destination,
        origin,
        ownerId,
        seats,
        vehicleId
    }: Omit<RideType, "id" | "createdAt" | "updatedAt">): Promise<RideType> {
        const ride: RideType = {
                id: randomBytes(7).toString("hex"),
                date,
                destination,
                origin,
                seats,
                ownerId,
                vehicleId,
                createdAt: new Date(),
                updatedAt: new Date()
        };

        this.rides.push(ride);

        return ride;
    }

}
