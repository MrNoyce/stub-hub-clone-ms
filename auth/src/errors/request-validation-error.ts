import { ValidationError } from 'express-validator';
import { CustomError } from './custom-errors';

// interface CustomError {
//  statusCode: number;
//  serialiseErrors(): {
//   message: string;
//   field?: string;
//  }[]
// }

// export class RequestValidationError extends Error implements CustomError { 
export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');

    // Only because we extend a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serialiseErrors() {
    return this.errors.map((err) => ({ message: err.msg, field: err.param }));
  }
}
