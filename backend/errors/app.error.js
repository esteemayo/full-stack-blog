import { StatusCodes } from 'http-status-codes';

export class AppError extends Error {
  constructor(message) {
    super(message);

    this.status = 'error';
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}
