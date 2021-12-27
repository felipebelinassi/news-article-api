import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import { sendErrorResponse } from '../helpers/utils/send-controller-errors';

export const validateArticleId: RequestHandler = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    const customError = { code: StatusCodes.BAD_REQUEST, message: 'Id is not valid!' };
    return sendErrorResponse(res, customError);
  }

  return next();
};
