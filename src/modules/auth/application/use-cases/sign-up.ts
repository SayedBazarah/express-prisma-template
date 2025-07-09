import { hash } from "@/shared/auth/hashing";
import { User } from "@prisma/client";
import { PrismaUserRepository } from "../../infrastructure/prisma/user-repository";
import { SignUpDTO } from "../dtos/sign-up";

export class SignupUseCase {
  constructor(private readonly userRepo = new PrismaUserRepository()) {}

  async execute(data: SignUpDTO): Promise<User> {
    const existingUser = await this.userRepo.findByEmail(data.email);
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const newUser = await this.userRepo.create({
      ...data,
      password: await hash(data.password as string),
    });

    return newUser.getUser() as User;
  }
}
