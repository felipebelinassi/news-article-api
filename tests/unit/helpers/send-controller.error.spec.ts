import { Response } from 'express';
import { sendErrorResponse } from '../../../src/helpers/utils/send-controller-errors';

jest.mock('../../../src/helpers/errors/custom-error', () => ({
  format: () => ({
    code: 500,
    error: 'Internal Server Error',
    message: 'Error!',
  }),
}));

describe('Send controller error unit tests', () => {
  it('should send formatted error in the response', () => {
    const response = {} as Response;
    response.status = jest.fn(() => response);
    response.send = jest.fn(() => response);

    const error = { code: 500, message: 'Error!' };

    sendErrorResponse(response, error);

    expect(response.status).toBeCalledWith(500);
    expect(response.send).toBeCalledWith({
      code: 500,
      error: 'Internal Server Error',
      message: 'Error!',
    });
  });
});
