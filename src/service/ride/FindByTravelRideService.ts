import { RideType } from "../../types/RideType";

import { RideRepository } from "../../repository/interface/RideRepository";

type FindByTravelRideServiceRequest = {
    origin: string;
    destination: string; 
    date: Date;
}

type FindByTravelRideServiceResponse = {
    rides: RideType[];
};

export class FindByTravelRideService {
    private repository: RideRepository;
    
    public constructor(repository: RideRepository) {
        this.repository = repository;
    }

    public async execute(
        {
            date,
            destination,
            origin,
        }: FindByTravelRideServiceRequest
    ): Promise<FindByTravelRideServiceResponse> {

        const rides = await this.repository.findByTravel(
            origin,
            destination,
            date
        );

        return { rides };

    }
}