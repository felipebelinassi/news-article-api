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
  });
});
