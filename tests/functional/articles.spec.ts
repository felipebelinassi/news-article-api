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
});
