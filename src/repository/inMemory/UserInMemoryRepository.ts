import { UserType } from "../../types/UserType";
import { UserRepository } from "../interface/UserRepository";
import { randomBytes } from "crypto";

import bcrypt from "bcryptjs"

export class UserInMemoryRepository implements UserRepository {

    public users: UserType[];

    public constructor() {
        this.users = [];
    }

    public async create(
        {
            email,
            name,
            password
        }: Omit<UserType, "id" | "createdAt" | "updatedAt">
    ): Promise<UserType> {

        const passwordHash = await bcrypt.hash(password, 7);

        const user: UserType = {
            id: randomBytes(7).toString("hex"),
            email,
            name,
            password: passwordHash,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        this.users.push(user);

        return user;
    }

    public async findByEmail(email: string): Promise<UserType | null> {
        const userFound = this.users.find(user => user.email == email);

        if (!userFound) {
            return null;
        }

        return userFound;
    }

    public async findById(id: string): Promise<UserType | null> {
        const userFound = this.users.find(user => user.id == id);

        if (!userFound) {
            return null;
        }

        return userFound;
    }

}
