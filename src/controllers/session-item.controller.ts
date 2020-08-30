import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {SessionItem} from '../models';
import {SessionItemRepository} from '../repositories';

export class SessionItemController {
  constructor(
    @repository(SessionItemRepository)
    public sessionItemRepository : SessionItemRepository,
  ) {}

  @post('/session-items', {
    responses: {
      '200': {
        description: 'SessionItem model instance',
        content: {'application/json': {schema: getModelSchemaRef(SessionItem)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionItem, {
            title: 'NewSessionItem',
            exclude: ['id'],
          }),
        },
      },
    })
    sessionItem: Omit<SessionItem, 'id'>,
  ): Promise<SessionItem> {
    return this.sessionItemRepository.create(sessionItem);
  }

  @get('/session-items/count', {
    responses: {
      '200': {
        description: 'SessionItem model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(SessionItem) where?: Where<SessionItem>,
  ): Promise<Count> {
    return this.sessionItemRepository.count(where);
  }

  @get('/session-items', {
    responses: {
      '200': {
        description: 'Array of SessionItem model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(SessionItem, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(SessionItem) filter?: Filter<SessionItem>,
  ): Promise<SessionItem[]> {
    return this.sessionItemRepository.find(filter);
  }

  @patch('/session-items', {
    responses: {
      '200': {
        description: 'SessionItem PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionItem, {partial: true}),
        },
      },
    })
    sessionItem: SessionItem,
    @param.where(SessionItem) where?: Where<SessionItem>,
  ): Promise<Count> {
    return this.sessionItemRepository.updateAll(sessionItem, where);
  }

  @get('/session-items/{id}', {
    responses: {
      '200': {
        description: 'SessionItem model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SessionItem, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SessionItem, {exclude: 'where'}) filter?: FilterExcludingWhere<SessionItem>
  ): Promise<SessionItem> {
    return this.sessionItemRepository.findById(id, filter);
  }

  @patch('/session-items/{id}', {
    responses: {
      '204': {
        description: 'SessionItem PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionItem, {partial: true}),
        },
      },
    })
    sessionItem: SessionItem,
  ): Promise<void> {
    await this.sessionItemRepository.updateById(id, sessionItem);
  }

  @put('/session-items/{id}', {
    responses: {
      '204': {
        description: 'SessionItem PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() sessionItem: SessionItem,
  ): Promise<void> {
    await this.sessionItemRepository.replaceById(id, sessionItem);
  }

  @del('/session-items/{id}', {
    responses: {
      '204': {
        description: 'SessionItem DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.sessionItemRepository.deleteById(id);
  }
}
