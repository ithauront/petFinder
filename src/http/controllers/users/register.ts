import { prisma } from '@/lib/prisma'
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

  const password_hash = await hash(password, 6)

  const cepInfo = await cepToCityAndState(cep)
  if (!cepInfo) {
    return reply.status(400).send({ error: 'CEP inválido ou não encontrado.' })
  }

  const { city, state } = cepInfo

  const orgWithSameEmail = await prisma.orgs.findUnique({
    where: { email },
  })
  if (orgWithSameEmail) {
    return reply.status(409).send()
  }

  const org = await prisma.orgs.create({
    data: {
      name,
      email,
      password_hash,
      cep, // mesmo transformando o cep em cidade e estado, ainda acho interessante salvar essa informação.
      city,
      state,
      phone,
    },
  })
  return reply.status(201).send({ org })
}
