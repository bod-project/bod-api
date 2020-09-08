import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {WeekStatistic, WeekStatisticRelations, Week, SessionStatistic} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {WeekRepository} from './week.repository';
import {SessionStatisticRepository} from './session-statistic.repository';

export class WeekStatisticRepository extends DefaultCrudRepository<
  WeekStatistic,
  typeof WeekStatistic.prototype.id,
  WeekStatisticRelations
> {

  public readonly week: BelongsToAccessor<Week, typeof WeekStatistic.prototype.id>;

  public readonly sessionStatistics: HasManyRepositoryFactory<SessionStatistic, typeof WeekStatistic.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('WeekRepository') protected weekRepositoryGetter: Getter<WeekRepository>, @repository.getter('SessionStatisticRepository') protected sessionStatisticRepositoryGetter: Getter<SessionStatisticRepository>,
  ) {
    super(WeekStatistic, dataSource);
    this.sessionStatistics = this.createHasManyRepositoryFactoryFor('sessionStatistics', sessionStatisticRepositoryGetter,);
    this.registerInclusionResolver('sessionStatistics', this.sessionStatistics.inclusionResolver);
    this.week = this.createBelongsToAccessorFor('week', weekRepositoryGetter,);
    this.registerInclusionResolver('week', this.week.inclusionResolver);
  }
}
