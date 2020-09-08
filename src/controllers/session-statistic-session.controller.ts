import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SessionStatistic,
  Session,
} from '../models';
import {SessionStatisticRepository} from '../repositories';

export class SessionStatisticSessionController {
  constructor(
    @repository(SessionStatisticRepository)
    public sessionStatisticRepository: SessionStatisticRepository,
  ) { }

  @get('/session-statistics/{id}/session', {
    responses: {
      '200': {
        description: 'Session belonging to SessionStatistic',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Session)},
          },
        },
      },
    },
  })
  async getSession(
    @param.path.number('id') id: typeof SessionStatistic.prototype.id,
  ): Promise<Session> {
    return this.sessionStatisticRepository.session(id);
  }
}
