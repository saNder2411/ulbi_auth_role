import { Schema, model } from 'mongoose'

export type RoleSchema = {
	_id: string
	value: string
}

export const roleSchema = new Schema<RoleSchema>({
	value: { type: String, unique: true, default: 'user' },
})

export const Role = model<RoleSchema>('Role', roleSchema)
