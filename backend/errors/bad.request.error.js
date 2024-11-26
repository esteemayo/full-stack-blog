import { StatusCodes } from 'http-status-codes';

import { AppError } from './app.error.js';

export class BadRequestError extends AppError {
  constructor(message) {
    super(message);

    this.status = 'fail';
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
