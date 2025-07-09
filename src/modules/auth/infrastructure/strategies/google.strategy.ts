import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { env } from "@/env";
import { PrismaUserRepository } from "../prisma/user-repository";
import { User } from "@prisma/client";

export const googleStrategy = new GoogleStrategy(
  {
    clientID: env.GOOGLE_CLIENT_ID!,
    clientSecret: env.GOOGLE_CLIENT_SECRET!,
    callbackURL: env.GOOGLE_CALLBACK_URL!,
  },
  async (_accessToken, _refreshToken, profile, done) => {
    const userRepository = new PrismaUserRepository();

    // Extract email from profile
    const email = profile.emails?.[0]?.value;
    if (!email) return done(null, false, { message: "Email not found" });

    // Check if user exists
    let user = await userRepository.findByEmail(email);

    if (!user) {
      user = await userRepository.create({
        email,
        name: profile.displayName,
        provider: "google",
        providerId: profile.id,
      });
    }

    return done(null, user.getUser() as User);
  }
);
