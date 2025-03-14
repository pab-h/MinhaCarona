-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('PENDENTE', 'RECUSADA', 'ACEITA');

-- CreateTable
CREATE TABLE "reservations" (
    "id" TEXT NOT NULL,
    "rideId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "status" "ReservationStatus" NOT NULL DEFAULT 'PENDENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_rideId_fkey" FOREIGN KEY ("rideId") REFERENCES "rides"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
