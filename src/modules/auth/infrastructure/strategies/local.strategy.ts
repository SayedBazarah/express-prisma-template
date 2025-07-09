import { Strategy as LocalStrategy } from "passport-local";
import { prisma } from "@/shared/prisma/client";
import { compare } from "@/shared/auth/hashing";
import { BadRequestError } from "@/shared/errors";

export const localStrategy = new LocalStrategy(
  { usernameField: "email" },
  async (email, password, done) => {
    const user = await prisma.user.findUnique({ where: { email } });
    console.log("--- Local Strategy ---");
    console.log({ user });
    if (!user || !(await compare(password, `${user.password}`))) {
      console.log("Error: Invalid credentials");
      return done(null, false);
    }
    return done(null, user);
  }
);
