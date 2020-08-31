import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {SessionItem, SessionItemRelations, Exercise} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ExerciseRepository} from './exercise.repository';

export class SessionItemRepository extends DefaultCrudRepository<
  SessionItem,
  typeof SessionItem.prototype.id,
  SessionItemRelations
> {

  public readonly exercise: BelongsToAccessor<Exercise, typeof SessionItem.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ExerciseRepository') protected exerciseRepositoryGetter: Getter<ExerciseRepository>,
  ) {
    super(SessionItem, dataSource);
    this.exercise = this.createBelongsToAccessorFor('exercise', exerciseRepositoryGetter,);
    this.registerInclusionResolver('exercise', this.exercise.inclusionResolver);
  }
}
