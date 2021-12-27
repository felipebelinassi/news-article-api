import { Request, Response } from 'express';
import { validateArticleId } from '../../../src/middlewares/request-validators';

describe('Request validators unit tests', () => {
  describe('Validate article id', () => {
    it('should call next for valid ObjectId', () => {
      const request = jest.fn() as unknown as Request;
      const response = {} as Response;
      response.status = jest.fn(() => response);
      response.send = jest.fn(() => response);
      const next = jest.fn();

      request.params = {
        id: '61c903574cebdb55a40ca813',
      };

      validateArticleId(request, response, next);

      expect(next).toBeCalled();
    });

    it('should send 400 response for invalid ObjectId', () => {
      const request = jest.fn() as unknown as Request;
      const response = {} as Response;
      response.status = jest.fn(() => response);
      response.send = jest.fn(() => response);
      const next = jest.fn();

      request.params = {
        id: 'invalid-id',
      };

      validateArticleId(request, response, next);

      expect(response.status).toBeCalledWith(400);
    });
  });
});
