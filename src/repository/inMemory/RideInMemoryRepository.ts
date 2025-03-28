import { randomBytes } from "crypto";
import { RideType } from "../../types/RideType";
import { RideRepository } from "../interface/RideRepository";

export class RideInMemoryRepository implements RideRepository {

    public rides: RideType[];

    public constructor() {
        this.rides = [];
    }

    public async findByTravel(
        origin: string, 
        destination: string, 
        date: Date
    ): Promise<RideType[]> {
        return this.rides.filter(
            ride => ride.origin == origin           && 
                    ride.destination == destination && 
                    ride.date.getTime() === date.getTime()
        );
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

    public async findById(id: string): Promise<RideType | null> {
        const userFound = this.rides.find(ride => ride.id == id);

        if (!userFound) {
            return null;
        }

        return userFound;
    }

}
