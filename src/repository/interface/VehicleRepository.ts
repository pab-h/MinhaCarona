import { VehicleType } from "../../types/VehicleType";

export interface VehicleRepository {
    
    create(vehicleData: Omit<
        VehicleType, 
        "id" | "createdAt" | "updatedAt"
    >): Promise<VehicleType>;

    findByPlate(plate: string): Promise<VehicleType | null>;

}