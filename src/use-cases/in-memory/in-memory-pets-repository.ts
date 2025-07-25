import { Orgs, Pets, Prisma } from '@prisma/client'
import { PetsRepository } from '../repositories/pets-repository'
import { randomUUID } from 'node:crypto'
import { ListPetsUseCaseParams } from '../pets/list-pets'

export class InMemoryPetsRepository implements PetsRepository {
  public Pets: Pets[] = []
  public Orgs: Orgs[] = []

  async create(data: Prisma.PetsUncheckedCreateInput): Promise<Pets> {
    const isAdopted = () => {
      if (!data.adopted) {
        return false
      } else {
        return true
      }
    }
    const pet = {
      petId: randomUUID(),
      name: data.name,
      description: data.description,
      age: data.age,
      size: data.size,
      spaceRequired: data.spaceRequired,
      image: data.image,
      independenceLevel: data.independenceLevel,
      orgId: data.orgId,
      adoptionRequirements: data.adoptionRequirements,
      energyLevel: data.energyLevel,
      adopted: isAdopted(),
    }

    this.Pets.push(pet)
    return pet
  }

  async findManyByCity(data: ListPetsUseCaseParams): Promise<Pets[]> {
    const orgsInCity = this.Orgs.filter((org) => org.city === data.city)

    if (orgsInCity.length === 0) {
      throw new Error('No organizations found in this city')
    }

    const orgIdInCity = orgsInCity.map((org) => org.orgId)

    let petsInCity = this.Pets.filter(
      (pet) => orgIdInCity.includes(pet.orgId) && pet.adopted === false,
    )

    if (data.age) {
      petsInCity = petsInCity.filter((item) => item.age === data.age)
    }
    if (data.energyLevel) {
      petsInCity = petsInCity.filter(
        (item) => item.energyLevel === data.energyLevel,
      )
    }
    if (data.size) {
      petsInCity = petsInCity.filter((item) => item.size === data.size)
    }
    if (data.spaceRequired) {
      petsInCity = petsInCity.filter(
        (item) => item.spaceRequired === data.spaceRequired,
      )
    }
    if (data.independenceLevel) {
      petsInCity = petsInCity.filter(
        (item) => item.independenceLevel === data.independenceLevel,
      )
    }

    const currentPage = data.page ?? 1
    const startIndex = (currentPage - 1) * 20
    const endIndex = currentPage * 20

    return petsInCity.length > 0 ? petsInCity.slice(startIndex, endIndex) : []
  }

  async findPetById(
    petId: string,
  ): Promise<{ pet: Pets | null; orgPhone: string | null }> {
    const pet = this.Pets.find((pet) => pet.petId === petId)
    if (!pet) {
      return { pet: null, orgPhone: null }
    }

    const org = this.Orgs.find((org) => org.orgId === pet.orgId)
    const orgPhone = org ? org.phone : null

    return { pet, orgPhone }
  }
}
