import {Entity, hasMany, model, property} from '@loopback/repository';
import {SessionItem} from './session-item.model';

@model()
export class Session extends Entity {
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
    type: 'number',
    required: true,
  })
  order: number;

  @hasMany(() => SessionItem)
  sessionItems: SessionItem[];

  @property({
    type: 'number',
  })
  weekId?: number;

  constructor(data?: Partial<Session>) {
    super(data);
  }
}

export interface SessionRelations {
  // describe navigational properties here
}

export type SessionWithRelations = Session & SessionRelations;