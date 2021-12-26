import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import NewsArticles from '../models/NewsArticles';

const createArticles = async (req: Request, res: Response): Promise<void> => {
  const newArticle = {
    ...req.body,
    id: randomUUID(),
    creationDate: new Date(),
  };

  NewsArticles.push(newArticle);

  res.status(StatusCodes.CREATED).send(newArticle);
};

export default createArticles;