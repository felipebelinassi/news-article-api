import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import NewsArticles from '../models/NewsArticles';

const getArticles = (req: Request, res: Response) => {
  const response = NewsArticles;
  res.status(StatusCodes.OK).json(response);
};

export default getArticles;
