import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryPetsRepository } from '../in-memory/in-memory-pets-repository'
import { GetPetUseCase } from './get-pet'
import { ResourceNotFoundError } from '../errors/resourceNotFound'

let PetsRepository: InMemoryPetsRepository
let sut: GetPetUseCase

describe('get pets use case', () => {
  beforeEach(() => {
    PetsRepository = new InMemoryPetsRepository()
    sut = new GetPetUseCase(PetsRepository)
  })
  test('if can get single pet', async () => {
    const goodOrg = {
      orgId: 'orgId01',
      name: 'Dog Finder',
      email: 'dog@finder.com',
      cep: '41950-810',
      phone: '01548752',
      password_hash: 'testpassword',
      city: 'rightCity',
      state: 'testState',
      created_at: new Date(),
    }

    PetsRepository.Orgs.push(goodOrg)

    await PetsRepository.create({
      name: 'Doguinho',
      description: 'Um cachorro carinhoso',
      age: '3',
      energyLevel: 'media',
      independenceLevel: 'alta',
      adoptionRequirements: 'Precisa ter muito amor para dar',
      image: 'Imagem de doguinho',
      orgId: goodOrg.orgId,
      size: 'medio',
      spaceRequired: 'medio',
    })
    const pets = await PetsRepository.findManyByCity({ city: 'rightCity' })
    const petId = pets[0].petId

    const { pet, orgPhone } = await sut.execute({ petId })
    expect(pet).toEqual(
      expect.objectContaining({
        name: 'Doguinho',
        description: 'Um cachorro carinhoso',
        age: '3',
        energyLevel: 'media',
        independenceLevel: 'alta',
        adoptionRequirements: 'Precisa ter muito amor para dar',
        image: 'Imagem de doguinho',
        orgId: goodOrg.orgId,
        size: 'medio',
        spaceRequired: 'medio',
      }),
    )
    expect(orgPhone).toBe('01548752')
  })

  test('if cannot get sending wrong id', async () => {
    const goodOrg = {
      orgId: 'orgId01',
      name: 'Dog Finder',
      email: 'dog@finder.com',
      cep: '41950-810',
      phone: '01548752',
      password_hash: 'testpassword',
      city: 'rightCity',
      state: 'testState',
      created_at: new Date(),
    }

    PetsRepository.Orgs.push(goodOrg)

    await PetsRepository.create({
      name: 'Doguinho',
      description: 'Um cachorro carinhoso',
      age: '3',
      energyLevel: 'media',
      independenceLevel: 'alta',
      adoptionRequirements: 'Precisa ter muito amor para dar',
      image: 'Imagem de doguinho',
      orgId: goodOrg.orgId,
      size: 'medio',
      spaceRequired: 'medio',
    })

    const petId = 'wrongId'

    await expect(() => sut.execute({ petId })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
