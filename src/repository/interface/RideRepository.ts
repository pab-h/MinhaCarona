import { RideType } from "../../types/RideType";

export interface RideRepository {

    create(userData: Omit<
        RideType, 
        "id" | "createdAt" | "updatedAt"
    >): Promise<RideType>

    findById(id: string): Promise<RideType | null>

}