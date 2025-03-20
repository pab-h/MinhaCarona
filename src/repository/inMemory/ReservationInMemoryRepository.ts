import { randomBytes } from "crypto";
import { ReservationType } from "../../types/ReservationType";
import { ReservationRepository } from "../interface/ReservationRepository";

export class ReservationInMemoryRepository implements ReservationRepository {

    public reservations: ReservationType[];

    public constructor() {
        this.reservations = [];
    }

    public async create({
        ownerId,
        rideId,
        status
    }: Omit<ReservationType, "id" | "createdAt" | "updatedAt">): Promise<ReservationType> {
        const reservation: ReservationType = {
            id: randomBytes(7).toString("hex"),
            ownerId,
            rideId,
            status,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        this.reservations.push(reservation);

        return reservation;
    }

    public async findById(id: string): Promise<ReservationType | null> {
        const reservation = this.reservations.find(ride => ride.id == id);

        if (!reservation) {
            return null;
        }

        return reservation;
    }

    public async findByOwnerId(ownerId: string): Promise<ReservationType[]> {
        const reservations = this.reservations
            .filter(reservation => reservation.ownerId == ownerId);   
    
        return reservations;    
    }

    public async findByRideId(rideId: string): Promise<ReservationType[]> {
        const reservations = this.reservations
            .filter(reservation => reservation.rideId == rideId);   
    
        return reservations;    
    }

}
