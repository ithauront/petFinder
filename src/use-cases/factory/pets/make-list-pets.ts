import { ListPetsUseCase } from '@/use-cases/pets/list-pets'
import { PrismaPetsRepository } from '@/use-cases/repositories/prisma/prisma-pets-repository'

export function makeListPetsUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const listPets = new ListPetsUseCase(prismaPetsRepository)
  return listPets
}
