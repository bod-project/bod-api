import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MaxAttemptItem, MaxAttemptItemRelations, Exercise} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ExerciseRepository} from './exercise.repository';

export class MaxAttemptItemRepository extends DefaultCrudRepository<
  MaxAttemptItem,
  typeof MaxAttemptItem.prototype.id,
  MaxAttemptItemRelations
> {

  public readonly exercise: BelongsToAccessor<Exercise, typeof MaxAttemptItem.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ExerciseRepository') protected exerciseRepositoryGetter: Getter<ExerciseRepository>,
  ) {
    super(MaxAttemptItem, dataSource);
    this.exercise = this.createBelongsToAccessorFor('exercise', exerciseRepositoryGetter,);
    this.registerInclusionResolver('exercise', this.exercise.inclusionResolver);
  }
}
