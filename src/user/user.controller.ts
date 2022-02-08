import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

import { UserRegisterDTO } from './dto/user-register.dto'
import { Role } from './entity/Role'
import { User } from './entity/User'

export class UserController {
	async register(req: Request<{}, {}, UserRegisterDTO>, res: Response): Promise<void> {
		try {
			const errors = validationResult(req)
			const { username, password } = req.body
			const candidate = await User.findOne({ username })

			if (candidate) {
				res.status(400).json({ message: `User with name "${username}" is already exists` })
				return
			}

			const hashPassword = await bcrypt.hash(password, 7)
			const role = await Role.findOne({ value: 'user' })
			const newUser = await User.create({ username, password: hashPassword, roles: [role?.value || ''] })
			await newUser.save()
			res.json(newUser)
		} catch (err) {
			console.log(err)
			res.status(401).json({ message: 'Registration error!' })
		}
	}

	async login(req: Request, res: Response): Promise<void> {
		try {
		} catch (err) {
			console.log(err)
			res.status(401).json({ message: 'Login error!' })
		}
	}

	async getUsers(req: Request, res: Response): Promise<void> {
		try {
			res.json('server work')
		} catch (err) {}
	}
}

export const userController = new UserController()
