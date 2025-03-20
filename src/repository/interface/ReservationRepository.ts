import { ReservationType } from "../../types/ReservationType";

export interface ReservationRepository {

    create(reservationData: Omit<
        ReservationType, 
        "status" | "id" | "createdAt" | "updatedAt"
    >): Promise<ReservationType>;


    findById(id: string): Promise<ReservationType | null>;

    findByRideId(rideId: string): Promise<ReservationType[]>;

    findByOwnerId(ownerId: string): Promise<ReservationType[]>;

}
