import { ErrorRequestHandler, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomError from '../helpers/errors/custom-error';

export interface HTTPError extends Error {
  status?: number;
}

const errorHandler: ErrorRequestHandler = (error: HTTPError, _, res, next: NextFunction): void => {
  const errorCode = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const customError = CustomError.format({
    code: errorCode,
    message: error.message,
  });
  res.status(errorCode).json(customError);
  next();
};

export default errorHandler;
