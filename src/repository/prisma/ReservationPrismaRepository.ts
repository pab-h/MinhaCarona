import { ReservationStatus } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { ReservationType } from "../../types/ReservationType";
import { ReservationRepository } from "../interface/ReservationRepository";

export class ReservationPrismaRepository implements ReservationRepository {

    public async create({
        ownerId,
        rideId,
        status
    }: Omit<ReservationType, "id" | "createdAt" | "updatedAt">): Promise<ReservationType> {
        return await prisma.reservations.create({
            data: {
                owner: { connect: { id: ownerId }},
                ride: { connect: { id: rideId }},
                status
            }
        })
    }

    public async findById(id: string): Promise<ReservationType | null> {
        return await prisma.reservations.findUnique({
            where: { id }
        });
    }

    public async findByOwnerId(ownerId: string): Promise<ReservationType[]> {
        return await prisma.reservations.findMany({
            where: { ownerId }
        });
    }

    public async findByRideId(rideId: string): Promise<ReservationType[]> {
        return await prisma.reservations.findMany({
            where: { rideId }
        });
    }

    public async updateStatus(
        id: string, status: ReservationStatus
    ): Promise<ReservationType> {
        return await prisma.reservations.update({
            data: {
                status
            },
            where: { id }
        });
    }

}