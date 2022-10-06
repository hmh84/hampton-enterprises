import { Application, Express } from 'express';
import { Request, Response } from 'express-serve-static-core';

import { User } from '../models/User';
import { CheckAuth } from '../services/Auth';
import AuthController, { authTokenName } from './Auth';
import UserController from './User';

interface CustomRequest extends Request {
    uid: User['uid'];
}

type RouteCallback = (req: CustomRequest, res: Response) => Promise<Response>;
type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

export interface Controller {
    prefix: string;
    routes: Route[];
}

export interface Route {
    endpoint: string;
    authorized: boolean;
    method: HttpMethod;
    callback: RouteCallback;
}

export const Status = Object.freeze({
    Ok: 200,
    BadRequest: 400,
    Unauthorized: 401,
    InternalError: 500,
});

const endpointAuthCheck = (callback: RouteCallback) => {
    return async (req: CustomRequest, res: Response) => {
        const { isVerified, uid } = await CheckAuth(req.cookies[authTokenName] as string);
        req.uid = uid as string;
        return isVerified ? callback(req, res) : res.status(Status.Unauthorized).send('Unauthorized');
    };
};

const allControllers: Controller[] = [AuthController, UserController];

export const attachEndpoints = (server: Express) => {
    allControllers.forEach(({ routes, prefix }) => {
        routes.forEach(({ method, endpoint, authorized, callback }) => {
            const fullPath = prefix + endpoint;
            const fullCallback = (authorized ? endpointAuthCheck(callback) : callback) as Application;

            switch (method) {
                case 'GET':
                    server.get(fullPath, fullCallback);
                    break;
                case 'POST':
                    server.post(fullPath, fullCallback);
                    break;
                case 'DELETE':
                    server.delete(fullPath, fullCallback);
                    break;
                case 'PUT':
                    server.put(fullPath, fullCallback);
                    break;
                case 'PATCH':
                    server.patch(fullPath, fullCallback);
                    break;
            }
        });
    });
};
