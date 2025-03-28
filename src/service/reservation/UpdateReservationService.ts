import { ArgumentNotValidError } from "../error/ArgumentNotValidError";
import { ReservationType } from "../../types/ReservationType";

import { ReservationRepository } from "../../repository/interface/ReservationRepository";
import { UserRepository } from "../../repository/interface/UserRepository";
import { RideRepository } from "../../repository/interface/RideRepository";

type UpdateReservationServiceRequest = Pick<
    ReservationType,
    "id" | "status" | "ownerId"
>

type UpdateReservationServiceResponse = {
    reservation: ReservationType;
};

export class UpdateReservationService {
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
            id,
            status,
            ownerId
        }: UpdateReservationServiceRequest
    ): Promise<UpdateReservationServiceResponse> {

        const reservationFound = await this.repository.findById(id);

        if (!reservationFound) {
            throw new ArgumentNotValidError("A reserva não existe");
        }
        
        const ride = await this.rideRepository.findById(reservationFound.rideId);

        if (!ride) {
            throw new ArgumentNotValidError("A carona não existe");
        } 


        const userFound = await this.userRepository.findById(ownerId);

        if (!userFound) {
            throw new ArgumentNotValidError("O usuário não existe");
        }


        if (userFound.id != ride.ownerId) {
            throw new ArgumentNotValidError("O usuário não é dono da reserva");
        }


        const reservationUpdated = await this.repository
            .updateStatus(id, status);

        return { reservation: reservationUpdated };
    }
}