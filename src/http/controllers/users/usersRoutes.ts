import { FastifyInstance } from 'fastify'
import { register } from './register'
import { autenticate } from './autenticate'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
  app.post('/session', autenticate)
}
