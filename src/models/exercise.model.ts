import {Entity, model, property} from '@loopback/repository';

@model()
export class Exercise extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'boolean',
  })
  push?: boolean;

  @property({
    type: 'boolean',
  })
  pull?: boolean;

  @property({
    type: 'array',
    itemType: 'string',
    default: [],
  })
  intensities?: string[];

  @property({
    type: 'boolean',
  })
  leftRight?: boolean;


  constructor(data?: Partial<Exercise>) {
    super(data);
  }
}

export interface ExerciseRelations {
  // describe navigational properties here
}

export type ExerciseWithRelations = Exercise & ExerciseRelations;
