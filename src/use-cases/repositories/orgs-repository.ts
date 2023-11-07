import { Orgs, Prisma } from '@prisma/client'

export interface OrgsRepository {
  findById(orgId: string): Promise<Orgs | null>
  create(data: Prisma.OrgsCreateInput): Promise<Orgs>
  findByEmail(email: string): Promise<Orgs | null>
}
