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
  Week,
  WeekStatistic,
} from '../models';
import {WeekRepository} from '../repositories';

export class WeekWeekStatisticController {
  constructor(
    @repository(WeekRepository) protected weekRepository: WeekRepository,
  ) { }

  @get('/weeks/{id}/week-statistic', {
    responses: {
      '200': {
        description: 'Week has one WeekStatistic',
        content: {
          'application/json': {
            schema: getModelSchemaRef(WeekStatistic),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<WeekStatistic>,
  ): Promise<WeekStatistic> {
    return this.weekRepository.weekStatistic(id).get(filter);
  }

  @post('/weeks/{id}/week-statistic', {
    responses: {
      '200': {
        description: 'Week model instance',
        content: {'application/json': {schema: getModelSchemaRef(WeekStatistic)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Week.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WeekStatistic, {
            title: 'NewWeekStatisticInWeek',
            exclude: ['id'],
            optional: ['weekId']
          }),
        },
      },
    }) weekStatistic: Omit<WeekStatistic, 'id'>,
  ): Promise<WeekStatistic> {
    return this.weekRepository.weekStatistic(id).create(weekStatistic);
  }

  @patch('/weeks/{id}/week-statistic', {
    responses: {
      '200': {
        description: 'Week.WeekStatistic PATCH success count',
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
    return this.weekRepository.weekStatistic(id).patch(weekStatistic, where);
  }

  @del('/weeks/{id}/week-statistic', {
    responses: {
      '200': {
        description: 'Week.WeekStatistic DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(WeekStatistic)) where?: Where<WeekStatistic>,
  ): Promise<Count> {
    return this.weekRepository.weekStatistic(id).delete(where);
  }
}
