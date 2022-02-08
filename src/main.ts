import Express, { json } from 'express'
import Mongoose from 'mongoose'
import { userRouter } from './user/user.router'

const PORT = process.env.PORT || 5000

const DB_URL = 'mongodb+srv://user0:1234@cluster0.1uhjb.mongodb.net/auth_roles?retryWrites=true&w=majority'

const app = Express()

app.use(json())

app.use('/auth', userRouter)

const start = async () => {
	try {
		await Mongoose.connect(DB_URL)
		app.listen(PORT, () => console.log(`listening on port http://localhost:${PORT}`))
	} catch (err) {
		console.log(err)
	}
}

start()
