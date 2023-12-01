import 'reflect-metadata';
import 'express-async-errors';
import express, { Express } from 'express';
import cors from 'cors';
import { connectDb } from './config';
import { healthGet } from './controllers/health.controller';
import { usersCreatePost } from './controllers/users.controller';

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', healthGet)
  .post('/users/create', usersCreatePost)



export function init(): Promise<Express> {
    connectDb();
    return Promise.resolve(app);
  }
export default app;
