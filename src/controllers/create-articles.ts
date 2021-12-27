import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Article from '../database/models/NewsArticles';
import { sendErrorResponse } from '../helpers/utils/send-controller-errors';

const createArticles = async (req: Request, res: Response) => {
  try {
    const article = new Article({ ...req.body });
    const result = await article.save();
    res.status(StatusCodes.CREATED).send(result);
  } catch (err) {
    sendErrorResponse(res, err);
  }
};

export default createArticles;
