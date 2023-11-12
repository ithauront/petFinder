import { Pets } from '@prisma/client'
import { PetsRepository } from '../repositories/pets-repository'
import { ResourceNotFoundError } from '../errors/resourceNotFound'

export interface GetPetUseCaseParams {
  petId: string
}

interface GetPetUseCaseResponse {
  pet: Pets | null
  orgPhone: string | null
}

export class GetPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: GetPetUseCaseParams): Promise<GetPetUseCaseResponse> {
    const { pet, orgPhone } = await this.petsRepository.findPetById(petId)
    if (!pet) {
      throw new ResourceNotFoundError()
    }
    return { pet, orgPhone }
  }
}
