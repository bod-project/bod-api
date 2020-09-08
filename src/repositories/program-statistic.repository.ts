import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ProgramStatistic, ProgramStatisticRelations, Program, WeekStatistic} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ProgramRepository} from './program.repository';
import {WeekStatisticRepository} from './week-statistic.repository';

export class ProgramStatisticRepository extends DefaultCrudRepository<
  ProgramStatistic,
  typeof ProgramStatistic.prototype.id,
  ProgramStatisticRelations
> {

  public readonly program: BelongsToAccessor<Program, typeof ProgramStatistic.prototype.id>;

  public readonly weekStatistics: HasManyRepositoryFactory<WeekStatistic, typeof ProgramStatistic.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ProgramRepository') protected programRepositoryGetter: Getter<ProgramRepository>, @repository.getter('WeekStatisticRepository') protected weekStatisticRepositoryGetter: Getter<WeekStatisticRepository>,
  ) {
    super(ProgramStatistic, dataSource);
    this.weekStatistics = this.createHasManyRepositoryFactoryFor('weekStatistics', weekStatisticRepositoryGetter,);
    this.registerInclusionResolver('weekStatistics', this.weekStatistics.inclusionResolver);
    this.program = this.createBelongsToAccessorFor('program', programRepositoryGetter,);
    this.registerInclusionResolver('program', this.program.inclusionResolver);
  }
}
