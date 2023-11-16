import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middleware/verify-jwt'
import { register } from './register'
import { list } from './list'
import { get } from './get'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJWT] }, register)
  app.get('/pets', list)
  app.get('/pets/:petId', get)
}
