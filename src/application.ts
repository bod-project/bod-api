import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {DbDataSource} from './datasources';
import {MySequence} from './sequence';
// ------ JWT authentication---------
import {AuthenticationComponent} from '@loopback/authentication';
import { 
  JWTAuthenticationComponent, 
  UserRepository, 
  UserServiceBindings 
} from '@loopback/authentication-jwt';
import {AppUserService} from './services/app-user-service'
import {AppUserRepository, AppUserCredentialsRepository} from './repositories'
// ----------------------------------

export {ApplicationConfig};

export class BodApiApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    // ------ JWT authentication---------
    // Mount authentication system
    this.component(AuthenticationComponent);
    // Mount jwt component
    this.component(JWTAuthenticationComponent);
    // Bind datasource
    this.dataSource(DbDataSource, UserServiceBindings.DATASOURCE_NAME);
    // Bind user service
    this.bind(UserServiceBindings.USER_SERVICE).toClass(AppUserService),
    // Bind user and credentials repository
    this.bind(UserServiceBindings.USER_REPOSITORY).toClass( AppUserRepository),
    this.bind(UserServiceBindings.USER_CREDENTIALS_REPOSITORY).toClass(
      AppUserCredentialsRepository,
    )
    // ---------------------------------
  }
}
