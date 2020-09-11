import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Session} from './session.model';
import {WeekStatistic} from './week-statistic.model';

@model()
export class Week extends Entity {
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
  number: number;

  @hasMany(() => Session)
  sessions: Session[];

  @property({
    type: 'number',
  })
  programId?: number;

  @hasOne(() => WeekStatistic)
  weekStatistic: WeekStatistic;

  constructor(data?: Partial<Week>) {
    super(data);
  }
}

export interface WeekRelations {
  // describe navigational properties here
}

export type WeekWithRelations = Week & WeekRelations;
