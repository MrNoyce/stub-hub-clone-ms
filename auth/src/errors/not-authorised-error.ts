import { CustomError } from './custom-errors';

export class NotAuthorisedError extends CustomError {
	statusCode = 401;

	constructor() {
		super('Not Authorised');

		Object.setPrototypeOf(this, NotAuthorisedError.prototype);
	}

	serialiseErrors() {
		return [{ message: 'Not Authorised' }];
	}
}
