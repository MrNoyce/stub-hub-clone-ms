import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post(
	'/api/users/signin',
	[
		body('email').isEmail().withMessage('Email must be valid'),
		body('password').trim().notEmpty().withMessage('Password must not be empty'),
	],
  validateRequest, // middleware => validateRequest
	async (req: Request, res: Response) => {    

		res.send('sign in');
	}
);

export { router as signinRouter };
