import { OrgAlreadyExistsError } from '@/use-cases/errors/orgAlreadyExists'
import { makeRegisterUseCase } from '@/use-cases/factory/orgs/make-register'
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
    const registerUseCase = makeRegisterUseCase()
    const org = await registerUseCase.execute({
      name,
      email,
      password,
      cep,
      phone,
    })
    return reply.status(201).send(org)
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    return reply.status(500).send()
  }
}
