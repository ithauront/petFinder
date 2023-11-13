import { RegisterPetUseCase } from '@/use-cases/pets/register-pet'
import { PrismaPetsRepository } from '@/use-cases/repositories/prisma/prisma-pets-repository'

export function makeRegisterPetUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const registerPet = new RegisterPetUseCase(prismaPetsRepository)
  return registerPet
}
