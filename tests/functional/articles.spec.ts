import NewsArticles from '../../src/models/NewsArticles';

beforeEach(() => {
  // Empty in-memory list
  NewsArticles.splice(0, NewsArticles.length);
});

describe('Articles functional tests', () => {
  describe('Create article', () => {
    it('should create an article with success', async () => {
      const newArticle = {
        title: 'New article',
        text: 'Text for the article!',
      };

      const response = await global.testRequest.post('/articles').send(newArticle);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.objectContaining(newArticle));
    });

    it('should return 400 when there is a validation error', async () => {
      const newArticle = {
        text: 'This is an article without title',
      };

      const response = await global.testRequest.post('/articles').send(newArticle);
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        code: 400,
        error: 'Bad Request',
        message: "request.body should have required property 'title'",
      });
    });
  });

  describe('Get articles', () => {
    it('should return empty list of articles', async () => {
      const response = await global.testRequest.get('/articles');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return list with created articles', async () => {
      const createdArticles = [
        {
          id: '8cfee6d1-2063-48d1-88b4-77a5040556ae',
          title: 'Article #1!',
          text: 'First article',
          creationDate: new Date(),
        },
        {
          id: '8cfee6d1-2063-48d1-88b4-77a5040556ae',
          title: 'Article #2',
          text: 'Second article',
          creationDate: new Date(),
        },
      ];

      NewsArticles.push(...createdArticles);

      const response = await global.testRequest.get('/articles');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(createdArticles);
    });
  });

  describe('Get article by id', () => {
    it('should return a specific article by it`s id', async () => {
      const article = {
        id: '8cfee6d1-2063-48d1-88b4-77a5040556ae',
        title: 'Article for testing',
        text: 'This article has an id',
        creationDate: new Date(),
      };

      NewsArticles.push(article);

      const response = await global.testRequest.get(`/articles/${article.id}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(article);
    });

    it('should return 404 when the article is not found', async () => {
      const articleId = 'inexistent_article';

      const response = await global.testRequest.get(`/articles/${articleId}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Article not found!');
    });
  });

  describe('Update article', () => {
    it('should update a specific article by it`s id', async () => {
      const createdArticle = {
        id: '8cfee6d1-2063-48d1-88b4-77a5040556ae',
        title: 'New article',
        text: 'This article has an id',
        creationDate: new Date(),
      };

      NewsArticles.push(createdArticle);

      const updatedInfo = {
        title: 'New article (UPDATED!)',
        text: 'This text was updated',
      };

      const response = await global.testRequest.patch(`/articles/${createdArticle.id}`).send(updatedInfo);
      const updatedArticle = NewsArticles.find((article) => article.id === createdArticle.id);

      expect(response.status).toBe(204);
      expect(updatedArticle?.title).toEqual(updatedInfo.title);
      expect(updatedArticle?.text).toEqual(updatedInfo.text);
    });

    it('should return 404 when the article is not found', async () => {
      const articleId = 'inexistent_article';

      const response = await global.testRequest.patch(`/articles/${articleId}`).send({
        title: 'Text to update',
        text: 'Text to update',
      });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Article not found!');
    });
  });
});
