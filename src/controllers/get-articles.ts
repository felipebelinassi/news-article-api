import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { articleService } from '../services';
import Article from '../database/models/NewsArticles';
import { sendErrorResponse } from '../helpers/utils/send-controller-errors';

const getArticles = async (_: Request, res: Response) => {
  try {
    const articles = await Article.find();
    const response = articles.map(articleService.formatArticle);
    res.status(StatusCodes.OK).json(response);
  } catch (err) {
    sendErrorResponse(res, err);
  }
};

export default getArticles;
