import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function healthGet(req: Request, res: Response) {
  
    const result = 'OK2'
  
    return res.status(httpStatus.OK).send(result);
  }