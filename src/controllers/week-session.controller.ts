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
  Session,
} from '../models';
import {WeekRepository} from '../repositories';

export class WeekSessionController {
  constructor(
    @repository(WeekRepository) protected weekRepository: WeekRepository,
  ) { }

  @get('/weeks/{id}/sessions', {
    responses: {
      '200': {
        description: 'Array of Week has many Session',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Session)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Session>,
  ): Promise<Session[]> {
    return this.weekRepository.sessions(id).find(filter);
  }

  @post('/weeks/{id}/sessions', {
    responses: {
      '200': {
        description: 'Week model instance',
        content: {'application/json': {schema: getModelSchemaRef(Session)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Week.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Session, {
            title: 'NewSessionInWeek',
            exclude: ['id'],
            optional: ['weekId']
          }),
        },
      },
    }) session: Omit<Session, 'id'>,
  ): Promise<Session> {
    return this.weekRepository.sessions(id).create(session);
  }

  @patch('/weeks/{id}/sessions', {
    responses: {
      '200': {
        description: 'Week.Session PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Session, {partial: true}),
        },
      },
    })
    session: Partial<Session>,
    @param.query.object('where', getWhereSchemaFor(Session)) where?: Where<Session>,
  ): Promise<Count> {
    return this.weekRepository.sessions(id).patch(session, where);
  }

  @del('/weeks/{id}/sessions', {
    responses: {
      '200': {
        description: 'Week.Session DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Session)) where?: Where<Session>,
  ): Promise<Count> {
    return this.weekRepository.sessions(id).delete(where);
  }
}
