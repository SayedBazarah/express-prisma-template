import { Strategy as LocalStrategy } from 'passport-local';
import { UserRepository } from '../../../domain/repositories/userRepository';
import { User } from '../../../domain/models/user';

export class LocalStrategyConfig {
  constructor(private userRepository: UserRepository) {}

  public initialize() {
    return new LocalStrategy(
      { usernameField: 'email' },
      async (email: string, password: string, done: Function) => {
        try {
          const user: User | null = await this.userRepository.findByEmail(email);
          if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
          }

          // Here you would normally check the password
          // For example, using bcrypt to compare hashed passwords
          const isPasswordValid = password === user.password; // Replace with actual password check
          if (!isPasswordValid) {
            return done(null, false, { message: 'Incorrect password.' });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    );
  }
}