import { UserRepository } from "../repository/interface/UserRepository";
import { ArgumentNotValidError } from "./error/ArgumentNotValidError";
import { env } from "../env";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

type AuthServiceRequest = {
    email: string;
    password: string;
}

type AuthServiceResponse = {
    token: string;
}

export class AuthService {
    private repository: UserRepository;
    
    public constructor(repository: UserRepository) {
        this.repository = repository;
    }

    public async execute(
        {email, password}: AuthServiceRequest
    ): Promise<AuthServiceResponse> {

        const userFound = await this.repository.findByEmail(email);

        if (!userFound) {
            throw new ArgumentNotValidError("Email not exists");
        }
        
        const isPasswordMatch = await bcrypt.compare(
            password, 
            userFound.password
        );

        if (!isPasswordMatch) {
            throw new ArgumentNotValidError("Password not valid");
        }

        const token = jwt.sign(
            { userId: userFound.id }, 
            env.JWT_SECRET,
            { expiresIn: 300 }
        );

        return { token };
    }
}