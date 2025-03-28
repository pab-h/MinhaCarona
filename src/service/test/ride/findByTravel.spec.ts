import { UserInMemoryRepository } from '../../../repository/inMemory/UserInMemoryRepository';
import { RideInMemoryRepository } from '../../../repository/inMemory/RideInMemoryRepository';
import { VehicleInMemoryRepository } from '../../../repository/inMemory/VehicleInMemoryRepository';

import { ArgumentNotValidError } from '../../../service/error/ArgumentNotValidError';
import { RideType } from '../../../types/RideType';

import { CreateRideService } from '../../../service/ride/CreateRideService';
import { CreateUserService } from '../../../service/user/CreateUserService';
import { CreateVehicleService } from '../../../service/vehicle/CreateVehicleService';
import { FindByTravelRideService } from '../../../service/ride/FindByTravelRideService';

import { describe, it, expect, beforeEach } from 'vitest';

describe('Find by travel service', () => {
  let userRepository:    UserInMemoryRepository;
  let rideRepository:    RideInMemoryRepository;
  let vehicleRepository: VehicleInMemoryRepository;

  let createRideService:    CreateRideService;
  let createUserService:    CreateUserService;
  let createVehicleService: CreateVehicleService;
  let findByTravelService:  FindByTravelRideService;

  beforeEach(() => {
    rideRepository =    new RideInMemoryRepository();    
    userRepository =    new UserInMemoryRepository();
    vehicleRepository = new VehicleInMemoryRepository();

    createUserService = new CreateUserService(
        userRepository
    );

    createVehicleService = new CreateVehicleService(
        vehicleRepository,
        userRepository
    );

    createRideService = new CreateRideService(
      rideRepository,
      userRepository,
      vehicleRepository
    );

    findByTravelService = new FindByTravelRideService(
        rideRepository
    );
  });

  it("It should be possible to filter trips by destination, origin and date", async () => {
    const {user} = await createUserService.execute({
      email:    "johon@gmail.com",
      name:     "John",
      password: "senhabraba12312"
    });

    const {vehicle} = await createVehicleService.execute({
      color:   "Vermelha",
      model:   "Honda",
      ownerId: user.id,
      plate:   "15158",
      type:    'MOTORCYCLE'
    });

    await createRideService.execute({
        date:        new Date("2025-06-18"),
        destination: "Paraguai",
        origin:      "Hidrolandia",
        ownerId:      user.id,
        seats:        1,
        vehicleId:    vehicle.id
    });

    await createRideService.execute({
        date:        new Date("2025-06-18"),
        destination: "Paraguai",
        origin:      "Hidrolandia",
        ownerId:     user.id,
        seats:       2,
        vehicleId:   vehicle.id
    });

    expect(async () => {
      await findByTravelService.execute({
          date:        new Date("2025-06-18"),
          destination: "Paraguai",
          origin:      "Hidrolandia",
      });
    }).not.toThrow(ArgumentNotValidError);

    const { rides } = await findByTravelService.execute({
      date:        new Date("2025-06-18"),
      destination: "Paraguai",
      origin:      "Hidrolandia",
    });
    
    expect(rides).toHaveLength(2);

  });
  
});