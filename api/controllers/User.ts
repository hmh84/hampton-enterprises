import * as UserModels from '../models/User';
import * as UserService from '../services/User';
import { Controller, Status } from './';

const UserController: Controller = {
    prefix: '/user',
    routes: [
        {
            endpoint: '/user',
            method: 'GET',
            authorized: true,
            callback: async (req, res) => {
                const { status, user } = await UserService.GetUser(req.uid);
                return status !== Status.Ok
                    ? res.status(Status.BadRequest).send(status)
                    : res.status(status).send(user);
            },
        },
        {
            endpoint: '/update',
            method: 'PATCH',
            authorized: true,
            callback: async (req, res) => {
                const status = await UserService.UpdateUser(req.uid, req.body as UserModels.UpdateUserParams);

                if (status !== Status.Ok) return res.status(Status.BadRequest).send(status as string);

                return res.status(status).send(status);
            },
        },
    ],
};

export default UserController;
