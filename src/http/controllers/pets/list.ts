import { ResourceNotFoundError } from '@/use-cases/errors/resourceNotFound'
import { makeListPetsUseCase } from '@/use-cases/factory/pets/make-list-pets'
import {
  EnergyEnum,
  IndependenceEnum,
  SizeEnum,
  SpaceEnum,
} from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function list(request: FastifyRequest, reply: FastifyReply) {
  const getQuerySchema = z.object({
    city: z.string(),
    age: z.string().nullable().optional(),
    size: z.nativeEnum(SizeEnum).nullable().optional(),
    energyLevel: z.nativeEnum(EnergyEnum).nullable().optional(),
    independenceLevel: z.nativeEnum(IndependenceEnum).nullable().optional(),
    spaceRequired: z.nativeEnum(SpaceEnum).nullable().optional(),
    page: z.number().optional().default(1),
  })

  const {
    age,
    energyLevel,
    independenceLevel,
    city,
    page,
    size,
    spaceRequired,
  } = getQuerySchema.parse(request.query)

  try {
    const listUseCase = makeListPetsUseCase()
    const pets = await listUseCase.execute({
      age: age ?? undefined,
      energyLevel: energyLevel ?? undefined,
      independenceLevel: independenceLevel ?? undefined,
      city,
      page: page ?? 1,
      size: size ?? undefined,
      spaceRequired: spaceRequired ?? undefined,
    })
    return reply.status(200).send(pets)
  } catch (err) {
    console.log('Erro capturado:', err)
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
    return reply.status(500).send({ message: 'Internal server error' })
  }
}
