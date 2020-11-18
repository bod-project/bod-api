// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-passport-login
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {UserIdentityService} from '@loopback/authentication';
import {securityId, UserProfile} from '@loopback/security';
import axios from 'axios';
import {sign} from 'jsonwebtoken';
import {Profile} from 'passport';
import {User} from '../models';

export type ProfileFunction = (
  accessToken: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  done: (err?: Error | null, profile?: any) => void,
) => void;

export type VerifyFunction = (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  done: (error: any, user?: any, info?: any) => void,
) => void;

export namespace PassportAuthenticationBindings {
  export const OAUTH2_STRATEGY = 'passport.authentication.oauth2.strategy';
}

export const oauth2ProfileFunction: ProfileFunction = (
  accessToken: string,
  done,
) => {
  // call the profile url in the mock authorization app with the accessToken
  axios
    .get('http://localhost:9000/verify?access_token=' + accessToken, {
      headers: {Authorization: accessToken},
    })
    .then(response => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const profile: any = response.data;
      profile.id = profile.userId;
      profile.emails = [{value: profile.email}];
      profile.provider = 'custom-oauth2';
      done(null, profile);
    })
    .catch(err => {
      done(err);
    });
};

/**
 * provides an appropriate verify function for oauth2 strategies
 * @param accessToken
 * @param refreshToken
 * @param profile
 * @param done
 */
export const verifyFunctionFactory = function (
  userService: UserIdentityService<Profile, User>,
): VerifyFunction {
  return function (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    done: (error: any, user?: any, info?: any) => void,
  ) {
    /**
     * TODO: jwt goes here then added to the user
     */
    const secret =
      'rZgD+Rgw5khvyCfrziJKsKW3nodYp5CPusyPs8efAE0dz+W8Lp4UIujxHOriV97PhDXDAq2ZBvVhUq/U2x7dSYVfxYlltxyMZDGBKXk3YB0CY6WgXMD6kDntdKnVExmQ7solsk1J7k/IGzjbSBMTddQykeVF37aje9xLAr2eScJqAwQln5TOshA9NOhhdRJls30UBth4LnApTE+rnPl5VS/uq6QD5u+nXMUZUnL7RtxBqxqyn/IEo3lEBRTnOrRBWq2ZCFAZJ4/Lfc44zf4GKAgTgS63+D7FuWvdMeP+7L7kCu+AC/+yImW96IUO06OnQ0lXTGezXwxkyTobmYUNrg==';

    const jwt = sign({id: profile.id, provider: 'google'}, secret, {
      expiresIn: 3600,
    });
    console.log(jwt);

    // look up a linked user for the profile
    userService
      .findOrCreateUser(profile)
      .then((user: User) => {
        done(null, {profile: jwt});
      })
      .catch((err: Error) => {
        done(err);
      });
  };
};

/**
 * map passport profile to UserProfile in `@loopback/security`
 * @param user
 */
export const mapProfile = function (user: User): UserProfile {
  const userProfile: UserProfile = {
    [securityId]: '' + user.id,
    profile: {
      ...user,
    },
  };
  return userProfile;
};
