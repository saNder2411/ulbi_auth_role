import { Router } from 'express'
import { check } from 'express-validator'

import { userController } from './user.controller'

import { authMiddleware, roleMiddleware } from './middleware/authMiddleware'

const userRouter = Router()

userRouter.post(
	'/register',
	[
		check('username', 'Username have to not empty').notEmpty(),
		check('password', 'Password have to more than 4 and less than 10 characters').isLength({ min: 4, max: 10 }),
	],
	userController.register
)
userRouter.post('/login', userController.login)
userRouter.get('/users', authMiddleware, roleMiddleware(['admin']), userController.getUsers)

export { userRouter }
