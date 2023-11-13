import { GetPetUseCase } from '@/use-cases/pets/get-pet'
import { PrismaPetsRepository } from '@/use-cases/repositories/prisma/prisma-pets-repository'

export function makeGetPetUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const getPet = new GetPetUseCase(prismaPetsRepository)

  return getPet
}
