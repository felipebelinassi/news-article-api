import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Article from '../database/models/NewsArticles';
import { sendErrorResponse } from '../helpers/utils/send-controller-errors';

const updateArticleById = async (req: Request, res: Response) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      const customError = { code: StatusCodes.NOT_FOUND, message: 'Article not found!' };
      return sendErrorResponse(res, customError);
    }

    const updatedInfo = {
      title: req.body.title,
      text: req.body.text || article.text,
    };

    await Article.updateOne({ _id: req.params.id }, { $set: updatedInfo }, { new: true });
    return res.status(StatusCodes.NO_CONTENT).json();
  } catch (err) {
    return sendErrorResponse(res, err);
  }
};

export default updateArticleById;
