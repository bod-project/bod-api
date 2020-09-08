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
  SessionStatistic,
  SessionItemStatistic,
} from '../models';
import {SessionStatisticRepository} from '../repositories';

export class SessionStatisticSessionItemStatisticController {
  constructor(
    @repository(SessionStatisticRepository) protected sessionStatisticRepository: SessionStatisticRepository,
  ) { }

  @get('/session-statistics/{id}/session-item-statistics', {
    responses: {
      '200': {
        description: 'Array of SessionStatistic has many SessionItemStatistic',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SessionItemStatistic)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<SessionItemStatistic>,
  ): Promise<SessionItemStatistic[]> {
    return this.sessionStatisticRepository.sessionItemStatistics(id).find(filter);
  }

  @post('/session-statistics/{id}/session-item-statistics', {
    responses: {
      '200': {
        description: 'SessionStatistic model instance',
        content: {'application/json': {schema: getModelSchemaRef(SessionItemStatistic)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof SessionStatistic.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionItemStatistic, {
            title: 'NewSessionItemStatisticInSessionStatistic',
            exclude: ['id'],
            optional: ['sessionStatisticId']
          }),
        },
      },
    }) sessionItemStatistic: Omit<SessionItemStatistic, 'id'>,
  ): Promise<SessionItemStatistic> {
    return this.sessionStatisticRepository.sessionItemStatistics(id).create(sessionItemStatistic);
  }

  @patch('/session-statistics/{id}/session-item-statistics', {
    responses: {
      '200': {
        description: 'SessionStatistic.SessionItemStatistic PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionItemStatistic, {partial: true}),
        },
      },
    })
    sessionItemStatistic: Partial<SessionItemStatistic>,
    @param.query.object('where', getWhereSchemaFor(SessionItemStatistic)) where?: Where<SessionItemStatistic>,
  ): Promise<Count> {
    return this.sessionStatisticRepository.sessionItemStatistics(id).patch(sessionItemStatistic, where);
  }

  @del('/session-statistics/{id}/session-item-statistics', {
    responses: {
      '200': {
        description: 'SessionStatistic.SessionItemStatistic DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SessionItemStatistic)) where?: Where<SessionItemStatistic>,
  ): Promise<Count> {
    return this.sessionStatisticRepository.sessionItemStatistics(id).delete(where);
  }
}
