import { makeRegisterPetUseCase } from '@/use-cases/factory/pets/make-register-pet'
import {
  EnergyEnum,
  IndependenceEnum,
  SizeEnum,
  SpaceEnum,
} from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.string(),
    size: z.nativeEnum(SizeEnum),
    energyLevel: z.nativeEnum(EnergyEnum),
    independenceLevel: z.nativeEnum(IndependenceEnum),
    spaceRequired: z.nativeEnum(SpaceEnum),
    image: z.string(),
    adoptionRequirements: z.string(),
    orgId: z.string(),
  })
  const {
    adoptionRequirements,
    age,
    description,
    energyLevel,
    image,
    independenceLevel,
    name,
    orgId,
    size,
    spaceRequired,
  } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterPetUseCase()
    const pet = await registerUseCase.execute({
      adoptionRequirements,
      age,
      description,
      energyLevel,
      image,
      independenceLevel,
      name,
      orgId,
      size,
      spaceRequired,
    })
    return reply.status(201).send(pet)
  } catch (err) {
    return reply.status(500).send({ message: 'Internal server error' })
  }
}
