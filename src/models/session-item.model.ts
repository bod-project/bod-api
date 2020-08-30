import {Entity, model, property} from '@loopback/repository';

@model()
export class SessionItem extends Entity {
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
  exerciseId: number;

  @property({
    type: 'number',
    required: true,
  })
  reps: number;

  @property({
    type: 'boolean',
    required: true,
  })
  AMRAP: boolean;

  @property({
    type: 'boolean',
  })
  leftRight?: boolean;

  @property({
    type: 'number',
    required: true,
  })
  sets: number;

  @property({
    type: 'string',
    required: true,
  })
  weight: string;

  @property({
    type: 'string',
    required: true,
  })
  intensity: string;

  @property({
    type: 'string',
    required: true,
  })
  tempo: string;


  constructor(data?: Partial<SessionItem>) {
    super(data);
  }
}

export interface SessionItemRelations {
  // describe navigational properties here
}

export type SessionItemWithRelations = SessionItem & SessionItemRelations;