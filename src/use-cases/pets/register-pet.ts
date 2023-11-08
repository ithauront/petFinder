import { $Enums, Pets } from '@prisma/client'
import { PetsRepository } from '../repositories/pets-repository'

interface RegisterPetUseCaseParams {
  name: string
  description: string
  age: string
  size: $Enums.SizeEnum
  energyLevel: $Enums.EnergyEnum
  independenceLevel: $Enums.IndependenceEnum
  spaceRequired: $Enums.SpaceEnum
  image: string
  adoptionRequirements: string
  orgId: string
}

interface RegisterPetUseCaseResponse {
  pet: Pets
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    description,
    age,
    energyLevel,
    independenceLevel,
    adoptionRequirements,
    image,
    orgId,
    size,
    spaceRequired,
  }: RegisterPetUseCaseParams): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      description,
      age,
      energyLevel,
      independenceLevel,
      adoptionRequirements,
      image,
      orgId,
      size,
      spaceRequired,
    })
    return { pet }
  }
}
