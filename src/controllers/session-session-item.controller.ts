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
  SessionItem,
} from '../models';
import {SessionRepository} from '../repositories';

export class SessionSessionItemController {
  constructor(
    @repository(SessionRepository) protected sessionRepository: SessionRepository,
  ) { }

  @get('/sessions/{id}/session-items', {
    responses: {
      '200': {
        description: 'Array of Session has many SessionItem',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SessionItem)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<SessionItem>,
  ): Promise<SessionItem[]> {
    return this.sessionRepository.sessionItems(id).find(filter);
  }

  @post('/sessions/{id}/session-items', {
    responses: {
      '200': {
        description: 'Session model instance',
        content: {'application/json': {schema: getModelSchemaRef(SessionItem)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Session.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionItem, {
            title: 'NewSessionItemInSession',
            exclude: ['id'],
            optional: ['sessionId']
          }),
        },
      },
    }) sessionItem: Omit<SessionItem, 'id'>,
  ): Promise<SessionItem> {
    return this.sessionRepository.sessionItems(id).create(sessionItem);
  }

  @patch('/sessions/{id}/session-items', {
    responses: {
      '200': {
        description: 'Session.SessionItem PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionItem, {partial: true}),
        },
      },
    })
    sessionItem: Partial<SessionItem>,
    @param.query.object('where', getWhereSchemaFor(SessionItem)) where?: Where<SessionItem>,
  ): Promise<Count> {
    return this.sessionRepository.sessionItems(id).patch(sessionItem, where);
  }

  @del('/sessions/{id}/session-items', {
    responses: {
      '200': {
        description: 'Session.SessionItem DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SessionItem)) where?: Where<SessionItem>,
  ): Promise<Count> {
    return this.sessionRepository.sessionItems(id).delete(where);
  }
}
