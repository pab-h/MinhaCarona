import { ArgumentNotValidError } from "../error/ArgumentNotValidError";
import { RideType } from "../../types/RideType";

import { RideRepository } from "../../repository/interface/RideRepository";
import { UserRepository } from "../../repository/interface/UserRepository";
import { VehicleRepository } from "../../repository/interface/VehicleRepository";

type CreateRideServiceRequest = Omit<
    RideType, 
    "id" | "createdAt" | "updatedAt"
>

type CreateRideServiceResponse = {
    ride: RideType;
};

export class CreateRideService {
    private repository: RideRepository;
    private userRepository: UserRepository;
    private vehicleRepository: VehicleRepository;
    
    public constructor(
        repository: RideRepository, 
        userRepository: UserRepository,
        vehicleRepository: VehicleRepository,

    ) {
        this.repository = repository;
        this.userRepository = userRepository;
        this.vehicleRepository = vehicleRepository;
    }

    public async execute(
        {
            date,
            destination,
            origin,
            ownerId,
            seats,
            vehicleId
        }: CreateRideServiceRequest
    ): Promise<CreateRideServiceResponse> {

        const userFound = await this.userRepository.findById(ownerId);

        if (!userFound) {
            throw new ArgumentNotValidError("O usuário não existe");
        }

        const vehicleFound = await this.vehicleRepository.findById(vehicleId);
        
        if (!vehicleFound) {
            throw new ArgumentNotValidError("O veículo não existe");
        }

        if (userFound.id != vehicleFound.ownerId) {
            throw new ArgumentNotValidError("O usuário não é dono do veículo");
        }

        if (seats < 1){
            throw new ArgumentNotValidError(
                "É necessário ter pelo menos 1 vaga disponível"
            );
        }

        const ride = await this.repository.create({
            date,
            destination,
            origin,
            ownerId,
            seats,
            vehicleId
        });

        return { ride };
    }
}