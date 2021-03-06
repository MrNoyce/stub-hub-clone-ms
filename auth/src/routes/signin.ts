import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { Password } from '../services/password';
import { User } from '../models/user';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post(
	'/api/users/signin',
	[
		body('email').isEmail().withMessage('Email must be valid'),
		body('password')
			.trim()
			.notEmpty()
			.withMessage('Password must not be empty'),
	],
	validateRequest, // middleware => validateRequest
	async (req: Request, res: Response) => {
		const { email, password } = req.body;

		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			throw new BadRequestError('Invalid Credentials');
		}

		const passwordMatch = await Password.compare(
			existingUser.password,
			password
		);
		if (!passwordMatch) {
			throw new BadRequestError('Invalid Credentials');
		}

		// generate JWT
		const userJwt = jwt.sign(
			{ id: existingUser.id, email: existingUser.email },
			process.env.JWT_KEY! // tell ts its defined with !
		);

		// store on the session
		req.session = {
			jwt: userJwt,
		};

		// send back cookie
		res.status(200).send(existingUser);
	}
);

export { router as signinRouter };
