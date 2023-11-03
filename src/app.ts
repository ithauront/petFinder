import fastify from 'fastify'
import { usersRoutes } from './http/controllers/users/usersRoutes'

export const app = fastify()

app.register(usersRoutes)
