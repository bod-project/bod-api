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
import {SessionItemStatistic} from '../models';
import {SessionItemStatisticRepository} from '../repositories';

export class SessionItemStatisticController {
  constructor(
    @repository(SessionItemStatisticRepository)
    public sessionItemStatisticRepository : SessionItemStatisticRepository,
  ) {}

  @post('/session-item-statistics', {
    responses: {
      '200': {
        description: 'SessionItemStatistic model instance',
        content: {'application/json': {schema: getModelSchemaRef(SessionItemStatistic)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionItemStatistic, {
            title: 'NewSessionItemStatistic',
            exclude: ['id'],
          }),
        },
      },
    })
    sessionItemStatistic: Omit<SessionItemStatistic, 'id'>,
  ): Promise<SessionItemStatistic> {
    return this.sessionItemStatisticRepository.create(sessionItemStatistic);
  }

  @get('/session-item-statistics/count', {
    responses: {
      '200': {
        description: 'SessionItemStatistic model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(SessionItemStatistic) where?: Where<SessionItemStatistic>,
  ): Promise<Count> {
    return this.sessionItemStatisticRepository.count(where);
  }

  @get('/session-item-statistics', {
    responses: {
      '200': {
        description: 'Array of SessionItemStatistic model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(SessionItemStatistic, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(SessionItemStatistic) filter?: Filter<SessionItemStatistic>,
  ): Promise<SessionItemStatistic[]> {
    return this.sessionItemStatisticRepository.find(filter);
  }

  @patch('/session-item-statistics', {
    responses: {
      '200': {
        description: 'SessionItemStatistic PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionItemStatistic, {partial: true}),
        },
      },
    })
    sessionItemStatistic: SessionItemStatistic,
    @param.where(SessionItemStatistic) where?: Where<SessionItemStatistic>,
  ): Promise<Count> {
    return this.sessionItemStatisticRepository.updateAll(sessionItemStatistic, where);
  }

  @get('/session-item-statistics/{id}', {
    responses: {
      '200': {
        description: 'SessionItemStatistic model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SessionItemStatistic, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SessionItemStatistic, {exclude: 'where'}) filter?: FilterExcludingWhere<SessionItemStatistic>
  ): Promise<SessionItemStatistic> {
    return this.sessionItemStatisticRepository.findById(id, filter);
  }

  @patch('/session-item-statistics/{id}', {
    responses: {
      '204': {
        description: 'SessionItemStatistic PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionItemStatistic, {partial: true}),
        },
      },
    })
    sessionItemStatistic: SessionItemStatistic,
  ): Promise<void> {
    await this.sessionItemStatisticRepository.updateById(id, sessionItemStatistic);
  }

  @put('/session-item-statistics/{id}', {
    responses: {
      '204': {
        description: 'SessionItemStatistic PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() sessionItemStatistic: SessionItemStatistic,
  ): Promise<void> {
    await this.sessionItemStatisticRepository.replaceById(id, sessionItemStatistic);
  }

  @del('/session-item-statistics/{id}', {
    responses: {
      '204': {
        description: 'SessionItemStatistic DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.sessionItemStatisticRepository.deleteById(id);
  }
}
