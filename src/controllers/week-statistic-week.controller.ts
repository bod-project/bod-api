import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  WeekStatistic,
  Week,
} from '../models';
import {WeekStatisticRepository} from '../repositories';

export class WeekStatisticWeekController {
  constructor(
    @repository(WeekStatisticRepository)
    public weekStatisticRepository: WeekStatisticRepository,
  ) { }

  @get('/week-statistics/{id}/week', {
    responses: {
      '200': {
        description: 'Week belonging to WeekStatistic',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Week)},
          },
        },
      },
    },
  })
  async getWeek(
    @param.path.number('id') id: typeof WeekStatistic.prototype.id,
  ): Promise<Week> {
    return this.weekStatisticRepository.week(id);
  }
}
