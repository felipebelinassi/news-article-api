import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import NewsArticles from '../models/NewsArticles';
import CustomError from '../helpers/errors/custom-error';

const getArticleById = (req: Request, res: Response) => {
  const articleId = req.params.id;
  const article = NewsArticles.find((article) => article.id === articleId);

  if (!article) {
    res.status(StatusCodes.NOT_FOUND).json(
      CustomError.format({
        code: StatusCodes.NOT_FOUND,
        message: 'Article not found!',
      }),
    );
  }

  res.status(StatusCodes.OK).json(article);
};

export default getArticleById;
