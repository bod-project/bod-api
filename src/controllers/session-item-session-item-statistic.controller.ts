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
  SessionItem,
  SessionItemStatistic,
} from '../models';
import {SessionItemRepository} from '../repositories';

export class SessionItemSessionItemStatisticController {
  constructor(
    @repository(SessionItemRepository) protected sessionItemRepository: SessionItemRepository,
  ) { }

  @get('/session-items/{id}/session-item-statistic', {
    responses: {
      '200': {
        description: 'SessionItem has one SessionItemStatistic',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SessionItemStatistic),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<SessionItemStatistic>,
  ): Promise<SessionItemStatistic> {
    return this.sessionItemRepository.sessionItemStatistic(id).get(filter);
  }

  @post('/session-items/{id}/session-item-statistic', {
    responses: {
      '200': {
        description: 'SessionItem model instance',
        content: {'application/json': {schema: getModelSchemaRef(SessionItemStatistic)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof SessionItem.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionItemStatistic, {
            title: 'NewSessionItemStatisticInSessionItem',
            exclude: ['id'],
            optional: ['sessionItemId']
          }),
        },
      },
    }) sessionItemStatistic: Omit<SessionItemStatistic, 'id'>,
  ): Promise<SessionItemStatistic> {
    return this.sessionItemRepository.sessionItemStatistic(id).create(sessionItemStatistic);
  }

  @patch('/session-items/{id}/session-item-statistic', {
    responses: {
      '200': {
        description: 'SessionItem.SessionItemStatistic PATCH success count',
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
    return this.sessionItemRepository.sessionItemStatistic(id).patch(sessionItemStatistic, where);
  }

  @del('/session-items/{id}/session-item-statistic', {
    responses: {
      '200': {
        description: 'SessionItem.SessionItemStatistic DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SessionItemStatistic)) where?: Where<SessionItemStatistic>,
  ): Promise<Count> {
    return this.sessionItemRepository.sessionItemStatistic(id).delete(where);
  }
}
