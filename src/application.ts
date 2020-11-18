import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';

// --- Authentication ----
import {createBindingFromClass} from '@loopback/core';
import {toInterceptor} from '@loopback/rest';
import {AuthenticationComponent} from '@loopback/authentication';
import {
  CustomOauth2Interceptor,
  GoogleOauthInterceptor,
  SessionAuth,
} from './authentication-interceptors';
import {
  Oauth2AuthStrategy,
  GoogleOauth2Authentication,
  SessionStrategy,
} from './authentication-strategies';
import {
  CustomOauth2,
  CustomOauth2ExpressMiddleware,
  GoogleOauth,
  GoogleOauth2ExpressMiddleware,
} from './authentication-strategy-providers';
import {PassportUserIdentityService, UserServiceBindings} from './services';
import passport from 'passport';
import {
  JWTAuthenticationComponent,
  SECURITY_SCHEME_SPEC,
  TokenServiceBindings,
  RefreshTokenServiceBindings,
} from '@loopback/authentication-jwt';
// ----------------------
// Added CrudRestComponent for User controller
import {CrudRestComponent} from '@loopback/rest-crud';

export {ApplicationConfig};

export class BodApiApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // ---- Authentication ----

    // get oAuth configuration
    let oAuth2Providers = require('../oauth2-providers.json');
    oAuth2Providers['google-login'].clientID = process.env.CLIENT_ID;
    oAuth2Providers['google-login'].clientSecret = process.env.CLIENT_SECRET;

    this.component(AuthenticationComponent);
    this.component(CrudRestComponent);
    this.component(JWTAuthenticationComponent);
    this.setUpBindings();

    this.bind('googleOAuth2Options').to(oAuth2Providers['google-login']);
    this.bind('customOAuth2Options').to(oAuth2Providers['oauth2']);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    passport.serializeUser(function (user: any, done) {
      done(null, user);
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    passport.deserializeUser(function (user: any, done) {
      done(null, user);
    });
    // -------------------------

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
  }

  setUpBindings(): void {
    this.bind(UserServiceBindings.PASSPORT_USER_IDENTITY_SERVICE).toClass(
      PassportUserIdentityService,
    );
    // JWT
    this.bind(TokenServiceBindings.TOKEN_SECRET).to(
      'rZgD+Rgw5khvyCfrziJKsKW3nodYp5CPusyPs8efAE0dz+W8Lp4UIujxHOriV97PhDXDAq2ZBvVhUq/U2x7dSYVfxYlltxyMZDGBKXk3YB0CY6WgXMD6kDntdKnVExmQ7solsk1J7k/IGzjbSBMTddQykeVF37aje9xLAr2eScJqAwQln5TOshA9NOhhdRJls30UBth4LnApTE+rnPl5VS/uq6QD5u+nXMUZUnL7RtxBqxqyn/IEo3lEBRTnOrRBWq2ZCFAZJ4/Lfc44zf4GKAgTgS63+D7FuWvdMeP+7L7kCu+AC/+yImW96IUO06OnQ0lXTGezXwxkyTobmYUNrg==',
    );
    // passport strategies
    this.add(createBindingFromClass(GoogleOauth, {key: 'googleStrategy'}));
    this.add(createBindingFromClass(CustomOauth2, {key: 'oauth2Strategy'}));
    // passport express middleware
    this.add(
      createBindingFromClass(GoogleOauth2ExpressMiddleware, {
        key: 'googleStrategyMiddleware',
      }),
    );
    this.add(
      createBindingFromClass(CustomOauth2ExpressMiddleware, {
        key: 'oauth2StrategyMiddleware',
      }),
    );
    // LoopBack 4 style authentication strategies
    this.add(createBindingFromClass(GoogleOauth2Authentication));
    this.add(createBindingFromClass(Oauth2AuthStrategy));
    this.add(createBindingFromClass(SessionStrategy));
    // Express style middleware interceptors
    this.bind('passport-init-mw').to(toInterceptor(passport.initialize()));
    this.bind('passport-session-mw').to(toInterceptor(passport.session()));
    this.bind('passport-google').toProvider(GoogleOauthInterceptor);
    this.bind('passport-oauth2').toProvider(CustomOauth2Interceptor);
    this.bind('set-session-user').toProvider(SessionAuth);
  }
}
