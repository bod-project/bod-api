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
import {MaxAttemptItem} from '../models';
import {MaxAttemptItemRepository} from '../repositories';

export class MaxAttemptItemController {
  constructor(
    @repository(MaxAttemptItemRepository)
    public maxAttemptItemRepository : MaxAttemptItemRepository,
  ) {}

  @post('/max-attempt-items', {
    responses: {
      '200': {
        description: 'MaxAttemptItem model instance',
        content: {'application/json': {schema: getModelSchemaRef(MaxAttemptItem)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MaxAttemptItem, {
            title: 'NewMaxAttemptItem',
            exclude: ['id'],
          }),
        },
      },
    })
    maxAttemptItem: Omit<MaxAttemptItem, 'id'>,
  ): Promise<MaxAttemptItem> {
    return this.maxAttemptItemRepository.create(maxAttemptItem);
  }

  @get('/max-attempt-items/count', {
    responses: {
      '200': {
        description: 'MaxAttemptItem model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(MaxAttemptItem) where?: Where<MaxAttemptItem>,
  ): Promise<Count> {
    return this.maxAttemptItemRepository.count(where);
  }

  @get('/max-attempt-items', {
    responses: {
      '200': {
        description: 'Array of MaxAttemptItem model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(MaxAttemptItem, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(MaxAttemptItem) filter?: Filter<MaxAttemptItem>,
  ): Promise<MaxAttemptItem[]> {
    return this.maxAttemptItemRepository.find(filter);
  }

  @patch('/max-attempt-items', {
    responses: {
      '200': {
        description: 'MaxAttemptItem PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MaxAttemptItem, {partial: true}),
        },
      },
    })
    maxAttemptItem: MaxAttemptItem,
    @param.where(MaxAttemptItem) where?: Where<MaxAttemptItem>,
  ): Promise<Count> {
    return this.maxAttemptItemRepository.updateAll(maxAttemptItem, where);
  }

  @get('/max-attempt-items/{id}', {
    responses: {
      '200': {
        description: 'MaxAttemptItem model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(MaxAttemptItem, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MaxAttemptItem, {exclude: 'where'}) filter?: FilterExcludingWhere<MaxAttemptItem>
  ): Promise<MaxAttemptItem> {
    return this.maxAttemptItemRepository.findById(id, filter);
  }

  @patch('/max-attempt-items/{id}', {
    responses: {
      '204': {
        description: 'MaxAttemptItem PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MaxAttemptItem, {partial: true}),
        },
      },
    })
    maxAttemptItem: MaxAttemptItem,
  ): Promise<void> {
    await this.maxAttemptItemRepository.updateById(id, maxAttemptItem);
  }

  @put('/max-attempt-items/{id}', {
    responses: {
      '204': {
        description: 'MaxAttemptItem PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() maxAttemptItem: MaxAttemptItem,
  ): Promise<void> {
    await this.maxAttemptItemRepository.replaceById(id, maxAttemptItem);
  }

  @del('/max-attempt-items/{id}', {
    responses: {
      '204': {
        description: 'MaxAttemptItem DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.maxAttemptItemRepository.deleteById(id);
  }
}
