import { prisma } from '@/lib/prisma'
import { RegisterUseCase } from '@/use-cases/register'
import { PrismaOrgsRepository } from '@/use-cases/repositories/prisma/prisma-orgs-repository'
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
    const prismaOrgsRepository = new PrismaOrgsRepository()
    const registerUseCase = new RegisterUseCase(prismaOrgsRepository)
    const org = await registerUseCase.execute({
      name,
      email,
      password,
      cep,
      phone,
    })
    return reply.status(201).send({ org })
  } catch (err) {
    return reply.status(409).send()
  }
}
