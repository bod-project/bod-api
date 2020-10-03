import {UserService} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {compare} from 'bcryptjs';
// User --> AppUser
import {AppUser} from '../models';
// UserRepository --> AppUserRepository
import {AppUserRepository} from '../repositories';

export type Credentials = {
  email: string;
  password: string;
};

// User --> AppUser
export class AppUserService implements UserService<AppUser, Credentials> {
  constructor(
    // UserRepository --> AppUserRepository
    @repository(AppUserRepository) public userRepository: AppUserRepository,
  ) {}

  // User --> AppUser
  async verifyCredentials(credentials: Credentials): Promise<AppUser> {
    const invalidCredentialsError = 'Invalid email or password.';

    const foundUser = await this.userRepository.findOne({
      where: {email: credentials.email},
    });
    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const credentialsFound = await this.userRepository.findCredentials(
      foundUser.id,
    );
    if (!credentialsFound) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const passwordMatched = await compare(
      credentials.password,
      credentialsFound.password,
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    return foundUser;
  }

  // User --> AppUser
  convertToUserProfile(user: AppUser): UserProfile {
    return {
      [securityId]: user.id.toString(),
      name: user.username,
      id: user.id,
      email: user.email,
    };
  }
}
