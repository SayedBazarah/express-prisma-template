import { UserRepository } from '../../domain/repositories/userRepository';
import { User } from '../../domain/models/user';
import { RedisClient } from 'redis';
import { promisify } from 'util';

export class UserRepositoryImpl implements UserRepository {
    private redisClient: RedisClient;
    private getAsync: (key: string) => Promise<string | null>;
    private setAsync: (key: string, value: string) => Promise<string>;

    constructor(redisClient: RedisClient) {
        this.redisClient = redisClient;
        this.getAsync = promisify(this.redisClient.get).bind(this.redisClient);
        this.setAsync = promisify(this.redisClient.set).bind(this.redisClient);
    }

    async findByEmail(email: string): Promise<User | null> {
        const userData = await this.getAsync(`user:${email}`);
        return userData ? JSON.parse(userData) : null;
    }

    async save(user: User): Promise<void> {
        await this.setAsync(`user:${user.email}`, JSON.stringify(user));
    }
}