import { $Enums, Pets } from '@prisma/client'
import { PetsRepository } from '../repositories/pets-repository'
import { ResourceNotFoundError } from '../errors/resourceNotFound'

export interface ListPetsUseCaseParams {
  city: string
  age?: string
  size?: $Enums.SizeEnum
  spaceRequired?: $Enums.SpaceEnum
  energyLevel?: $Enums.EnergyEnum
  independenceLevel?: $Enums.IndependenceEnum
}

interface ListPetsUseCaseResponse {
  pets: Pets[]
}

export class ListPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    energyLevel,
    independenceLevel,
    size,
    spaceRequired,
  }: ListPetsUseCaseParams): Promise<ListPetsUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCity({
      city,
      age,
      energyLevel,
      independenceLevel,
      size,
      spaceRequired,
    })
    if (pets.length === 0) {
      throw new ResourceNotFoundError()
    }
    return { pets }
  }
}
