import { compare } from "@/shared/auth/hashing";
import { User as IUser } from "@prisma/client";
export class User {
  constructor(private readonly user: IUser) {}

  getUser<K extends keyof IUser>(field?: K): IUser[K] | IUser {
    return (field && this.user[field]) || this.user;
  }

  async validatePassword(password: string): Promise<boolean> {
    if (!this.user.password) return Promise.resolve(false);
    return compare(password, this.user.password);
  }
}
