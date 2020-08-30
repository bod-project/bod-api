import {DefaultCrudRepository} from '@loopback/repository';
import {SessionItem, SessionItemRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SessionItemRepository extends DefaultCrudRepository<
  SessionItem,
  typeof SessionItem.prototype.id,
  SessionItemRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(SessionItem, dataSource);
  }
}
