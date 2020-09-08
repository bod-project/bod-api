import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  ProgramStatistic,
  WeekStatistic,
} from '../models';
import {ProgramStatisticRepository} from '../repositories';

export class ProgramStatisticWeekStatisticController {
  constructor(
    @repository(ProgramStatisticRepository) protected programStatisticRepository: ProgramStatisticRepository,
  ) { }

  @get('/program-statistics/{id}/week-statistics', {
    responses: {
      '200': {
        description: 'Array of ProgramStatistic has many WeekStatistic',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(WeekStatistic)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<WeekStatistic>,
  ): Promise<WeekStatistic[]> {
    return this.programStatisticRepository.weekStatistics(id).find(filter);
  }

  @post('/program-statistics/{id}/week-statistics', {
    responses: {
      '200': {
        description: 'ProgramStatistic model instance',
        content: {'application/json': {schema: getModelSchemaRef(WeekStatistic)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ProgramStatistic.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WeekStatistic, {
            title: 'NewWeekStatisticInProgramStatistic',
            exclude: ['id'],
            optional: ['programStatisticId']
          }),
        },
      },
    }) weekStatistic: Omit<WeekStatistic, 'id'>,
  ): Promise<WeekStatistic> {
    return this.programStatisticRepository.weekStatistics(id).create(weekStatistic);
  }

  @patch('/program-statistics/{id}/week-statistics', {
    responses: {
      '200': {
        description: 'ProgramStatistic.WeekStatistic PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WeekStatistic, {partial: true}),
        },
      },
    })
    weekStatistic: Partial<WeekStatistic>,
    @param.query.object('where', getWhereSchemaFor(WeekStatistic)) where?: Where<WeekStatistic>,
  ): Promise<Count> {
    return this.programStatisticRepository.weekStatistics(id).patch(weekStatistic, where);
  }

  @del('/program-statistics/{id}/week-statistics', {
    responses: {
      '200': {
        description: 'ProgramStatistic.WeekStatistic DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(WeekStatistic)) where?: Where<WeekStatistic>,
  ): Promise<Count> {
    return this.programStatisticRepository.weekStatistics(id).delete(where);
  }
}
