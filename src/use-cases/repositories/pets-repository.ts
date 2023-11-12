import { Pets, Prisma } from '@prisma/client'
import { ListPetsUseCaseParams } from '../pets/list-pets'

export interface PetsRepository {
  create(data: Prisma.PetsUncheckedCreateInput): Promise<Pets>
  findPetById(
    petId: string,
  ): Promise<{ pet: Pets | null; orgPhone: string | null }>
  findManyByCity(data: ListPetsUseCaseParams): Promise<Pets[]>
}
