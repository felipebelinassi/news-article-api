import { Request, Response } from 'express';
import errorHandler from '../../../src/middlewares/error-handler';

const expectedFormattedError = {
  code: 500,
  error: 'Internal Server Error',
  message: 'Test error',
};

jest.mock('../../../src/helpers/errors/custom-error', () => ({
  format: () => expectedFormattedError,
}));

describe('Error handler middleware unit tests', () => {
  it('should send errors on the response', () => {
    const request = jest.fn() as unknown as Request;
    const response = {} as Response;
    response.status = jest.fn(() => response);
    response.json = jest.fn(() => response);
    const next = jest.fn();

    const error = new Error('Test error');

    errorHandler(error, request, response, next);

    expect(response.status).toBeCalledWith(expectedFormattedError.code);
    expect(response.json).toBeCalledWith(expectedFormattedError);
    expect(next).toBeCalled();
  });
});
