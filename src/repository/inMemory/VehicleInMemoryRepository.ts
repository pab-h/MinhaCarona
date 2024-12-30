import { VehicleType } from "../../types/VehicleType";
import { VehicleRepository } from "../interface/VehicleRepository";
import { randomBytes } from "crypto";

export class VehicleInMemoryRepository implements VehicleRepository {

    public vehicles: VehicleType[];

    public constructor() {
        this.vehicles = [];
    }
    
    public async findById(id: string): Promise<VehicleType | null> {
        const vehicleFound = this.vehicles.find(vehicle => vehicle.id == id);

        if (!vehicleFound) {
            return null;
        }

        return vehicleFound;   
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

        const vehicle: VehicleType = {
            id: randomBytes(10).toString("hex"),
            color,
            model,
            plate,
            type,
            ownerId,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        this.vehicles.push(vehicle);

        return vehicle;
    }

    public async findByPlate(plate: string): Promise<VehicleType | null> {
        const vehicleFound = this.vehicles.find(vehicle => vehicle.plate == plate);

        if (!vehicleFound) {
            return null;
        }

        return vehicleFound;
    }

}
