import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {Program, ProgramRelations, Week, ProgramStatistic} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {WeekRepository} from './week.repository';
import {ProgramStatisticRepository} from './program-statistic.repository';

export class ProgramRepository extends DefaultCrudRepository<
  Program,
  typeof Program.prototype.id,
  ProgramRelations
> {

  public readonly weeks: HasManyRepositoryFactory<Week, typeof Program.prototype.id>;

  public readonly programStatistic: HasOneRepositoryFactory<ProgramStatistic, typeof Program.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('WeekRepository') protected weekRepositoryGetter: Getter<WeekRepository>, @repository.getter('ProgramStatisticRepository') protected programStatisticRepositoryGetter: Getter<ProgramStatisticRepository>,
  ) {
    super(Program, dataSource);
    this.programStatistic = this.createHasOneRepositoryFactoryFor('programStatistic', programStatisticRepositoryGetter);
    this.registerInclusionResolver('programStatistic', this.programStatistic.inclusionResolver);
    this.weeks = this.createHasManyRepositoryFactoryFor('weeks', weekRepositoryGetter,);
    this.registerInclusionResolver('weeks', this.weeks.inclusionResolver);
  }
}
