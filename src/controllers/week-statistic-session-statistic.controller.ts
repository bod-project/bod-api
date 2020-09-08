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
  WeekStatistic,
  SessionStatistic,
} from '../models';
import {WeekStatisticRepository} from '../repositories';

export class WeekStatisticSessionStatisticController {
  constructor(
    @repository(WeekStatisticRepository) protected weekStatisticRepository: WeekStatisticRepository,
  ) { }

  @get('/week-statistics/{id}/session-statistics', {
    responses: {
      '200': {
        description: 'Array of WeekStatistic has many SessionStatistic',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SessionStatistic)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<SessionStatistic>,
  ): Promise<SessionStatistic[]> {
    return this.weekStatisticRepository.sessionStatistics(id).find(filter);
  }

  @post('/week-statistics/{id}/session-statistics', {
    responses: {
      '200': {
        description: 'WeekStatistic model instance',
        content: {'application/json': {schema: getModelSchemaRef(SessionStatistic)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof WeekStatistic.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionStatistic, {
            title: 'NewSessionStatisticInWeekStatistic',
            exclude: ['id'],
            optional: ['weekStatisticId']
          }),
        },
      },
    }) sessionStatistic: Omit<SessionStatistic, 'id'>,
  ): Promise<SessionStatistic> {
    return this.weekStatisticRepository.sessionStatistics(id).create(sessionStatistic);
  }

  @patch('/week-statistics/{id}/session-statistics', {
    responses: {
      '200': {
        description: 'WeekStatistic.SessionStatistic PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionStatistic, {partial: true}),
        },
      },
    })
    sessionStatistic: Partial<SessionStatistic>,
    @param.query.object('where', getWhereSchemaFor(SessionStatistic)) where?: Where<SessionStatistic>,
  ): Promise<Count> {
    return this.weekStatisticRepository.sessionStatistics(id).patch(sessionStatistic, where);
  }

  @del('/week-statistics/{id}/session-statistics', {
    responses: {
      '200': {
        description: 'WeekStatistic.SessionStatistic DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SessionStatistic)) where?: Where<SessionStatistic>,
  ): Promise<Count> {
    return this.weekStatisticRepository.sessionStatistics(id).delete(where);
  }
}
