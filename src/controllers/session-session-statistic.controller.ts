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
  Session,
  SessionStatistic,
} from '../models';
import {SessionRepository} from '../repositories';

export class SessionSessionStatisticController {
  constructor(
    @repository(SessionRepository) protected sessionRepository: SessionRepository,
  ) { }

  @get('/sessions/{id}/session-statistic', {
    responses: {
      '200': {
        description: 'Session has one SessionStatistic',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SessionStatistic),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<SessionStatistic>,
  ): Promise<SessionStatistic> {
    return this.sessionRepository.sessionStatistic(id).get(filter);
  }

  @post('/sessions/{id}/session-statistic', {
    responses: {
      '200': {
        description: 'Session model instance',
        content: {'application/json': {schema: getModelSchemaRef(SessionStatistic)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Session.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionStatistic, {
            title: 'NewSessionStatisticInSession',
            exclude: ['id'],
            optional: ['sessionId']
          }),
        },
      },
    }) sessionStatistic: Omit<SessionStatistic, 'id'>,
  ): Promise<SessionStatistic> {
    return this.sessionRepository.sessionStatistic(id).create(sessionStatistic);
  }

  @patch('/sessions/{id}/session-statistic', {
    responses: {
      '200': {
        description: 'Session.SessionStatistic PATCH success count',
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
    return this.sessionRepository.sessionStatistic(id).patch(sessionStatistic, where);
  }

  @del('/sessions/{id}/session-statistic', {
    responses: {
      '200': {
        description: 'Session.SessionStatistic DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SessionStatistic)) where?: Where<SessionStatistic>,
  ): Promise<Count> {
    return this.sessionRepository.sessionStatistic(id).delete(where);
  }
}
