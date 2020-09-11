import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {Week, WeekRelations, Session, WeekStatistic} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {SessionRepository} from './session.repository';
import {WeekStatisticRepository} from './week-statistic.repository';

export class WeekRepository extends DefaultCrudRepository<
  Week,
  typeof Week.prototype.id,
  WeekRelations
> {

  public readonly sessions: HasManyRepositoryFactory<Session, typeof Week.prototype.id>;

  public readonly weekStatistic: HasOneRepositoryFactory<WeekStatistic, typeof Week.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('SessionRepository') protected sessionRepositoryGetter: Getter<SessionRepository>, @repository.getter('WeekStatisticRepository') protected weekStatisticRepositoryGetter: Getter<WeekStatisticRepository>,
  ) {
    super(Week, dataSource);
    this.weekStatistic = this.createHasOneRepositoryFactoryFor('weekStatistic', weekStatisticRepositoryGetter);
    this.registerInclusionResolver('weekStatistic', this.weekStatistic.inclusionResolver);
    this.sessions = this.createHasManyRepositoryFactoryFor('sessions', sessionRepositoryGetter,);
    this.registerInclusionResolver('sessions', this.sessions.inclusionResolver);
  }
}
