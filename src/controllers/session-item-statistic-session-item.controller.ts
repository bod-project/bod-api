import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SessionItemStatistic,
  SessionItem,
} from '../models';
import {SessionItemStatisticRepository} from '../repositories';

export class SessionItemStatisticSessionItemController {
  constructor(
    @repository(SessionItemStatisticRepository)
    public sessionItemStatisticRepository: SessionItemStatisticRepository,
  ) { }

  @get('/session-item-statistics/{id}/session-item', {
    responses: {
      '200': {
        description: 'SessionItem belonging to SessionItemStatistic',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SessionItem)},
          },
        },
      },
    },
  })
  async getSessionItem(
    @param.path.number('id') id: typeof SessionItemStatistic.prototype.id,
  ): Promise<SessionItem> {
    return this.sessionItemStatisticRepository.sessionItem(id);
  }
}
