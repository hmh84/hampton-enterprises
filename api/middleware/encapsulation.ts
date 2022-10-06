import { NextFunction, Request, Response } from 'express';
import { Status } from '../controllers';

export default function encapsulate(req: Request, res: Response, next: NextFunction) {
    const originalSendFunc = res.send.bind(res);
    res.send = (body) => {
        try {
            if (res.statusCode !== Status.Ok || typeof body !== 'object') {
                return originalSendFunc(body);
            }

            function removePrivates(obj: any) {
                for (const key in obj) {
                    if (key.startsWith('_')) {
                        delete obj[key];
                    } else if (typeof obj[key] === 'object') {
                        removePrivates(obj[key]);
                    }
                }
            }

            removePrivates(body);
        } catch (error) {
            res.status(Status.InternalError).send((error as Error).message);
        }
        return originalSendFunc(body);
    };
    next();
}
