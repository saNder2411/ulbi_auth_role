import { UserSchema } from '../entity/User'

export type UserRegisterDTO = Pick<UserSchema, 'username' | 'password'>
