import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'
import { cepToCityAndState } from './utils/cepToCityAndState'

export const app = fastify()

app.post('/orgs', async (request, reply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(7),
    cep: z.string(),
    phone: z.string(),
  })
  const { name, email, password, cep, phone } = registerBodySchema.parse(
    request.body,
  )

  const cepInfo = await cepToCityAndState(cep)
  if (!cepInfo) {
    return reply.status(400).send({ error: 'CEP inválido ou não encontrado.' })
  }

  const { city, state } = cepInfo

  const org = await prisma.orgs.create({
    data: {
      name,
      email,
      password_hash: password,
      cep,
      city,
      state,
      phone,
    },
  })
  return reply.status(201).send({ org })
})
