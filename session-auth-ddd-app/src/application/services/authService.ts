import { sign, verify } from 'jsonwebtoken';
import { User } from '../../domain/models/user';
import { UserRepository } from '../../domain/repositories/userRepository';

export class AuthService {
    private userRepository: UserRepository;
    private accessTokenSecret: string;
    private refreshTokenSecret: string;

    constructor(userRepository: UserRepository, accessTokenSecret: string, refreshTokenSecret: string) {
        this.userRepository = userRepository;
        this.accessTokenSecret = accessTokenSecret;
        this.refreshTokenSecret = refreshTokenSecret;
    }

    generateAccessToken(user: User): string {
        return sign({ email: user.email }, this.accessTokenSecret, { expiresIn: '15m' });
    }

    generateRefreshToken(user: User): string {
        return sign({ email: user.email }, this.refreshTokenSecret, { expiresIn: '7d' });
    }

    validateAccessToken(token: string): any {
        try {
            return verify(token, this.accessTokenSecret);
        } catch (error) {
            return null;
        }
    }

    validateRefreshToken(token: string): any {
        try {
            return verify(token, this.refreshTokenSecret);
        } catch (error) {
            return null;
        }
    }

    async authenticateUser(email: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findByEmail(email);
        if (user && user.password === password) {
            return user;
        }
        return null;
    }
}