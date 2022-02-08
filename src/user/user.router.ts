import { Router } from 'express'
import { check } from 'express-validator'

import { userController } from './user.controller'

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
userRouter.get('/users', userController.getUsers)

export { userRouter }
