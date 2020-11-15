import {inject} from '@loopback/core';
import {securityId, SecurityBindings, UserProfile} from '@loopback/security';
import {authenticate, TokenService} from '@loopback/authentication';
import {get} from '@loopback/rest';
import {repository} from '@loopback/repository';
import {
  TokenServiceBindings,
  UserServiceBindings,
  MyUserService,
} from '@loopback/authentication-jwt';
import {UserRepository} from '../repositories';

export class WhoAmIController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, {optional: true}) private user: UserProfile,
    @repository(UserRepository) protected userRepository: UserRepository,
  ) {}

  @authenticate('jwt')
  @get('/whoami')
  whoAmI(): string {
    return this.user[securityId];
  }

  @get('/hello')
  hello(): string {
    return 'Hello';
  }
}
