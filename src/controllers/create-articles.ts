import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Article from '../database/models/NewsArticles';
import { sendErrorResponse } from '../helpers/utils/send-controller-errors';
import { articleService } from '../services';

const createArticles = async (req: Request, res: Response) => {
  try {
    const article = await new Article(req.body).save();
    const response = articleService.formatArticle(article);
    res.status(StatusCodes.CREATED).send(response);
  } catch (err) {
    sendErrorResponse(res, err);
  }
};

export default createArticles;
