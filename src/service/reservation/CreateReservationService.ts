import { ArgumentNotValidError } from "../error/ArgumentNotValidError";
import { ReservationType } from "../../types/ReservationType";

import { ReservationRepository } from "../../repository/interface/ReservationRepository";
import { UserRepository } from "../../repository/interface/UserRepository";
import { RideRepository } from "../../repository/interface/RideRepository";

type CreateReservationServiceRequest = Omit<
    ReservationType, 
    "status" | "id" | "createdAt" | "updatedAt"
>

type CreateReservationServiceResponse = {
    reservation: ReservationType;
};

export class CreateReservationService {
    private repository: ReservationRepository;
    private userRepository: UserRepository;
    private rideRepository: RideRepository;
    
    public constructor(
        repository: ReservationRepository, 
        userRepository: UserRepository,
        rideRepository: RideRepository,

    ) {
        this.repository = repository;
        this.userRepository = userRepository;
        this.rideRepository = rideRepository;
    }

    public async execute(
        {
            ownerId,
            rideId,
        }: CreateReservationServiceRequest
    ): Promise<CreateReservationServiceResponse> {

        const userFound = await this.userRepository.findById(ownerId);

        if (!userFound) {
            throw new ArgumentNotValidError("O usuário não existe");
        }


        const rideFound = await this.rideRepository.findById(rideId);
        
        if (!rideFound) {
            throw new ArgumentNotValidError("A corrida não existe");
        }


        if (userFound.id == rideFound.ownerId) {
            throw new ArgumentNotValidError(
                "O motorista não pode reservar um acento na sua própria viagem"
            );
        }

        const reservations = await this.repository.findByRideId(rideFound.id);

        const isUserAlreadIn = reservations
            .some(reservation => reservation.ownerId == userFound.id);

        if (isUserAlreadIn) {
            throw new ArgumentNotValidError(
                "O usuário só pode solicitar uma reserva apenas uma vez"
            );
        }

        const reservation = await this.repository.create({
            ownerId,
            rideId
        });

        return { reservation };
    }
}