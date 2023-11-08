import { beforeEach, describe, expect, test } from 'vitest'
import { RegisterPetUseCase } from './register-pet'
import { InMemoryPetsRepository } from '../in-memory/in-memory-pets-repository'

let PetsRepository: InMemoryPetsRepository
let sut: RegisterPetUseCase

describe('register use case', () => {
  beforeEach(() => {
    PetsRepository = new InMemoryPetsRepository()
    sut = new RegisterPetUseCase(PetsRepository)
  })
  test('if can register pet', async () => {
    const { pet } = await sut.execute({
      name: 'Doguinho',
      description: 'Um cachorro carinhoso',
      age: '3',
      energyLevel: 'media',
      independenceLevel: 'alta',
      adoptionRequirements: 'Precisa ter muito amor para dar',
      image: 'Imagem de doguinho',
      orgId: '123456',
      size: 'medio',
      spaceRequired: 'medio',
    })
    expect(pet.petId).toEqual(expect.any(String))
  })
})
