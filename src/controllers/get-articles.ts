import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Article from '../database/models/NewsArticles';
import { sendErrorResponse } from '../helpers/utils/send-controller-errors';

const getArticles = async (_: Request, res: Response) => {
  try {
    const articles = await Article.find();
    res.status(StatusCodes.OK).json(articles);
  } catch (err) {
    sendErrorResponse(res, err);
  }
};

export default getArticles;
