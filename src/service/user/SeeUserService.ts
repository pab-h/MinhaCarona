import { UserRepository } from "../../repository/interface/UserRepository";
import { UserType } from "../../types/UserType";
import { ArgumentNotValidError } from "../error/ArgumentNotValidError";

type SeeUserServiceRequest = {
    id: string;
};

type SeeUserServiceResponse = {
    user: UserType;
};

export class SeeUserService {
    private repository: UserRepository;
    
    public constructor(repository: UserRepository) {
        this.repository = repository;
    }

    public async execute(
        {id}: SeeUserServiceRequest
    ): Promise<SeeUserServiceResponse> {
        const userFound = await this.repository.findById(id);

        console.log(userFound);

        if (!userFound) {
            throw new ArgumentNotValidError(
                "O usuario não existe"
            );
        }

        return { user: userFound };
    }
}