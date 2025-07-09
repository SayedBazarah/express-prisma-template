import { Strategy as LocalStrategy } from "passport-local";
import { prisma } from "@/shared/prisma/client";
import { compare } from "@/shared/auth/hashing";

export const localStrategy = new LocalStrategy(
  { usernameField: "email" },
  async (email, password, done) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await compare(password, `${user.password}`))) {
      return done(null, false, { message: "Invalid credentials" });
    }
    return done(null, user);
  }
);
