import { Pets, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetsUncheckedCreateInput): Promise<Pets>
}
