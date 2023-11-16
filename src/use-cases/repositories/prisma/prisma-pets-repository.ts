import { ListPetsUseCaseParams } from '@/use-cases/pets/list-pets'
import { Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetsUncheckedCreateInput) {
    const pet = await prisma.pets.create({ data })
    return pet
  }

  async findPetById(petId: string) {
    const pet = await prisma.pets.findUnique({
      where: { petId },
    })

    if (!pet || !pet.orgId) {
      return { pet: null, orgPhone: null }
    }
    const orgId = pet?.orgId
    const org = await prisma.orgs.findUnique({
      where: {
        orgId,
      },
    })

    const orgPhone = org?.phone ?? null
    return { pet, orgPhone }
  }

  async findManyByCity(data: ListPetsUseCaseParams) {
    const orgsInCity = await prisma.orgs.findMany({
      where: {
        city: data.city,
      },
    })
    const orgIdInCity = orgsInCity.map((org) => org.orgId)
    if (data.page === undefined) {
      data.page = 1
    }

    const petsInCity = await prisma.pets.findMany({
      where: {
        orgId: {
          in: orgIdInCity,
        },
        adopted: false,
        age: data.age,
        energyLevel: data.energyLevel,
        independenceLevel: data.independenceLevel,
        size: data.size,
        spaceRequired: data.spaceRequired,
      },
      take: 20,
      skip: (data.page - 1) * 20,
    })
    return petsInCity
  }
}
