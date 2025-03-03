import { VehicleType } from "../../types/VehicleType";
import { ArgumentNotValidError } from "../error/ArgumentNotValidError";

import { VehicleRepository } from "../../repository/interface/VehicleRepository";
import { UserRepository } from "../../repository/interface/UserRepository";

type CreateVehicleServiceRequest = Omit<
    VehicleType, 
    "id" | "createdAt" | "updatedAt"
>

type CreateVehicleServiceResponse = {
    vehicle: VehicleType;
};

export class CreateVehicleService {
    private repository: VehicleRepository;
    private userRepository: UserRepository
    
    public constructor(
        repository: VehicleRepository, 
        userRepository: UserRepository
    ) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    public async execute(
        {
            color,
            model,
            ownerId,
            plate,
            type
        }: CreateVehicleServiceRequest
    ): Promise<CreateVehicleServiceResponse> {

        const userFound = await this.userRepository.findById(ownerId);

        if (!userFound) {
            throw new ArgumentNotValidError(
                `o usuário não existe`
            );
        }

        const vehicleFound = await this.repository.findByPlate(plate);
        
        if (vehicleFound) {
            throw new ArgumentNotValidError(
                `o veículo ${plate} já está cadastrado`
            );
        }

        const vehicle = await this.repository.create({
            color,
            model,
            ownerId,
            plate,
            type
        });

        return { vehicle };
    }
}