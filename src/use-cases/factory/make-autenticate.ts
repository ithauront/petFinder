import { AutenticateUseCase } from '../autenticate'
import { PrismaOrgsRepository } from '../repositories/prisma/prisma-orgs-repository'

export function makeAutenticateUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const autenticateUseCase = new AutenticateUseCase(prismaOrgsRepository)

  return autenticateUseCase
}
