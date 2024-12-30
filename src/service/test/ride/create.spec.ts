import { UserInMemoryRepository } from '../../../repository/inMemory/UserInMemoryRepository';
import { RideInMemoryRepository } from '../../../repository/inMemory/RideInMemoryRepository';
import { VehicleInMemoryRepository } from '../../../repository/inMemory/VehicleInMemoryRepository';

import { ArgumentNotValidError } from '../../../service/error/ArgumentNotValidError';
import { CreateRideService } from '../../../service/ride/CreateRideService';
import { describe, it, expect, beforeEach } from 'vitest';


describe('Register service', () => {
  let userRepository: UserInMemoryRepository;
  let rideRepository: RideInMemoryRepository;
  let vehicleRepository: VehicleInMemoryRepository;

  let createService: CreateRideService;

  beforeEach(() => {
    rideRepository = new RideInMemoryRepository();    
    userRepository = new UserInMemoryRepository();
    vehicleRepository = new VehicleInMemoryRepository();

    createService = new CreateRideService(
      rideRepository,
      userRepository,
      vehicleRepository
    );
  });

  it("should be able to register a new ride", async () => {
    const user = await userRepository.create({
      email: "johon@gmail.com",
      name: "John",
      password: "senhabraba12312"
    });

    const vehicle = await vehicleRepository.create({
      color: "Vermelha",
      model: "Honda",
      ownerId: user.id,
      plate: "15158",
      type: 'MOTORCYCLE'
    });

    expect(async () => {
      await createService.execute({
        date: new Date(),
        destination: "Londrina, Pa",
        origin: "João Pessoa, Pe",
        ownerId: user.id,
        seats: 1,
        vehicleId: vehicle.id
      });
    }).not.toThrow();
  });


  it("should be not able to register a new ride with non exist user", async () => {
    const user = await userRepository.create({
      email: "johon@gmail.com",
      name: "John",
      password: "senhabraba12312"
    });

    const vehicle = await vehicleRepository.create({
      color: "Vermelha",
      model: "Honda",
      ownerId: user.id,
      plate: "15158",
      type: 'MOTORCYCLE'
    });

    expect(async () => {
      await createService.execute({
        date: new Date(),
        destination: "Londrina, Pa",
        origin: "João Pessoa, Pe",
        ownerId: "123123",
        seats: 1,
        vehicleId: vehicle.id
      });
    }).rejects.toThrow(ArgumentNotValidError);
  });


  it("should be not able to register a new ride with non exist vehicle", async () => {
    const user = await userRepository.create({
      email: "johon@gmail.com",
      name: "John",
      password: "senhabraba12312"
    });

    expect(async () => {
      await createService.execute({
        date: new Date(),
        destination: "Londrina, Pa",
        origin: "João Pessoa, Pe",
        ownerId: user.id,
        seats: 1,
        vehicleId: "213123"
      });
    }).rejects.toThrow(ArgumentNotValidError);
  });


  it("should not be able to register a new ride if the user does not own the vehicle", async () => {
    const userA = await userRepository.create({
      email: "johon@gmail.com",
      name: "John",
      password: "senhabraba12312"
    });

    const userB = await userRepository.create({
      email: "johon@gmail.com",
      name: "John",
      password: "senhabraba12312"
    });

    const vehicle = await vehicleRepository.create({
      color: "Vermelha",
      model: "Honda",
      ownerId: userA.id,
      plate: "151-581",
      type: 'MOTORCYCLE'
    });

    expect(async () => {
      await createService.execute({
        date: new Date(),
        destination: "Londrina, Pa",
        origin: "João Pessoa, Pe",
        ownerId: userB.id,
        seats: 1,
        vehicleId: vehicle.id
      });
    }).rejects.toThrow(ArgumentNotValidError);
  });


  it("should be not able to register a new trip with less than one seat available in the vehicle", async () => {
    const user = await userRepository.create({
      email: "johon@gmail.com",
      name: "John",
      password: "senhabraba12312"
    });

    const vehicle = await vehicleRepository.create({
      color: "Vermelha",
      model: "Honda",
      ownerId: user.id,
      plate: "15158",
      type: 'MOTORCYCLE'
    });

    expect(async () => {
      await createService.execute({
        date: new Date(),
        destination: "Londrina, Pa",
        origin: "João Pessoa, Pe",
        ownerId: user.id,
        seats: 0,
        vehicleId: vehicle.id
      });
    }).rejects.toThrow(ArgumentNotValidError);
  });
  
});