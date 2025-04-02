import { randomBytes } from "crypto";
import { RideType, TravelType } from "../../types/RideType";
import { RideRepository } from "../interface/RideRepository";

export class RideInMemoryRepository implements RideRepository {

    public rides: RideType[];

    public constructor() {
        this.rides = [];
    }

    public async findFrequentTravels(): Promise<TravelType[]> {
        
        const travelCountMap = new Map<string, number>();

        for (const ride of this.rides) {
            const key = `${ride.origin}->${ride.destination}`;

            travelCountMap.set(
                key,
                (travelCountMap.get(key) || 0) + 1
            );
        }

        const travelFrequencies: (TravelType & { count: number })[] = [];

        travelCountMap.forEach((count, key) => {
            const [ origin, destination ] = key.split("->");
            
            travelFrequencies.push({
                origin,
                destination,
                count
            });
        });


        const sortedTravels = travelFrequencies
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);

        return sortedTravels.map(travel => {
            return {
                destination: travel.destination,
                origin:      travel.origin
            }
        });

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
