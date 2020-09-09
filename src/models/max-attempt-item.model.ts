import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Exercise} from './exercise.model';

@model()
export class MaxAttemptItem extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  reps: number;

  @property({
    type: 'boolean',
    required: true,
  })
  bestAttempt: boolean;

  @property({
    type: 'boolean',
  })
  leftRight?: boolean;

  @property({
    type: 'number',
    required: true,
  })
  weight: number;

  @property({
    type: 'string',
    required: true,
  })
  intensity: string;

  @belongsTo(() => Exercise)
  exerciseId: number;

  constructor(data?: Partial<MaxAttemptItem>) {
    super(data);
  }
}

export interface MaxAttemptItemRelations {
  // describe navigational properties here
}

export type MaxAttemptItemWithRelations = MaxAttemptItem & MaxAttemptItemRelations;
