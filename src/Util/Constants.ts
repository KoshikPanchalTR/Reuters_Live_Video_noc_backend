import config from '../Config/index';
export const TRACE_ID_HEADER_NAME = 'Platform-X-Trace-Id';
export const DEFAULT_APP_NAME = 'Reuters-Imagen-live-noc-backend';
export const DEFAULT_APP_PORT = '8088';
export const DEFAULT_HOST_NAME = 'Reuters_Imagen_live_Noc_backend';
/** REDIS CONSTANTS */
export const SESSION_REDIS_PREFIX = 'live-video-noc-session:';
export const DEFAULT_REDIS_TTL = 43200;
export const DEFAULT_COOKIE_SECRET = 'to be done';

export const ROUTES_URL: any = {
  GET_USER_LIST: 'list',
  SAVE_USER: 'save',
  GET_USER: 'get',
};

export const COOKIE = {
  NAME: 'live-video-noc-session',
};
