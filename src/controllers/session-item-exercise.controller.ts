import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SessionItem,
  Exercise,
} from '../models';
import {SessionItemRepository} from '../repositories';

export class SessionItemExerciseController {
  constructor(
    @repository(SessionItemRepository)
    public sessionItemRepository: SessionItemRepository,
  ) { }

  @get('/session-items/{id}/exercise', {
    responses: {
      '200': {
        description: 'Exercise belonging to SessionItem',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Exercise)},
          },
        },
      },
    },
  })
  async getExercise(
    @param.path.number('id') id: typeof SessionItem.prototype.id,
  ): Promise<Exercise> {
    return this.sessionItemRepository.exercise(id);
  }
}
