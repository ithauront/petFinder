import { ResourceNotFoundError } from '@/use-cases/errors/resourceNotFound'
import { makeGetPetUseCase } from '@/use-cases/factory/pets/make-get-pet'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const getParamSchema = z.object({
    petId: z.string(),
  })

  const { petId } = getParamSchema.parse(request.params)

  try {
    const getPetUseCase = makeGetPetUseCase()
    const { pet, orgPhone } = await getPetUseCase.execute({
      petId,
    })
    return reply.status(200).send({ pet, orgPhone })
  } catch (err) {
    console.log('Erro capturado:', err)
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
    return reply.status(500).send({ message: 'Internal server error' })
  }
}
