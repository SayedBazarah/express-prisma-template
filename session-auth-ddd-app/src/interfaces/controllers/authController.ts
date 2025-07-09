import { Request, Response } from 'express';
import { AuthService } from '../../application/services/authService';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const user = await this.authService.authenticateUser(email, password);
            if (user) {
                req.login(user, (err) => {
                    if (err) {
                        return res.status(500).json({ message: 'Login failed' });
                    }
                    return res.status(200).json({ message: 'Login successful', user });
                });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    public logout(req: Request, res: Response): void {
        req.logout((err) => {
            if (err) {
                return res.status(500).json({ message: 'Logout failed' });
            }
            res.status(200).json({ message: 'Logout successful' });
        });
    }

    public async refreshToken(req: Request, res: Response): Promise<void> {
        try {
            const { refreshToken } = req.body;
            const newTokens = await this.authService.refreshTokens(refreshToken);
            if (newTokens) {
                res.status(200).json(newTokens);
            } else {
                res.status(401).json({ message: 'Invalid refresh token' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }
}