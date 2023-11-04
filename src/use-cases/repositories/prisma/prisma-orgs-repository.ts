import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgsCreateInput) {
    const org = await prisma.orgs.create({
      data,
    })
    return org
  }
}
