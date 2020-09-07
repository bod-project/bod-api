import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Program, ProgramRelations, Week} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {WeekRepository} from './week.repository';

export class ProgramRepository extends DefaultCrudRepository<
  Program,
  typeof Program.prototype.id,
  ProgramRelations
> {

  public readonly weeks: HasManyRepositoryFactory<Week, typeof Program.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('WeekRepository') protected weekRepositoryGetter: Getter<WeekRepository>,
  ) {
    super(Program, dataSource);
    this.weeks = this.createHasManyRepositoryFactoryFor('weeks', weekRepositoryGetter,);
    this.registerInclusionResolver('weeks', this.weeks.inclusionResolver);
  }
}
