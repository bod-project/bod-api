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
  Week,
} from '../models';
import {ProgramRepository} from '../repositories';

export class ProgramWeekController {
  constructor(
    @repository(ProgramRepository) protected programRepository: ProgramRepository,
  ) { }

  @get('/programs/{id}/weeks', {
    responses: {
      '200': {
        description: 'Array of Program has many Week',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Week)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Week>,
  ): Promise<Week[]> {
    return this.programRepository.weeks(id).find(filter);
  }

  @post('/programs/{id}/weeks', {
    responses: {
      '200': {
        description: 'Program model instance',
        content: {'application/json': {schema: getModelSchemaRef(Week)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Program.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Week, {
            title: 'NewWeekInProgram',
            exclude: ['id'],
            optional: ['programId']
          }),
        },
      },
    }) week: Omit<Week, 'id'>,
  ): Promise<Week> {
    return this.programRepository.weeks(id).create(week);
  }

  @patch('/programs/{id}/weeks', {
    responses: {
      '200': {
        description: 'Program.Week PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Week, {partial: true}),
        },
      },
    })
    week: Partial<Week>,
    @param.query.object('where', getWhereSchemaFor(Week)) where?: Where<Week>,
  ): Promise<Count> {
    return this.programRepository.weeks(id).patch(week, where);
  }

  @del('/programs/{id}/weeks', {
    responses: {
      '200': {
        description: 'Program.Week DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Week)) where?: Where<Week>,
  ): Promise<Count> {
    return this.programRepository.weeks(id).delete(where);
  }
}
