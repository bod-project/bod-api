import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  MaxAttemptItem,
  Exercise,
} from '../models';
import {MaxAttemptItemRepository} from '../repositories';

export class MaxAttemptItemExerciseController {
  constructor(
    @repository(MaxAttemptItemRepository)
    public maxAttemptItemRepository: MaxAttemptItemRepository,
  ) { }

  @get('/max-attempt-items/{id}/exercise', {
    responses: {
      '200': {
        description: 'Exercise belonging to MaxAttemptItem',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Exercise)},
          },
        },
      },
    },
  })
  async getExercise(
    @param.path.number('id') id: typeof MaxAttemptItem.prototype.id,
  ): Promise<Exercise> {
    return this.maxAttemptItemRepository.exercise(id);
  }
}
