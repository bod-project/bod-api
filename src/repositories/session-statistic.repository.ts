import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {SessionStatistic, SessionStatisticRelations, Session, SessionItemStatistic} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {SessionRepository} from './session.repository';
import {SessionItemStatisticRepository} from './session-item-statistic.repository';

export class SessionStatisticRepository extends DefaultCrudRepository<
  SessionStatistic,
  typeof SessionStatistic.prototype.id,
  SessionStatisticRelations
> {

  public readonly session: BelongsToAccessor<Session, typeof SessionStatistic.prototype.id>;

  public readonly sessionItemStatistics: HasManyRepositoryFactory<SessionItemStatistic, typeof SessionStatistic.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('SessionRepository') protected sessionRepositoryGetter: Getter<SessionRepository>, @repository.getter('SessionItemStatisticRepository') protected sessionItemStatisticRepositoryGetter: Getter<SessionItemStatisticRepository>,
  ) {
    super(SessionStatistic, dataSource);
    this.sessionItemStatistics = this.createHasManyRepositoryFactoryFor('sessionItemStatistics', sessionItemStatisticRepositoryGetter,);
    this.registerInclusionResolver('sessionItemStatistics', this.sessionItemStatistics.inclusionResolver);
    this.session = this.createBelongsToAccessorFor('session', sessionRepositoryGetter,);
    this.registerInclusionResolver('session', this.session.inclusionResolver);
  }
}
