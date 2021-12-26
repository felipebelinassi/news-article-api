import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import NewsArticles from '../models/NewsArticles';
import CustomError from '../helpers/errors/custom-error';

const updateArticleById = (req: Request, res: Response) => {
  const articleId = req.params.id;
  const { title, text } = req.body;

  const article = NewsArticles.find((article) => article.id === articleId);

  if (!article) {
    res.status(StatusCodes.NOT_FOUND).json(
      CustomError.format({
        code: StatusCodes.NOT_FOUND,
        message: 'Article not found!',
      }),
    );
    return;
  }

  article.title = title;
  if (text) article.text = text;

  res.status(StatusCodes.NO_CONTENT).json();
};

export default updateArticleById;
