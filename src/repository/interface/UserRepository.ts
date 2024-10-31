import { UserType } from "../../types/UserType"

export interface UserRepository {
    
    create(userData: Omit<
        UserType, 
        "id" | "createdAt" | "updatedAt"
    >): Promise<UserType>

    findByEmail(email: string): Promise<UserType | null>;

    findById(id: string): Promise<UserType | null>;

}