// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/authentication-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

// import {UserServiceBindings} from '../keys';
import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasOneRepositoryFactory,
  juggler,
  repository,
} from '@loopback/repository';
import {AppUser, AppUserCredentials, AppUserRelations} from '../models';
import {AppUserCredentialsRepository} from './app-user-credentials.repository';

export class AppUserRepository extends DefaultCrudRepository<
  AppUser,
  typeof AppUser.prototype.id,
  AppUserRelations
> {
  public readonly userCredentials: HasOneRepositoryFactory<
    AppUserCredentials,
    typeof AppUser.prototype.id
  >;

  constructor(
    // @inject(`datasources.${UserServiceBindings.DATASOURCE_NAME}`)
    // manually setting datasource name here to avoid importing keys from
    //  @loopback/authentication-jwt/src/keys
    @inject('datasources.jwtdb')
    dataSource: juggler.DataSource,
    @repository.getter('AppUserCredentialsRepository')
    protected userCredentialsRepositoryGetter: Getter<
      AppUserCredentialsRepository
    >,
  ) {
    super(AppUser, dataSource);
    this.userCredentials = this.createHasOneRepositoryFactoryFor(
      'userCredentials',
      userCredentialsRepositoryGetter,
    );
    this.registerInclusionResolver(
      'userCredentials',
      this.userCredentials.inclusionResolver,
    );
  }

  async findCredentials(
    userId: typeof AppUser.prototype.id,
  ): Promise<AppUserCredentials | undefined> {
    try {
      return await this.userCredentials(userId).get();
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}
