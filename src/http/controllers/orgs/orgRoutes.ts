import { FastifyInstance } from 'fastify'
import { register } from './register'
import { autenticate } from './autenticate'
import { getOrg } from './get'
import { verifyJWT } from '@/http/middleware/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
  app.post('/session', autenticate)
  app.get('/orgs', { onRequest: [verifyJWT] }, getOrg)
}
