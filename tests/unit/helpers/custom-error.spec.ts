import CustomError from '../../../src/helpers/errors/custom-error';

describe('CustomError', () => {
  it('should format error with mandatory fields', () => {
    const error = CustomError.format({ code: 400, message: 'Validation error!' });

    expect(error).toEqual({
      code: 400,
      error: 'Bad Request',
      message: 'Validation error!',
    });
  });
});
