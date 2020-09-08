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
import {SessionStatistic} from '../models';
import {SessionStatisticRepository} from '../repositories';

export class SessionStatisticController {
  constructor(
    @repository(SessionStatisticRepository)
    public sessionStatisticRepository : SessionStatisticRepository,
  ) {}

  @post('/session-statistics', {
    responses: {
      '200': {
        description: 'SessionStatistic model instance',
        content: {'application/json': {schema: getModelSchemaRef(SessionStatistic)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionStatistic, {
            title: 'NewSessionStatistic',
            exclude: ['id'],
          }),
        },
      },
    })
    sessionStatistic: Omit<SessionStatistic, 'id'>,
  ): Promise<SessionStatistic> {
    return this.sessionStatisticRepository.create(sessionStatistic);
  }

  @get('/session-statistics/count', {
    responses: {
      '200': {
        description: 'SessionStatistic model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(SessionStatistic) where?: Where<SessionStatistic>,
  ): Promise<Count> {
    return this.sessionStatisticRepository.count(where);
  }

  @get('/session-statistics', {
    responses: {
      '200': {
        description: 'Array of SessionStatistic model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(SessionStatistic, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(SessionStatistic) filter?: Filter<SessionStatistic>,
  ): Promise<SessionStatistic[]> {
    return this.sessionStatisticRepository.find(filter);
  }

  @patch('/session-statistics', {
    responses: {
      '200': {
        description: 'SessionStatistic PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionStatistic, {partial: true}),
        },
      },
    })
    sessionStatistic: SessionStatistic,
    @param.where(SessionStatistic) where?: Where<SessionStatistic>,
  ): Promise<Count> {
    return this.sessionStatisticRepository.updateAll(sessionStatistic, where);
  }

  @get('/session-statistics/{id}', {
    responses: {
      '200': {
        description: 'SessionStatistic model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SessionStatistic, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SessionStatistic, {exclude: 'where'}) filter?: FilterExcludingWhere<SessionStatistic>
  ): Promise<SessionStatistic> {
    return this.sessionStatisticRepository.findById(id, filter);
  }

  @patch('/session-statistics/{id}', {
    responses: {
      '204': {
        description: 'SessionStatistic PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SessionStatistic, {partial: true}),
        },
      },
    })
    sessionStatistic: SessionStatistic,
  ): Promise<void> {
    await this.sessionStatisticRepository.updateById(id, sessionStatistic);
  }

  @put('/session-statistics/{id}', {
    responses: {
      '204': {
        description: 'SessionStatistic PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() sessionStatistic: SessionStatistic,
  ): Promise<void> {
    await this.sessionStatisticRepository.replaceById(id, sessionStatistic);
  }

  @del('/session-statistics/{id}', {
    responses: {
      '204': {
        description: 'SessionStatistic DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.sessionStatisticRepository.deleteById(id);
  }
}
