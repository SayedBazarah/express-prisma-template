import { prisma } from "@/shared/prisma/client";
import { SignUpDTO } from "../../application/dtos/sign-up";
import { User } from "../../domain/user";

export class PrismaUserRepository {
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user ? new User(user) : null;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user ? new User(user) : null;
  }

  async create(payload: SignUpDTO) {
    return await prisma.$transaction(async (tx) => {
      // [1] Create account
      const account = await tx.account.create({
        data: {
          name: payload.name,
        },
      });

      // [2] Create subscription
      await tx.subscription.create({
        data: {
          account: { connect: { id: account.id } },
          monthlyPrice: 0,
        },
      });

      // [3] Create user
      const user = await tx.user.create({
        data: {
          email: payload.email,
          name: payload.name,
          password: payload.password,
          accountId: account.id,
          provider: payload.provider,
          providerId: payload.providerId,
        },
      });

      // [4] Create owner role
      await tx.role.create({
        data: {
          name: "Owner",
          description: "Owner role",
          isDefault: true,
          account: {
            connect: { id: account.id },
          },
          users: {
            connect: { id: user.id },
          },
        },
      });
      return new User(user);
    });
  }
}
