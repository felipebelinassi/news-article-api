import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Article from '../database/models/NewsArticles';
import { sendErrorResponse } from '../helpers/utils/send-controller-errors';

const updateArticleById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { title, text } = req.body;
    let infoToUpdate = { title };
    if (text) infoToUpdate = Object.assign(infoToUpdate, { text });

    const article = await Article.findById(req.params.id);
    if (!article) {
      const customError = { code: StatusCodes.NOT_FOUND, message: 'Article not found!' };
      return sendErrorResponse(res, customError);
    }

    await Article.updateOne({ _id: req.params.id }, { $set: infoToUpdate }, { new: true });
    return res.status(StatusCodes.NO_CONTENT).json();
  } catch (err) {
    return sendErrorResponse(res, err);
  }
};

export default updateArticleById;
