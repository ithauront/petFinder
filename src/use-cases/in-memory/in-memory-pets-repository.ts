import { Pets, Prisma } from '@prisma/client'
import { PetsRepository } from '../repositories/pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public Items: Pets[] = []

  async create(data: Prisma.PetsUncheckedCreateInput): Promise<Pets> {
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
    }

    this.Items.push(pet)
    return pet
  }
}
