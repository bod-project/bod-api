import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Week} from './week.model';
import {SessionStatistic} from './session-statistic.model';

@model()
export class WeekStatistic extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: false,
  })
  playlist?: string;

  @belongsTo(() => Week)
  weekId: number;

  @hasMany(() => SessionStatistic)
  sessionStatistics: SessionStatistic[];

  @property({
    type: 'number',
  })
  programStatisticId?: number;

  constructor(data?: Partial<WeekStatistic>) {
    super(data);
  }
}

export interface WeekStatisticRelations {
  // describe navigational properties here
}

export type WeekStatisticWithRelations = WeekStatistic & WeekStatisticRelations;
