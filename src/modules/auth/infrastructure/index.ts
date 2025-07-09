import passport from "passport";
import { prisma } from "@/shared/prisma/client";
import { localStrategy } from "./strategies/local.strategy";
import { googleStrategy } from "./strategies/google.strategy";

// Initialize passport
passport.use(localStrategy);
passport.use(googleStrategy);

passport.serializeUser((user: any, done) => done(null, user.id));

passport.deserializeUser(async (id: string, done) => {
  try {
    console.log("Deserialize user");
    console.log(id);
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
