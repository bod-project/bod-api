import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ProgramStatistic,
  Program,
} from '../models';
import {ProgramStatisticRepository} from '../repositories';

export class ProgramStatisticProgramController {
  constructor(
    @repository(ProgramStatisticRepository)
    public programStatisticRepository: ProgramStatisticRepository,
  ) { }

  @get('/program-statistics/{id}/program', {
    responses: {
      '200': {
        description: 'Program belonging to ProgramStatistic',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Program)},
          },
        },
      },
    },
  })
  async getProgram(
    @param.path.number('id') id: typeof ProgramStatistic.prototype.id,
  ): Promise<Program> {
    return this.programStatisticRepository.program(id);
  }
}
