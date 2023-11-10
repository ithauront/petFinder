import { Pets } from '@prisma/client'
import { PetsRepository } from '../repositories/pets-repository'
import { ResourceNotFoundError } from '../errors/resourceNotFound'

export interface GetPetUseCaseParams {
  petId: string
}

interface GetPetUseCaseResponse {
  pet: Pets
}
// the idea for this useCase is that the user will already had all pets in a search listed, and when he clicks in one of the pets we will use this logic to bring him all the details about this one. of course we could display the details using the logic that list all pets, but I think this way is more organized.
export class GetPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: GetPetUseCaseParams): Promise<GetPetUseCaseResponse> {
    const pet = await this.petsRepository.findPetById(petId)
    if (!pet) {
      throw new ResourceNotFoundError()
    }
    return { pet }
  }
}
