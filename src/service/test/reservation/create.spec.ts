import { UserInMemoryRepository } from '../../../repository/inMemory/UserInMemoryRepository';
import { RideInMemoryRepository } from '../../../repository/inMemory/RideInMemoryRepository';
import { VehicleInMemoryRepository } from '../../../repository/inMemory/VehicleInMemoryRepository';
import { ReservationInMemoryRepository } from '../../../repository/inMemory/ReservationInMemoryRepository';

import { CreateUserService } from '../../../service/user/CreateUserService';
import { CreateRideService } from '../../../service/ride/CreateRideService';
import { CreateVehicleService } from '../../../service/vehicle/CreateVehicleService';
import { CreateReservationService } from '../../../service/reservation/CreateReservationService';

import { ArgumentNotValidError } from '../../../service/error/ArgumentNotValidError';

import { describe, it, expect, beforeEach } from 'vitest';

describe('Register service', () => {
  let userRepository: UserInMemoryRepository;
  let createUserService: CreateUserService;

  let vehicleRepository: VehicleInMemoryRepository;
  let createVehicleService: CreateVehicleService;

  let rideRepository: RideInMemoryRepository;
  let createRideService: CreateRideService;

  let reservationRepository: ReservationInMemoryRepository;
  let createReservationService: CreateReservationService;

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

    reservationRepository = new ReservationInMemoryRepository();
    createReservationService = new CreateReservationService(
      reservationRepository,
      userRepository,
      rideRepository
    );

  });

  it('should be able to register a new reservation', async () => {

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

    expect(async () => {
      await createReservationService.execute({
        ownerId: passenger.id,
        rideId: ride.id,
      })
    }).not.toThrow();
  });

  it('should be not able to register a reservation with already requested', async () => {

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

    expect(async () => {
      await createReservationService.execute({
        ownerId: passenger.id,
        rideId: ride.id,
      });

      await createReservationService.execute({
        ownerId: passenger.id,
        rideId: ride.id,
      });
    }).rejects.toBeInstanceOf(ArgumentNotValidError);
  });

  it('should be not able to register a reservation with non exist ride', async () => {

    const { user: passenger } = await createUserService.execute({
      email: 'passenger@gmail.com',
      name: 'passenger',
      password: '123456',
    });

    expect(async () => {
      await createReservationService.execute({
        ownerId: passenger.id,
        rideId: "cas",
      })
    }).rejects.toBeInstanceOf(ArgumentNotValidError);
  });

  it('should be not able to register a reservation with non exist passenger', async () => {

    const { user: driver } = await createUserService.execute({
      email: 'pedro@gmail.com',
      name: 'Pedro',
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

    expect(async () => {
      await createReservationService.execute({
        ownerId: "asease",
        rideId: ride.id,
      })
    }).rejects.toBeInstanceOf(ArgumentNotValidError);
  });

  it('should be not able to register a reservation for driver', async () => {

    const { user: driver } = await createUserService.execute({
      email: 'pedro@gmail.com',
      name: 'Pedro',
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

    expect(async () => {
      await createReservationService.execute({
        ownerId: driver.id,
        rideId: ride.id,
      })
    }).rejects.toBeInstanceOf(ArgumentNotValidError);
  });

});