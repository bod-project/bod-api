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
  Program,
  ProgramStatistic,
} from '../models';
import {ProgramRepository} from '../repositories';

export class ProgramProgramStatisticController {
  constructor(
    @repository(ProgramRepository) protected programRepository: ProgramRepository,
  ) { }

  @get('/programs/{id}/program-statistic', {
    responses: {
      '200': {
        description: 'Program has one ProgramStatistic',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ProgramStatistic),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ProgramStatistic>,
  ): Promise<ProgramStatistic> {
    return this.programRepository.programStatistic(id).get(filter);
  }

  @post('/programs/{id}/program-statistic', {
    responses: {
      '200': {
        description: 'Program model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProgramStatistic)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Program.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProgramStatistic, {
            title: 'NewProgramStatisticInProgram',
            exclude: ['id'],
            optional: ['programId']
          }),
        },
      },
    }) programStatistic: Omit<ProgramStatistic, 'id'>,
  ): Promise<ProgramStatistic> {
    return this.programRepository.programStatistic(id).create(programStatistic);
  }

  @patch('/programs/{id}/program-statistic', {
    responses: {
      '200': {
        description: 'Program.ProgramStatistic PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProgramStatistic, {partial: true}),
        },
      },
    })
    programStatistic: Partial<ProgramStatistic>,
    @param.query.object('where', getWhereSchemaFor(ProgramStatistic)) where?: Where<ProgramStatistic>,
  ): Promise<Count> {
    return this.programRepository.programStatistic(id).patch(programStatistic, where);
  }

  @del('/programs/{id}/program-statistic', {
    responses: {
      '200': {
        description: 'Program.ProgramStatistic DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProgramStatistic)) where?: Where<ProgramStatistic>,
  ): Promise<Count> {
    return this.programRepository.programStatistic(id).delete(where);
  }
}
