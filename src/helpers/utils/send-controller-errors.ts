import { Response } from 'express';
import CustomError, { APIError } from '../errors/custom-error';

export const sendErrorResponse = (res: Response, err: APIError): Response => {
  return res.status(err.code).send(CustomError.format(err));
};
