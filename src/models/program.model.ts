import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Week} from './week.model';
import {ProgramStatistic} from './program-statistic.model';

@model()
export class Program extends Entity {
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

  @hasMany(() => Week)
  weeks: Week[];

  @hasOne(() => ProgramStatistic)
  programStatistic: ProgramStatistic;

  constructor(data?: Partial<Program>) {
    super(data);
  }
}

export interface ProgramRelations {
  // describe navigational properties here
}

export type ProgramWithRelations = Program & ProgramRelations;
