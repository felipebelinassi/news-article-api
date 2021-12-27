import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Article from '../database/models/NewsArticles';
import { sendErrorResponse } from '../helpers/utils/send-controller-errors';

const getArticleById = async (req: Request, res: Response): Promise<Response> => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return sendErrorResponse(res, { code: 400, message: 'Id not valid!' });
  }

  const article = await Article.findById(req.params.id);

  if (!article) {
    const customError = { code: StatusCodes.NOT_FOUND, message: 'Article not found!' };
    return sendErrorResponse(res, customError);
  }

  return res.status(StatusCodes.OK).json(article);
};

export default getArticleById;
