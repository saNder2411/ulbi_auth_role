import { Schema, model } from 'mongoose'

export type UserSchema = {
	_id: string
	username: string
	password: string
	roles: string[]
}

export const userSchema = new Schema<UserSchema>({
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	roles: [{ type: String, ref: 'Role' }],
})

export const User = model<UserSchema>('User', userSchema)
