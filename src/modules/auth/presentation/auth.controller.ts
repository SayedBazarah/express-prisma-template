import { Request, RequestHandler } from "express";
import { NotAuthenticatedError } from "@/shared/errors/not-authenticated.error";
import { SignupUseCase } from "../application/use-cases/sign-up";
import { TokenService } from "../infrastructure/auth.service";
import { BadRequestError } from "@/shared/errors";

export const signUpHandler: RequestHandler = async (
  req: Request,
  res,
  next
) => {
  const useCase = new SignupUseCase();
  const user = await useCase.execute(req.body);

  const { accessToken, refreshToken } = TokenService.generateTokens({
    userId: user.id,
  });

  req.session.refreshToken = refreshToken;
  req.session.accessToken = accessToken;

  req.login(user, (err) => {
    if (err) return next(err);
    // You now have req.user and a session
    res.status(201).json({
      message: "Signup successful",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  });
};

export const signInHandler: RequestHandler = async (req, res, next) => {
  const { accessToken, refreshToken } = TokenService.generateTokens({
    userId: req.user?.id,
  });

  // ✅ Store tokens in session
  req.session.accessToken = accessToken;
  req.session.refreshToken = refreshToken;

  // Save session
  req.session.save((err) => {
    if (err) {
      console.error("Failed to save session:", err);
      throw new BadRequestError("Failed to save session");
    }

    res.status(200).json({ message: "Signin successful" });
  });
};

export const currentUserHandler: RequestHandler = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ error: "Not logged in" });
  }

  res.json(req.user);
};

export const refreshTokenHandler: RequestHandler = (
  req: Request,
  res,
  next
) => {
  try {
    const token = req.session?.refreshToken;
    if (!token) throw new NotAuthenticatedError("Error: not authenticated");
    const payload = TokenService.verifyRefreshToken(token);
    const { accessToken } = TokenService.generateTokens(payload);
    req.session.accessToken = accessToken;
    res.json({ accessToken });
  } catch (err) {
    throw new NotAuthenticatedError("Error: not authenticated");
  }
};

export const signOutHandler: RequestHandler = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw new BadRequestError("Error: Logout failed");
    res.json({ message: "Logged out" });
  });
};
