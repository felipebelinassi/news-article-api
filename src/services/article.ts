import { ArticleModel } from '../database/models/NewsArticles';
import differenceInMinutes from 'date-fns/differenceInMinutes';

enum ArticleRelevance {
  HOT = 'HOT',
  BORING = 'BORING',
  STANDARD = 'STANDARD',
}

const articleService = () => {
  const countChars = (text: string, character: string) => text.split(character).length - 1;
  const articleAgeInMinutes = (firstDate: Date, secondDate: Date) =>
    differenceInMinutes(firstDate, secondDate, { roundingMethod: 'ceil' });

  const getRelevance = (text: string, articleDate: Date) => {
    const now = new Date();

    if (articleAgeInMinutes(now, articleDate) <= 1 && countChars(text, '!') > countChars(text, '.')) {
      return ArticleRelevance.HOT;
    }
    if (articleAgeInMinutes(now, articleDate) <= 5 && countChars(text, ',') > countChars(text, '.')) {
      return ArticleRelevance.BORING;
    }
    return ArticleRelevance.STANDARD;
  };

  const formatArticle = (article: ArticleModel) => ({
    id: article.id,
    title: article.title,
    text: article.text,
    creationDate: new Date(article.creationDate),
    relevance: getRelevance(article.text, article.creationDate),
  });

  return { formatArticle, getRelevance };
};

export default articleService;
