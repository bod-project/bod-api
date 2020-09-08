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
  SessionItemStatistic,
  SetStatistic,
} from '../models';
import {SessionItemStatisticRepository} from '../repositories';

export class SessionItemStatisticSetStatisticController {
  constructor(
    @repository(SessionItemStatisticRepository) protected sessionItemStatisticRepository: SessionItemStatisticRepository,
  ) { }

  @get('/session-item-statistics/{id}/set-statistics', {
    responses: {
      '200': {
        description: 'Array of SessionItemStatistic has many SetStatistic',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SetStatistic)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<SetStatistic>,
  ): Promise<SetStatistic[]> {
    return this.sessionItemStatisticRepository.setStatistics(id).find(filter);
  }

  @post('/session-item-statistics/{id}/set-statistics', {
    responses: {
      '200': {
        description: 'SessionItemStatistic model instance',
        content: {'application/json': {schema: getModelSchemaRef(SetStatistic)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof SessionItemStatistic.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SetStatistic, {
            title: 'NewSetStatisticInSessionItemStatistic',
            exclude: ['id'],
            optional: ['sessionItemStatisticId']
          }),
        },
      },
    }) setStatistic: Omit<SetStatistic, 'id'>,
  ): Promise<SetStatistic> {
    return this.sessionItemStatisticRepository.setStatistics(id).create(setStatistic);
  }

  @patch('/session-item-statistics/{id}/set-statistics', {
    responses: {
      '200': {
        description: 'SessionItemStatistic.SetStatistic PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SetStatistic, {partial: true}),
        },
      },
    })
    setStatistic: Partial<SetStatistic>,
    @param.query.object('where', getWhereSchemaFor(SetStatistic)) where?: Where<SetStatistic>,
  ): Promise<Count> {
    return this.sessionItemStatisticRepository.setStatistics(id).patch(setStatistic, where);
  }

  @del('/session-item-statistics/{id}/set-statistics', {
    responses: {
      '200': {
        description: 'SessionItemStatistic.SetStatistic DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SetStatistic)) where?: Where<SetStatistic>,
  ): Promise<Count> {
    return this.sessionItemStatisticRepository.setStatistics(id).delete(where);
  }
}
