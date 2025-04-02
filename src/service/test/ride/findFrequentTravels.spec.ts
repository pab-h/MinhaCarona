import { UserInMemoryRepository } from '../../../repository/inMemory/UserInMemoryRepository';
import { RideInMemoryRepository } from '../../../repository/inMemory/RideInMemoryRepository';
import { VehicleInMemoryRepository } from '../../../repository/inMemory/VehicleInMemoryRepository';

import { ArgumentNotValidError } from '../../../service/error/ArgumentNotValidError';

import { CreateUserService } from '../../../service/user/CreateUserService';
import { CreateVehicleService } from '../../../service/vehicle/CreateVehicleService';
import { CreateRideService } from '../../../service/ride/CreateRideService';
import { FindByTravelRideService } from '../../../service/ride/FindByTravelRideService';
import { FindFrequentTravelsRideService } from '../../../service/ride/FindFrequentTravelsRideService';

import { describe, it, expect, beforeEach } from 'vitest';

describe('Find by travel service', () => {
  let userRepository:    UserInMemoryRepository;
  let rideRepository:    RideInMemoryRepository;
  let vehicleRepository: VehicleInMemoryRepository;

  let createRideService:              CreateRideService;
  let createUserService:              CreateUserService;
  let createVehicleService:           CreateVehicleService;
  let findByTravelService:            FindByTravelRideService;
  let findFrequentTravelsRideService: FindFrequentTravelsRideService

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

    findFrequentTravelsRideService = new FindFrequentTravelsRideService(
        rideRepository
    );
  });

  it("It should be possible to get 10 most frequent Travels", async () => {
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

    await createRideService.execute({
        date:        new Date("2025-06-18"),
        destination: "Hidrolandia",
        origin:      "Paraguai",
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

    const { travels } = await findFrequentTravelsRideService.execute();
    
    console.log(travels)

    expect(travels).toHaveLength(2);

  });
  
});