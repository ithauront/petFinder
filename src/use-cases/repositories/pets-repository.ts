import { Pets, Prisma } from '@prisma/client'
import { ListPetsUseCaseParams } from '../pets/list-pets'

export interface PetsRepository {
  create(data: Prisma.PetsUncheckedCreateInput): Promise<Pets>
  findPetById(petId: string): Promise<Pets | null>
  findManyByCity(data: ListPetsUseCaseParams): Promise<Pets[]>
}
