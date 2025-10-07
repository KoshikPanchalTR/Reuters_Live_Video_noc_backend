// import { createClient } from 'redis';
// import connectRedis from 'connect-redis';
// import session, { SessionData } from 'express-session';
// import { Logger } from './Logger';
// import config from '../Config/index';
// import { SESSION_REDIS_PREFIX, DEFAULT_REDIS_TTL } from './Constants';

// //  Create Redis Client (v4+ compatible)
// export const redisClient = createClient({
//   socket: {
//     host: config.REDIS.HOST,
//     port: config.REDIS.PORT,
//     connectTimeout: 30 * 1000,
//   },
//   password: config.REDIS.PASS,
// });

// // NOSONAR
// // export const redisClient = redis.createClient(
// //   `redis://:${config.REDIS.PASS}@${config.REDIS.HOST}:${config.REDIS.PORT}`
// // );

// //  Event handlers
// redisClient.on('error', (err) => {
//   Logger.error(`Redis connection error: ${err.message}`, 'redisClient', err);
// });

// redisClient.on('connect', () => {
//   Logger.info('Connected to Redis successfully', 'redisClient');
// });

// //  Connect once during app startup
// (async () => {
//   try {
//     await redisClient.connect();
//     Logger.info('Redis client connected', 'redisClient');
//   } catch (err) {
//     Logger.error('Redis connection failed', 'redisClient', err);
//   }
// })();

// //  Reusable connection getter
// export const redisConnection = async () => {
//   if (!redisClient.isOpen) {
//     await redisClient.connect();
//   }
//   return redisClient;
// };

// /**
//  * deleteFromRedis - Delete a key from Redis
//  */
// export const deleteFromRedis = async (key: string) => {
//   try {
//     Logger.info(`Deleting key: ${key}`, 'deleteFromRedis');
//     const result = await redisClient.del(key);
//     Logger.info(`Deleted key ${key} successfully`, 'deleteFromRedis');
//     return result;
//   } catch (err) {
//     Logger.error('Error deleting key from Redis', 'deleteFromRedis', err);
//     throw err;
//   }
// };

// /**
//  * setRedisValue - Set key/value in Redis (with optional TTL)
//  */
// export const setRedisValue = async (
//   key: string,
//   value: any,
//   ttl?: number,
//   isJSON?: boolean
// ) => {
//   try {
//     Logger.info(`Setting key: ${key}`, 'setRedisValue');
//     const val = isJSON ? JSON.stringify(value) : value;

//     if (ttl) {
//       await redisClient.setEx(key, ttl, val);
//     } else {
//       await redisClient.set(key, val);
//     }

//     Logger.info(`Key ${key} stored successfully`, 'setRedisValue');
//     return 'success';
//   } catch (err) {
//     Logger.error('Error setting Redis value', 'setRedisValue', err);
//     throw err;
//   }
// };

// /**
//  * getRedisValue - Fetch key from Redis
//  */
// export const getRedisValue = async (key: string, isJSON?: boolean) => {
//   try {
//     Logger.info(`Fetching key: ${key}`, 'getRedisValue');
//     const result = await redisClient.get(key);
//     if (!result) return null;
//     return isJSON ? JSON.parse(result) : result;
//   } catch (err) {
//     Logger.error('Error fetching Redis value', 'getRedisValue', err);
//     throw err;
//   }
// };

// /**
//  * RedisStoreWrapper - Wrapper class for session Redis store
//  */
// export function getConn() {
//   return redisClient;
// }

// const RedisStore = connectRedis(session);

// /**
//  * RedisStoreWrapper - class wrapper for session redis store
//  */
// export class RedisStoreWrapper {
//   private redisStore: connectRedis.RedisStore;
//   private defaultStoreOptions: connectRedis.RedisStoreOptions = {
//     disableTouch: false,
//     prefix: SESSION_REDIS_PREFIX,
//     ttl: DEFAULT_REDIS_TTL,
//   };
//   constructor(
//     sessionObj: session.SessionOptions | any,
//     storeOptions?: connectRedis.RedisStoreOptions
//   ) {
//     const Store = connectRedis(sessionObj);
//     let localStoreOptions = storeOptions || this.defaultStoreOptions;
//     localStoreOptions.client = redisClient;
//     this.redisStore = new Store(localStoreOptions);
//     if (localStoreOptions.ttl) {
//       (this.redisStore as any)._getTTL = this._getTTL(localStoreOptions);
//     }
//   }
//   /**
//    * _getTTL- get current ttl
//    * @param storeOptions
//    * @returns
//    */
//   _getTTL(storeOptions: any) {
//     return () => {
//       return Number(storeOptions.ttl);
//     };
//   }
//   /**
//    * getStore - to get the configured redis store
//    */
//   getStore(): connectRedis.RedisStore {
//     return this.redisStore;
//   }
//   /**
//    * setStore - to use the redis store set method for storing redis key value
//    */
//   async setStore(sid: string, sessionObj: SessionData) {
//     Logger.info('redisConnector:Reached setStore', 'SetStore');
//     return new Promise((resolve, reject) => {
//       this.redisStore.set(sid, sessionObj, (err) => {
//         if (err) {
//           Logger.error('Error in setting store value', 'setStore', err);
//           reject(err);
//         }
//         resolve('success');
//       });
//     });
//   }
// }
