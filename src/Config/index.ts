import dotenv from 'dotenv';
import {
  DEFAULT_APP_NAME,
  DEFAULT_APP_PORT,
  DEFAULT_COOKIE_SECRET,
  DEFAULT_HOST_NAME,
} from '../Util/Constants';

dotenv.config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';

/**
 * handleCorsOrigin - to map cors origin options
 * @param  {Array} origins- string array of origins
 * @return {Array} allowed origin array trimmed
 */
function handleCorsOrigin(origins: string[]) {
  return origins.map((origin: any) => origin.trim());
}
function handleMimetypes(filetypes: string[]) {
  return filetypes.map((fileType: any) => fileType.trim());
}

/**
 * handleCookieSameSite - to map cookies from env
 * @param  {string} value- same site value
 * @return {Boolean|string} same site cookie value
 */
function handleCookieSameSite(value: string): boolean | string | any {
  const sameSiteOptions = ['none', 'strict', 'lax'];
  if (sameSiteOptions.indexOf(value) > -1) {
    return value;
  }
  return value === 'true';
}
export default {
  port: process.env.PORT ?? DEFAULT_APP_PORT,
  LOG_LEVELS: process.env.LOG_LEVELS?.split(',') || [],
  APP_NAME: process.env.npm_package_name ?? DEFAULT_APP_NAME,
  NODE_ENV: process.env.NODE_ENV,
  SSL_REJECT_UNAUTHORIZED: true,
  HOST: process.env.HOST ?? DEFAULT_HOST_NAME,
  MONGO: {
    HOST: process.env.MONGO_HOST,
    PORT: process.env.MONGO_PORT,
    DB_NAME: process.env.MONGO_DB,
    USER: process.env.MONGO_USER,
    PASS: process.env.MONGO_PASS,
  },
  COOKIE: {
    SECRET: process.env.COOKIE_SECRET || DEFAULT_COOKIE_SECRET,
    SECURE: process.env.COOKIE_SECURE === 'true' ? true : false,
    HTTP_ONLY: process.env.COOKIE_HTTP_ONLY === 'true' ? true : false,
    SAME_SITE: handleCookieSameSite(process.env.COOKIE_SAME_SITE || 'none'),
    PATH: process.env.COOKIE_PATH || '/',
    MAX_AGE: Number(process.env.COOKIE_MAXAGE) || 60 * 60 * 1000,
  },
  REDIS: {
    HOST: process.env.REDIS_HOST ?? '',
    PORT: Number(process.env.REDIS_PORT) || 6379,
    PASS: process.env.REDIS_PASS ?? '',
  },
  CORS: {
    ORIGIN: handleCorsOrigin(process.env.CORS_ORIGIN?.split(',') ?? []),
    CREDENTIALS: process.env.CORS_CREDENTIALS === 'true' ? true : false,
  },
  APM: {
    HOST_URL: process.env.APM_HOST_URL,
    SECRET: process.env.APM_SECRET,
    ENV: process.env.APM_ENV,
  },
  GCP: {
    PROJECT: process.env.PROJECT,
    TYPE: process.env.TYPE,
    PRIVATE_KEY_ID: process.env.PRIVATE_KEY_ID,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    CLIENT_EMAIL: process.env.CLIENT_EMAIL,
    CLIENT_ID: process.env.CLIENT_ID,
    AUTH_URI: process.env.AUTH_URI,
    TOKEN_URI: process.env.TOKEN_URI,
    AUTH_PROVIDER_X509_CERT_URL: process.env.AUTH_PROVIDER_X509_CERT_URL,
    CLIENT_X509_CERT_URL: process.env.CLIENT_X509_CERT_URL,
    UNIVERSE_DOMAIN: process.env.UNIVERSE_DOMAIN,
    BUCKET_NAME: process.env.BUCKET_NAME,
    ALLOWED_MIME_TYPES: handleMimetypes(process.env.ALLOWED_MIME_TYPES?.split(',') || []),
    ALLOWED_TYPES: handleMimetypes(process.env.ALLOWED_TYPES?.split(',') || []),
    ALLOWED_SIZE: Number(process.env.ALLOWED_SIZE) || 20, // 20 MB
    STATIC_SITE_BUCKET_NAME: process.env.STATIC_SITE_BUCKET_NAME || '',
  },
};
