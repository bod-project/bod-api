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
import {WeekStatistic} from '../models';
import {WeekStatisticRepository} from '../repositories';

export class WeekStatisticController {
  constructor(
    @repository(WeekStatisticRepository)
    public weekStatisticRepository : WeekStatisticRepository,
  ) {}

  @post('/week-statistics', {
    responses: {
      '200': {
        description: 'WeekStatistic model instance',
        content: {'application/json': {schema: getModelSchemaRef(WeekStatistic)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WeekStatistic, {
            title: 'NewWeekStatistic',
            exclude: ['id'],
          }),
        },
      },
    })
    weekStatistic: Omit<WeekStatistic, 'id'>,
  ): Promise<WeekStatistic> {
    return this.weekStatisticRepository.create(weekStatistic);
  }

  @get('/week-statistics/count', {
    responses: {
      '200': {
        description: 'WeekStatistic model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(WeekStatistic) where?: Where<WeekStatistic>,
  ): Promise<Count> {
    return this.weekStatisticRepository.count(where);
  }

  @get('/week-statistics', {
    responses: {
      '200': {
        description: 'Array of WeekStatistic model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(WeekStatistic, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(WeekStatistic) filter?: Filter<WeekStatistic>,
  ): Promise<WeekStatistic[]> {
    return this.weekStatisticRepository.find(filter);
  }

  @patch('/week-statistics', {
    responses: {
      '200': {
        description: 'WeekStatistic PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WeekStatistic, {partial: true}),
        },
      },
    })
    weekStatistic: WeekStatistic,
    @param.where(WeekStatistic) where?: Where<WeekStatistic>,
  ): Promise<Count> {
    return this.weekStatisticRepository.updateAll(weekStatistic, where);
  }

  @get('/week-statistics/{id}', {
    responses: {
      '200': {
        description: 'WeekStatistic model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(WeekStatistic, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(WeekStatistic, {exclude: 'where'}) filter?: FilterExcludingWhere<WeekStatistic>
  ): Promise<WeekStatistic> {
    return this.weekStatisticRepository.findById(id, filter);
  }

  @patch('/week-statistics/{id}', {
    responses: {
      '204': {
        description: 'WeekStatistic PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WeekStatistic, {partial: true}),
        },
      },
    })
    weekStatistic: WeekStatistic,
  ): Promise<void> {
    await this.weekStatisticRepository.updateById(id, weekStatistic);
  }

  @put('/week-statistics/{id}', {
    responses: {
      '204': {
        description: 'WeekStatistic PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() weekStatistic: WeekStatistic,
  ): Promise<void> {
    await this.weekStatisticRepository.replaceById(id, weekStatistic);
  }

  @del('/week-statistics/{id}', {
    responses: {
      '204': {
        description: 'WeekStatistic DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.weekStatisticRepository.deleteById(id);
  }
}
