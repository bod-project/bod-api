import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Session, SessionRelations, SessionItem} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {SessionItemRepository} from './session-item.repository';

export class SessionRepository extends DefaultCrudRepository<
  Session,
  typeof Session.prototype.id,
  SessionRelations
> {

  public readonly sessionItems: HasManyRepositoryFactory<SessionItem, typeof Session.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('SessionItemRepository') protected sessionItemRepositoryGetter: Getter<SessionItemRepository>,
  ) {
    super(Session, dataSource);
    this.sessionItems = this.createHasManyRepositoryFactoryFor('sessionItems', sessionItemRepositoryGetter,);
    this.registerInclusionResolver('sessionItems', this.sessionItems.inclusionResolver);
  }
}
