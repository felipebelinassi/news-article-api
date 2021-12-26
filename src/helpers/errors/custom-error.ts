import httpStatusCodes from 'http-status-codes';

export interface APIError {
  code: number;
  status?: number;
  key?: string;
  message: string;
}

interface CustomErrorResponse extends Omit<APIError, 'key' | 'status'> {
  error: string;
}

export default class CustomError {
  public static format(error: APIError): CustomErrorResponse {
    return {
      code: error.code,
      error: error.key || httpStatusCodes.getStatusText(error.code),
      message: error.message,
    };
  }
}
