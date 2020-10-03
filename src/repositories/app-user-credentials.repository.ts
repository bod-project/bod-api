import {DefaultCrudRepository} from '@loopback/repository';
import {AppUserCredentials, AppUserCredentialsRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AppUserCredentialsRepository extends DefaultCrudRepository<
  AppUserCredentials,
  typeof AppUserCredentials.prototype.id,
  AppUserCredentialsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(AppUserCredentials, dataSource);
  }
}
