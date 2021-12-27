import { Article } from '../../src/database/models/NewsArticles';

beforeEach(async () => {
  await Article.deleteMany({});
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

    it('should create an article with empty text', async () => {
      const newArticle = {
        title: 'New article',
      };

      const response = await global.testRequest.post('/articles').send(newArticle);
      expect(response.status).toBe(201);
      expect(response.body.text).toEqual('');
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
      const newArticle = {
        title: 'Article #1!',
        text: 'First article',
      };

      const savedArticle = (await new Article(newArticle).save()).toJSON();

      const response = await global.testRequest.get('/articles');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([savedArticle]);
    });
  });

  describe('Get article by id', () => {
    it('should return a specific article by it`s id', async () => {
      const newArticle = {
        title: 'Article for testing',
        text: 'This article has an id',
      };
      const savedArticle = await new Article(newArticle).save();

      const response = await global.testRequest.get(`/articles/${savedArticle._id}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(newArticle);
    });

    it('should return 404 when the article is not found', async () => {
      const articleId = '61c8f021fb837f6cf1c89b0f';

      const response = await global.testRequest.get(`/articles/${articleId}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Article not found!');
    });
  });

  describe('Update article', () => {
    it('should update title and text of a specific article', async () => {
      const savedArticle = await new Article({
        title: 'New article',
        text: 'This article has an id',
      }).save();

      const updatedInfo = {
        title: 'New article (UPDATED!)',
        text: 'This text was updated',
      };

      const response = await global.testRequest.patch(`/articles/${savedArticle._id}`).send(updatedInfo);
      const updatedArticle = await Article.findById(savedArticle._id);

      expect(response.status).toBe(204);
      expect(updatedArticle?.title).toEqual(updatedInfo.title);
      expect(updatedArticle?.text).toEqual(updatedInfo.text);
    });

    it('should update only the title of a specific article', async () => {
      const savedArticle = await new Article({
        title: 'New article',
        text: 'This article has an id',
      }).save();

      const updatedInfo = {
        title: 'Updated title!',
      };

      const response = await global.testRequest.patch(`/articles/${savedArticle._id}`).send(updatedInfo);
      const updatedArticle = await Article.findOne({ _id: savedArticle._id });

      expect(response.status).toBe(204);
      expect(updatedArticle?.title).toEqual(updatedInfo.title);
      expect(updatedArticle?.text).toEqual('This article has an id');
    });

    it('should return 404 when the article is not found', async () => {
      const articleId = '61c8f021fb837f6cf1c89b0f';

      const response = await global.testRequest.patch(`/articles/${articleId}`).send({
        title: 'Text to update',
        text: 'Text to update',
      });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Article not found!');
    });
  });
});
