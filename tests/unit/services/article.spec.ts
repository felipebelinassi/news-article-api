import articleService from '../../../src/services/article';
import Article from '../../../src/database/models/NewsArticles';

beforeEach(() => {
  jest.useFakeTimers().setSystemTime(new Date('2021-12-27T16:00:00.000Z'));
});

afterEach(() => {
  jest.useRealTimers();
});

describe('Article Service', () => {
  const defaultArticleService = articleService();

  describe('Get relevance', () => {
    it('should get HOT relevance for text created within 1 minute, with lots of `!`', () => {
      const text = 'This should be a hot text!! I believe!';
      const creationDate = new Date('2021-12-27T15:59:50.000Z');

      const relevance = defaultArticleService.getRelevance(text, creationDate);
      expect(relevance).toEqual('HOT');
    });

    it('should get BORING relevance for text created within 1 minute, but with lots of `,`', () => {
      const text = 'This is new, but, is boring.';
      const creationDate = new Date('2021-12-27T15:59:50.000Z');

      const relevance = defaultArticleService.getRelevance(text, creationDate);
      expect(relevance).toEqual('BORING');
    });

    it('should get STANDARD relevance for text created within 1 minute, but with lots of `.`', () => {
      const text = 'This is just a normal text.';
      const creationDate = new Date('2021-12-27T15:59:50.000Z');

      const relevance = defaultArticleService.getRelevance(text, creationDate);
      expect(relevance).toEqual('STANDARD');
    });

    it('should get BORING relevance for text created within 5 minutes, with lots of `,` in text', () => {
      const text = 'This text, I guarantee, it will be boring, trust me.';
      const creationDate = new Date('2021-12-27T15:55:10.000Z');

      const relevance = defaultArticleService.getRelevance(text, creationDate);
      expect(relevance).toEqual('BORING');
    });

    it('should get a STANDARD relevance for a text written more than 5 minutes ago', () => {
      const text = 'Just a normal text.';
      const creationDate = new Date('2021-12-27T14:55:10.000Z');

      const relevance = defaultArticleService.getRelevance(text, creationDate);
      expect(relevance).toEqual('STANDARD');
    });
  });

  describe('Format article with relevance', () => {
    it('should return article with relevance field', () => {
      const article = new Article({
        title: 'This is a title!',
        text: 'You gotta check this!',
      });

      const response = defaultArticleService.formatArticle(article);
      expect(response).toHaveProperty('relevance', 'HOT');
    });
  });
});
