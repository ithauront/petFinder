import { prisma } from '@/lib/prisma'
import { registerUseCase } from '@/use-cases/register'
import { cepToCityAndState } from '@/utils/cepToCityAndState'
import { hash } from 'bcryptjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
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

  try {
    const org = await registerUseCase({ name, email, password, cep, phone })
    return reply.status(201).send({ org })
  } catch (err) {
    return reply.status(409).send()
  }
}
