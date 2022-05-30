import { CustomError } from './custom-errors';

export class DatabaseConnectionError extends CustomError {
  reason = 'Error connecting to database';
  statusCode = 500;

  constructor() {
    super('Error connecting to the DB');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serialiseErrors() {
    return [{ message: this.reason }];
  }
}
