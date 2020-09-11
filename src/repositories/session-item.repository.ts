import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {SessionItem, SessionItemRelations, Exercise, SessionItemStatistic} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ExerciseRepository} from './exercise.repository';
import {SessionItemStatisticRepository} from './session-item-statistic.repository';

export class SessionItemRepository extends DefaultCrudRepository<
  SessionItem,
  typeof SessionItem.prototype.id,
  SessionItemRelations
> {

  public readonly exercise: BelongsToAccessor<Exercise, typeof SessionItem.prototype.id>;

  public readonly sessionItemStatistic: HasOneRepositoryFactory<SessionItemStatistic, typeof SessionItem.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ExerciseRepository') protected exerciseRepositoryGetter: Getter<ExerciseRepository>, @repository.getter('SessionItemStatisticRepository') protected sessionItemStatisticRepositoryGetter: Getter<SessionItemStatisticRepository>,
  ) {
    super(SessionItem, dataSource);
    this.sessionItemStatistic = this.createHasOneRepositoryFactoryFor('sessionItemStatistic', sessionItemStatisticRepositoryGetter);
    this.registerInclusionResolver('sessionItemStatistic', this.sessionItemStatistic.inclusionResolver);
    this.exercise = this.createBelongsToAccessorFor('exercise', exerciseRepositoryGetter,);
    this.registerInclusionResolver('exercise', this.exercise.inclusionResolver);
  }
}
