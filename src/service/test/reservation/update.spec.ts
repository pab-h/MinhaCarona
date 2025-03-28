import { UserInMemoryRepository } from '../../../repository/inMemory/UserInMemoryRepository';
import { RideInMemoryRepository } from '../../../repository/inMemory/RideInMemoryRepository';
import { VehicleInMemoryRepository } from '../../../repository/inMemory/VehicleInMemoryRepository';
import { ReservationInMemoryRepository } from '../../../repository/inMemory/ReservationInMemoryRepository';

import { CreateUserService } from '../../user/CreateUserService';
import { CreateRideService } from '../../ride/CreateRideService';
import { CreateVehicleService } from '../../vehicle/CreateVehicleService';
import { CreateReservationService } from '../../reservation/CreateReservationService';
import { UpdateReservationService } from '../../reservation/UpdateReservationService';

import { ArgumentNotValidError } from '../../error/ArgumentNotValidError';

import { describe, it, expect, beforeEach } from 'vitest';

describe('Update service', () => {
  let userRepository: UserInMemoryRepository;
  let createUserService: CreateUserService;

  let vehicleRepository: VehicleInMemoryRepository;
  let createVehicleService: CreateVehicleService;

  let rideRepository: RideInMemoryRepository;
  let createRideService: CreateRideService;

  let reservationRepository: ReservationInMemoryRepository;
  let createReservationService: CreateReservationService;
  let updateReservationService: UpdateReservationService; 


  beforeEach(() => {

    userRepository    = new UserInMemoryRepository();
    createUserService = new CreateUserService(userRepository);

    vehicleRepository    = new VehicleInMemoryRepository();
    createVehicleService = new CreateVehicleService(
      vehicleRepository,
      userRepository
    );

    rideRepository    = new RideInMemoryRepository();
    createRideService = new CreateRideService(
      rideRepository,
      userRepository,
      vehicleRepository
    );

    reservationRepository         = new ReservationInMemoryRepository();
    createReservationService      = new CreateReservationService(
      reservationRepository,
      userRepository,
      rideRepository
    );
    updateReservationService = new UpdateReservationService(
        reservationRepository,
        userRepository,
        rideRepository
    );


  });

  it('should be able to register update a reservation', async () => {

    const { user: driver } = await createUserService.execute({
      email: 'pedro@gmail.com',
      name: 'Pedro',
      password: '123456',
    });

    const { user: passenger } = await createUserService.execute({
      email: 'passenger@gmail.com',
      name: 'passenger',
      password: '123456',
    });

    const { vehicle } = await createVehicleService.execute({
      color: "red",
      model: "kayasawi",
      ownerId: driver.id,
      plate: "14455",
      type: "MOTORCYCLE"
    })

    const { ride } = await createRideService.execute({
      date: new Date(),
      destination: "aqui",
      origin: "ali",
      ownerId: driver.id,
      seats: 6,
      vehicleId: vehicle.id
    });

    const { reservation } = await createReservationService.execute({
      ownerId: passenger.id,
      rideId: ride.id,
    });

    expect(async () => {

        await updateReservationService.execute({
            id: reservation.id,
            ownerId: driver.id,
            status: "ACEITA"
        });

        await updateReservationService.execute({
            id: reservation.id,
            ownerId: driver.id,
            status: "RECUSADA"
        });

    }).not.toThrow();
  });

  it('should be not able to update a non-exists reservation ', async () => {

    const { user: driver } = await createUserService.execute({
      email: 'pedro@gmail.com',
      name: 'Pedro',
      password: '123456',
    });

    expect(async () => {
        await updateReservationService.execute({
            id: "blablabal",
            ownerId: driver.id,
            status: "ACEITA"
        });
    }).rejects.toBeInstanceOf(ArgumentNotValidError);
  });


  it('should be not able to update a reservation with non-exists user ', async () => {

    const { user: driver } = await createUserService.execute({
        email: 'pedro@gmail.com',
        name: 'Pedro',
        password: '123456',
      });
  
      const { user: passenger } = await createUserService.execute({
        email: 'passenger@gmail.com',
        name: 'passenger',
        password: '123456',
      });
  
      const { vehicle } = await createVehicleService.execute({
        color: "red",
        model: "kayasawi",
        ownerId: driver.id,
        plate: "14455",
        type: "MOTORCYCLE"
      })
  
      const { ride } = await createRideService.execute({
        date: new Date(),
        destination: "aqui",
        origin: "ali",
        ownerId: driver.id,
        seats: 6,
        vehicleId: vehicle.id
      });
  
      const { reservation } = await createReservationService.execute({
        ownerId: passenger.id,
        rideId: ride.id,
      });

    expect(async () => {
        await updateReservationService.execute({
            id: reservation.id,
            ownerId: "bla-bla-bla",
            status: "ACEITA"
        });
    }).rejects.toBeInstanceOf(ArgumentNotValidError);
  });


  it('should be not able to update a reservation if you is not the driver', async () => {

    const { user: driver } = await createUserService.execute({
        email: 'pedro@gmail.com',
        name: 'Pedro',
        password: '123456',
      });
  
      const { user: passenger } = await createUserService.execute({
        email: 'passenger@gmail.com',
        name: 'passenger',
        password: '123456',
      });
  
      const { vehicle } = await createVehicleService.execute({
        color: "red",
        model: "kayasawi",
        ownerId: driver.id,
        plate: "14455",
        type: "MOTORCYCLE"
      })
  
      const { ride } = await createRideService.execute({
        date: new Date(),
        destination: "aqui",
        origin: "ali",
        ownerId: driver.id,
        seats: 6,
        vehicleId: vehicle.id
      });
  
      const { reservation } = await createReservationService.execute({
        ownerId: passenger.id,
        rideId: ride.id,
      });

    expect(async () => {
        await updateReservationService.execute({
            id: reservation.id,
            ownerId: passenger.id,
            status: "ACEITA"
        });
    }).rejects.toBeInstanceOf(ArgumentNotValidError);
  });

});