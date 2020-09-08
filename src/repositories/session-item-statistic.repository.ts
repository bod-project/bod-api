import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {SessionItemStatistic, SessionItemStatisticRelations, SessionItem, SetStatistic} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {SessionItemRepository} from './session-item.repository';
import {SetStatisticRepository} from './set-statistic.repository';

export class SessionItemStatisticRepository extends DefaultCrudRepository<
  SessionItemStatistic,
  typeof SessionItemStatistic.prototype.id,
  SessionItemStatisticRelations
> {

  public readonly sessionItem: BelongsToAccessor<SessionItem, typeof SessionItemStatistic.prototype.id>;

  public readonly setStatistics: HasManyRepositoryFactory<SetStatistic, typeof SessionItemStatistic.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('SessionItemRepository') protected sessionItemRepositoryGetter: Getter<SessionItemRepository>, @repository.getter('SetStatisticRepository') protected setStatisticRepositoryGetter: Getter<SetStatisticRepository>,
  ) {
    super(SessionItemStatistic, dataSource);
    this.setStatistics = this.createHasManyRepositoryFactoryFor('setStatistics', setStatisticRepositoryGetter,);
    this.registerInclusionResolver('setStatistics', this.setStatistics.inclusionResolver);
    this.sessionItem = this.createBelongsToAccessorFor('sessionItem', sessionItemRepositoryGetter,);
    this.registerInclusionResolver('sessionItem', this.sessionItem.inclusionResolver);
  }
}
