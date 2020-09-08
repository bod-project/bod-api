import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Program} from './program.model';
import {WeekStatistic} from './week-statistic.model';

@model()
export class ProgramStatistic extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => Program)
  programId: number;

  @hasMany(() => WeekStatistic)
  weekStatistics: WeekStatistic[];

  constructor(data?: Partial<ProgramStatistic>) {
    super(data);
  }
}

export interface ProgramStatisticRelations {
  // describe navigational properties here
}

export type ProgramStatisticWithRelations = ProgramStatistic & ProgramStatisticRelations;
