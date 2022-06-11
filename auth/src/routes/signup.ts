import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post(
	'/api/users/signup',
	[
		body('email').isEmail().withMessage('Email must be valid'),
		body('password')
			.trim()
			.isLength({ min: 4, max: 20 })
			.withMessage('Password must be between 4 and 20 characters'),
	],
	validateRequest, // middleware => validateRequest
	async (req: Request, res: Response) => {
		const { email, password } = req.body;
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			throw new BadRequestError('Email in use');
		}

		const user = User.build({ email, password });
		// hash the password
		await user.save();

		// generate JWT
		const userJwt = jwt.sign(
			{ id: user.id, email: user.email },
			process.env.JWT_KEY! // tell ts its defined with !
		);

		// store on the session
		req.session = {
			jwt: userJwt,
		};

		// send back cookie
		res.status(201).send(user);
	}
);

export { router as signupRouter };
