import { UserType } from "../../types/UserType";
import { ArgumentNotValidError } from "../error/ArgumentNotValidError";
import { UserRepository } from "../../repository/interface/UserRepository";

type CreateUserServiceRequest = Omit<
    UserType, 
    "id" | "createdAt" | "updatedAt"
>

type CreateUserServiceResponse = {
    user: UserType;
};

export class CreateUserService {
    private repository: UserRepository;
    
    public constructor(repository: UserRepository) {
        this.repository = repository;
    }

    public async execute(
        {
            email, 
            password, 
            name
        }: CreateUserServiceRequest
    ): Promise<CreateUserServiceResponse> {
        const userFound = await this.repository.findByEmail(email);

        if (userFound) {
            throw new ArgumentNotValidError(
                "user email already existis"
            );
        }

        const user = await this.repository.create({
            email,
            password,
            name
        });

        return { user };
    }
}