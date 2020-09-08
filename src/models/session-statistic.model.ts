import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Session} from './session.model';
import {SessionItemStatistic} from './session-item-statistic.model';

@model()
export class SessionStatistic extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => Session)
  sessionId: number;

  @hasMany(() => SessionItemStatistic)
  sessionItemStatistics: SessionItemStatistic[];

  @property({
    type: 'number',
  })
  weekStatisticId?: number;

  constructor(data?: Partial<SessionStatistic>) {
    super(data);
  }
}

export interface SessionStatisticRelations {
  // describe navigational properties here
}

export type SessionStatisticWithRelations = SessionStatistic & SessionStatisticRelations;
