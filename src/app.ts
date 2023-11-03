import fastify from 'fastify'
import { register } from './http/controller/users/register'

export const app = fastify()

app.post('/users', register)
