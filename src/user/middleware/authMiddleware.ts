import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import config from '../../../config'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	if (req.method === 'OPTIONS') return next()

	try {
		const token = req.headers.authorization?.split(' ')[1]
		if (!token) return res.status(403).json({ message: 'User is not authorized' })

		const decodeData = jwt.verify(token, config.secret) as { id: string; roles: string[] }
		req.user = decodeData
		next()
	} catch (e) {
		console.log(e)
		return res.status(403).json({ message: 'User is not authorized' })
	}
}

export const roleMiddleware = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
	if (req.method === 'OPTIONS') return next()

	try {
		const token = req.headers.authorization?.split(' ')[1]
		if (!token) return res.status(403).json({ message: 'User is not authorized' })

		const decodeData = jwt.verify(token, config.secret) as { id: string; roles: string[] }
		let hasRole = false
		decodeData.roles.forEach((r) => {
			if (roles.includes(r)) {
				hasRole = true
			}
		})

		if (!hasRole) return res.status(403).json({ message: `You does'nt have access!` })

		next()
	} catch (e) {
		console.log(e)
		return res.status(403).json({ message: 'User is not authorized' })
	}
}
