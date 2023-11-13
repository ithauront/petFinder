import { GetOrgProfileUseCase } from '@/use-cases/orgs/get-org-profile'
import { PrismaOrgsRepository } from '@/use-cases/repositories/prisma/prisma-orgs-repository'

export function makeGetOrgProfileUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const getOrgProfile = new GetOrgProfileUseCase(prismaOrgsRepository)
  return getOrgProfile
}
