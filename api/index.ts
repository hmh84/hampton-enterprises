import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { attachEndpoints, Status } from './controllers';
import encapsulate from './middleware/encapsulation';

const { env } = process;
dotenv.config();

// Variables
const server = express();
const serverPort = Number(env.SERVER_PORT);
const serverUrl = `http://localhost:${serverPort}`;
const clientPort = Number(env.CLIENT_PORT);
const clientUrl = `https://localhost:${clientPort}`;
const __dirname = dirname(fileURLToPath(import.meta.url));
const servePath = path.join(__dirname, '../build/');

// Middleware

if (env.ENVIRONMENT === 'PROD') {
    server.use(express.static(servePath)); // Serve dir
    console.log(`Client hosted at ${clientUrl}. Serving path: ${servePath}`);
}

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cookieParser());
server.use(encapsulate);
server.use(
    cors({
        origin: [serverUrl, clientUrl],
        optionsSuccessStatus: Status.Ok,
        credentials: true,
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type, Accept'],
    })
);

attachEndpoints(server);

server.listen(serverPort, () => console.log(`API hosted at ${serverUrl}`));
