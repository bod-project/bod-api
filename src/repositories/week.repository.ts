import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Week, WeekRelations, Session} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {SessionRepository} from './session.repository';

export class WeekRepository extends DefaultCrudRepository<
  Week,
  typeof Week.prototype.id,
  WeekRelations
> {

  public readonly sessions: HasManyRepositoryFactory<Session, typeof Week.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('SessionRepository') protected sessionRepositoryGetter: Getter<SessionRepository>,
  ) {
    super(Week, dataSource);
    this.sessions = this.createHasManyRepositoryFactoryFor('sessions', sessionRepositoryGetter,);
    this.registerInclusionResolver('sessions', this.sessions.inclusionResolver);
  }
}
