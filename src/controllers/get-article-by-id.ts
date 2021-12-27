import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Article from '../database/models/NewsArticles';
import { sendErrorResponse } from '../helpers/utils/send-controller-errors';

const getArticleById = async (req: Request, res: Response) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      const customError = { code: StatusCodes.NOT_FOUND, message: 'Article not found!' };
      return sendErrorResponse(res, customError);
    }

    return res.status(StatusCodes.OK).json(article);
  } catch (err) {
    return sendErrorResponse(res, err);
  }
};

export default getArticleById;
