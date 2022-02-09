import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

import config from '../../config'
import { UserRegisterDTO } from './dto/user-register.dto'
import { Role } from './entity/Role'
import { User } from './entity/User'

const generateAccessToken = (id: string, roles: string[]) =>
	jwt.sign({ id, roles }, config.secret, { expiresIn: '24h' })

export class UserController {
	async register(req: Request<{}, {}, UserRegisterDTO>, res: Response): Promise<void> {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				res.status(400).json({ message: 'Registration failed', errors: errors.array() })
				return
			}
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

	async login(req: Request<{}, {}, UserRegisterDTO>, res: Response): Promise<void> {
		try {
			const { username, password } = req.body
			const user = await User.findOne({ username })

			if (!user) {
				res.status(400).json({ message: `User with name "${username}" is not exists` })
				return
			}

			const isValid = await bcrypt.compare(password, user.password)

			if (!isValid) {
				res.status(400).json({ message: `Password is not valid` })
				return
			}

			const token = generateAccessToken(user._id, user.roles)

			res.json(token)
		} catch (err) {
			console.log(err)
			res.status(401).json({ message: 'Login error!' })
		}
	}

	async getUsers(req: Request, res: Response): Promise<void> {
		try {
			const users = await User.find()
			res.json(users)
		} catch (err) {}
	}
}

export const userController = new UserController()
