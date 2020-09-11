import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {Session, SessionRelations, SessionItem, SessionStatistic} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {SessionItemRepository} from './session-item.repository';
import {SessionStatisticRepository} from './session-statistic.repository';

export class SessionRepository extends DefaultCrudRepository<
  Session,
  typeof Session.prototype.id,
  SessionRelations
> {

  public readonly sessionItems: HasManyRepositoryFactory<SessionItem, typeof Session.prototype.id>;

  public readonly sessionStatistic: HasOneRepositoryFactory<SessionStatistic, typeof Session.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('SessionItemRepository') protected sessionItemRepositoryGetter: Getter<SessionItemRepository>, @repository.getter('SessionStatisticRepository') protected sessionStatisticRepositoryGetter: Getter<SessionStatisticRepository>,
  ) {
    super(Session, dataSource);
    this.sessionStatistic = this.createHasOneRepositoryFactoryFor('sessionStatistic', sessionStatisticRepositoryGetter);
    this.registerInclusionResolver('sessionStatistic', this.sessionStatistic.inclusionResolver);
    this.sessionItems = this.createHasManyRepositoryFactoryFor('sessionItems', sessionItemRepositoryGetter,);
    this.registerInclusionResolver('sessionItems', this.sessionItems.inclusionResolver);
  }
}
