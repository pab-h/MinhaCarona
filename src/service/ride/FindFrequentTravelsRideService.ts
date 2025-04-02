import { TravelType } from "../../types/RideType";

import { RideRepository } from "../../repository/interface/RideRepository";

type FindFrequentTravelsRideServiceResponse = {
    travels: TravelType[];
};

export class FindFrequentTravelsRideService {
    private repository: RideRepository;
    
    public constructor(
        repository: RideRepository, 

    ) {
        this.repository = repository;
    }

    public async execute(): Promise<FindFrequentTravelsRideServiceResponse> {
        const travels = await this.repository.findFrequentTravels();

        return { travels };
    }
}