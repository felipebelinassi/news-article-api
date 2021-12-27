import { Article } from '../database/models/NewsArticles';
import { differenceInMinutes } from 'date-fns';

enum ArticleRelevance {
  HOT = 'HOT',
  BORING = 'BORING',
  STANDARD = 'STANDARD',
}

const articleService = () => {
  const countChars = (text: string, character: string) => text.split(character).length - 1;

  const getRelevance = (text: string, articleDate: Date) => {
    const now = new Date();

    if (differenceInMinutes(now, articleDate) <= 1 && countChars(text, '!') > countChars(text, '.')) {
      return ArticleRelevance.HOT;
    }
    if (differenceInMinutes(now, articleDate) <= 5 && countChars(text, ',') > countChars(text, '.')) {
      return ArticleRelevance.BORING;
    }
    return ArticleRelevance.STANDARD;
  };

  const formatArticle = (article: Article) => ({
    ...article,
    relevance: getRelevance(article.text, article.creationDate),
  });

  return { formatArticle, getRelevance };
};

export default articleService;
