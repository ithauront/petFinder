import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middleware/verify-jwt'
import { register } from './register'
import { list } from './list'
import { get } from './get'
import { verifyUser } from '@/http/middleware/verifyRole'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJWT, verifyUser('ADMIN')] }, register)
  app.get('/pets', list)
  app.get('/pets/:petId', get)
}
