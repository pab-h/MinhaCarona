import { RideType } from "../../types/RideType";
import { TravelType } from "../../types/RideType";

export interface RideRepository {

    create(userData: Omit<
        RideType, 
        "id" | "createdAt" | "updatedAt"
    >): Promise<RideType>

    findById(id: string): Promise<RideType | null>;
    
    findByTravel(
        origin: string, 
        destination: string,
        date: Date
    ): Promise<RideType[]>;

    findFrequentTravels(): Promise<TravelType[]>;

}