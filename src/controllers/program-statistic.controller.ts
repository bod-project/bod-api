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
import {ProgramStatistic} from '../models';
import {ProgramStatisticRepository} from '../repositories';

export class ProgramStatisticController {
  constructor(
    @repository(ProgramStatisticRepository)
    public programStatisticRepository : ProgramStatisticRepository,
  ) {}

  @post('/program-statistics', {
    responses: {
      '200': {
        description: 'ProgramStatistic model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProgramStatistic)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProgramStatistic, {
            title: 'NewProgramStatistic',
            exclude: ['id'],
          }),
        },
      },
    })
    programStatistic: Omit<ProgramStatistic, 'id'>,
  ): Promise<ProgramStatistic> {
    return this.programStatisticRepository.create(programStatistic);
  }

  @get('/program-statistics/count', {
    responses: {
      '200': {
        description: 'ProgramStatistic model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(ProgramStatistic) where?: Where<ProgramStatistic>,
  ): Promise<Count> {
    return this.programStatisticRepository.count(where);
  }

  @get('/program-statistics', {
    responses: {
      '200': {
        description: 'Array of ProgramStatistic model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ProgramStatistic, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ProgramStatistic) filter?: Filter<ProgramStatistic>,
  ): Promise<ProgramStatistic[]> {
    return this.programStatisticRepository.find(filter);
  }

  @patch('/program-statistics', {
    responses: {
      '200': {
        description: 'ProgramStatistic PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProgramStatistic, {partial: true}),
        },
      },
    })
    programStatistic: ProgramStatistic,
    @param.where(ProgramStatistic) where?: Where<ProgramStatistic>,
  ): Promise<Count> {
    return this.programStatisticRepository.updateAll(programStatistic, where);
  }

  @get('/program-statistics/{id}', {
    responses: {
      '200': {
        description: 'ProgramStatistic model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ProgramStatistic, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ProgramStatistic, {exclude: 'where'}) filter?: FilterExcludingWhere<ProgramStatistic>
  ): Promise<ProgramStatistic> {
    return this.programStatisticRepository.findById(id, filter);
  }

  @patch('/program-statistics/{id}', {
    responses: {
      '204': {
        description: 'ProgramStatistic PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProgramStatistic, {partial: true}),
        },
      },
    })
    programStatistic: ProgramStatistic,
  ): Promise<void> {
    await this.programStatisticRepository.updateById(id, programStatistic);
  }

  @put('/program-statistics/{id}', {
    responses: {
      '204': {
        description: 'ProgramStatistic PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() programStatistic: ProgramStatistic,
  ): Promise<void> {
    await this.programStatisticRepository.replaceById(id, programStatistic);
  }

  @del('/program-statistics/{id}', {
    responses: {
      '204': {
        description: 'ProgramStatistic DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.programStatisticRepository.deleteById(id);
  }
}
