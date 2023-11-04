import { Orgs, Prisma } from '@prisma/client'

export interface OrgsRepository {
  create(data: Prisma.OrgsCreateInput): Promise<Orgs>
}
