import { Request, Response } from 'express';
import { throwError } from '../Util/ErrorHandler';
import { HTTP_STATUS_CODE } from '../Util/HttpCodes';
import { Logger } from '../Util/Logger';
import { handleResponse } from '../Util/CommonUtil';
import { getRedisValue, setRedisValue } from '../Util/RedisConnector';

/**
 * changePassword - controller to change password of user after login
 * @param  {Request} req- express http request
 * @param  {Response} res- express http response
 * @return {Response} success or error response
 */
export const userList = async (req: Request, res: Response) => {
    try {
        Logger.info('UserController: Reached userList endpoint', 'userList');
        // Get redis value here
        const redisKey = 'userList';
         let response = [];
        Logger.debug('Reached in userList', 'userList Redis', { redisKey });
        let RedisSavedValue: any = await getRedisValue(redisKey, true).catch(
            (err) => {
                Logger.error(
                    'Prelem search : siteSettingsResponse not found in redis',
                    'prelemRedis',
                    err
                );
                return null; // hit token api
            }
        );
         Logger.debug('Reached in userList', 'userList Redis', { RedisSavedValue });
        if (RedisSavedValue) {
            response =  RedisSavedValue;
        } 
        await handleResponse(res, response, null);
        

    } catch (err: any) {
        Logger.error('UserController: Error in changePassword endpoint', 'changePassword', err);
        handleResponse(res, null, err, err.code || HTTP_STATUS_CODE.BAD_REQUEST);
    }
};
export const CreateUser = async (req: Request, res: Response) => {
    try {
        Logger.info('UserController: Reached saveUser endpoint', 'saveUser');
        let reqBody: any = req.body || {};
        console.log(req,'!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11');
        const redisKey = 'userList';
        let usersArray:any = [];
        usersArray.push(reqBody);
        // let RedisSavedValue: any = await getRedisValue(redisKey, true).catch(
        //     (err) => {
        //         Logger.error(
        //             'UserController: CreateUser not found in redis',
        //             'CreateUser',
        //             err
        //         );
        //         return null;
        //     }
        // );
        // if (!RedisSavedValue) {
        //     /*  set value to redis */
        //      usersArray.push(reqBody)
        // } else {
        //     usersArray = [...RedisSavedValue, ...reqBody]
        //     Logger.debug(
        //         'UserController: Reached saveUser',
        //         'saveUser',
        //         reqBody);
        //     /** Save the Value to Redis */

        // }
        // Logger.debug('UserController', 'saveUser Redis', { redisKey });
            await setRedisValue(
                redisKey,
                usersArray,
                86400,
                true,
            );
        await handleResponse(res, reqBody, null);

    } catch (err: any) {
        Logger.error('UserController: Error in saveUser endpoint', 'saveUser', err);
        handleResponse(res, null, err, err.code || HTTP_STATUS_CODE.BAD_REQUEST);
    }
};


