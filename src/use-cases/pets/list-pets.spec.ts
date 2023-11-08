import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryPetsRepository } from '../in-memory/in-memory-pets-repository'
import { ListPetsUseCase } from './list-pets'

let PetsRepository: InMemoryPetsRepository
let sut: ListPetsUseCase

describe('list pets use case', () => {
  beforeEach(() => {
    PetsRepository = new InMemoryPetsRepository()
    sut = new ListPetsUseCase(PetsRepository)
  })
  test('if can list pets', async () => {
    const org = {
      orgId: 'orgId01',
      name: 'Dog Finder',
      email: 'dog@finder.com',
      cep: '41950-810',
      phone: '01548752',
      password_hash: 'testpassword',
      city: 'testCity',
      state: 'testState',
      created_at: new Date(),
    }

    PetsRepository.Orgs.push(org)

    await PetsRepository.create({
      name: 'Doguinho',
      description: 'Um cachorro carinhoso',
      age: '3',
      energyLevel: 'media',
      independenceLevel: 'alta',
      adoptionRequirements: 'Precisa ter muito amor para dar',
      image: 'Imagem de doguinho',
      orgId: org.orgId,
      size: 'medio',
      spaceRequired: 'medio',
    })
    await PetsRepository.create({
      name: 'Gatinho',
      description: 'Um gato carinhoso',
      age: '3',
      energyLevel: 'media',
      independenceLevel: 'alta',
      adoptionRequirements: 'Precisa ter muito amor para dar',
      image: 'Imagem de doguinho',
      orgId: org.orgId,
      size: 'medio',
      spaceRequired: 'medio',
    })
    const { pets } = await sut.execute({ city: 'testCity' })
    expect(pets).toBeInstanceOf(Array)
    expect(pets).toHaveLength(2)
    expect(pets[0].orgId).toBe(org.orgId)
  })
})
