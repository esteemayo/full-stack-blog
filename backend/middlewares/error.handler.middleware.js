import { StatusCodes } from 'http-status-codes';

import app from '../app.js';

const sendErrorDev = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });

const sendErrorProd = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });

export const errorHandlerMiddleware = (err, res, req, next) => {
  const customError = {
    message: err.message || 'Something went wrong!',
    status: err.status,
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    stack: err.stack,
  };

  if (app.get('env') === 'development') {
    sendErrorDev(customError, res);
  } else if (app.get('env') === 'production') {
    sendErrorProd(customError, res);
  }
};
