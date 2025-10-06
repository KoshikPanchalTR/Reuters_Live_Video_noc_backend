
// require('elastic-apm-node').start({
//   // Override the service name from package.json
//   // Allowed characters: a-z, A-Z, 0-9, -, _, and space
//   serviceName: 'Reuters-Imagen-live-video-noc-backend',
//   // Use if APM Server requires a secret token
//   secretToken: process.env.ELASTIC_APM_SECRET_TOKEN,
//   // Set the custom APM Server URL (default: http://localhost:8200)
//   serverUrl: process.env.ELASTIC_APM_SERVER_URL,
//   // Set the service environment
//   environment: process.env.ELASTIC_APM_ENVIRONMENT,
//   verifyServerCert: false,
//   // logLevel: "debug",
// });

import express, {
  Express, NextFunction,
  Request,
  Response,
  CookieOptions,
} from 'express';
import config from './Config/index';
import { Logger } from './Util/Logger';
import { initCommonMiddlewares } from './Middleware/CommonMiddleware';
import { RedisStoreWrapper } from './Util/RedisConnector';
import session from 'express-session';
import connectRedis from 'connect-redis';
import MongoDbConnection from './Models/index';
import { COOKIE, SESSION_REDIS_PREFIX, DEFAULT_REDIS_TTL } from './Util/Constants';
import routes from './Routes';



const PORT = config.port;
const app: Express = express();
// Mount your router here
// Parse JSON request bodies
app.use(express.json());
// Optional: parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);
/** Connect MongoDb */
//MongoDbConnection.connect();

const initMiddlewares = async (app: Express) => {
  const cookieOptions: CookieOptions = {
    maxAge: config.COOKIE.MAX_AGE,
    httpOnly: config.COOKIE.HTTP_ONLY,
    secure: config.COOKIE.SECURE,
    sameSite: config.COOKIE.SAME_SITE,
    path: config.COOKIE.PATH,
  };
  const redisStoreOptions: connectRedis.RedisStoreOptions = {
    disableTouch: false,
    prefix: SESSION_REDIS_PREFIX,
    ttl: DEFAULT_REDIS_TTL,
  };
  const redisStore = new RedisStoreWrapper(
    session,
    redisStoreOptions
  ).getStore();
  const sessionMiddleware = session({
    store: redisStore,
    name: COOKIE.NAME,
    secret: config.COOKIE.SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: cookieOptions,
    rolling: true,
  });
  app.use(sessionMiddleware);
  app.disable('x-powered-by');
  app.use((req: Request, res: Response, next: NextFunction) => {
    (req as any).cookieName = COOKIE.NAME;
    (req as any).redisStore = redisStore;
    next();
  });
  return app;
};

initMiddlewares(app);
initCommonMiddlewares(app)
  .then((parentApp: Express) => {
    parentApp.listen(PORT, () => Logger.info(`Running on ${PORT}`, `Main.ts->initCommonMiddlewares http://localhost:${PORT}/api-docs/`));
  }).catch((error: any) => {
   console.log(error);
  });;

