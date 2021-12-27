import mongoose, { Document, Model, Schema } from 'mongoose';

export interface Article {
  _id?: string;
  title: string;
  text: string;
  creationDate: Date;
}

interface ArticleModel extends Omit<Article, '_id'>, Document {}

const schema = new mongoose.Schema<ArticleModel>(
  {
    title: { type: String, required: true },
    text: { type: String },
    creationDate: { type: Schema.Types.Date, required: true, default: new Date() },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id.toString();
        ret.creationDate = ret.creationDate.toISOString();
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

export const Article: Model<ArticleModel> = mongoose.model('Article', schema);

export default Article;
