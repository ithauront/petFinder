import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryPetsRepository } from '../in-memory/in-memory-pets-repository'
import { ListPetsUseCase } from './list-pets'
import { $Enums } from '@prisma/client'

let PetsRepository: InMemoryPetsRepository
let sut: ListPetsUseCase

describe('list pets use case', () => {
  beforeEach(() => {
    PetsRepository = new InMemoryPetsRepository()
    sut = new ListPetsUseCase(PetsRepository)
  })
  test('if can list pets', async () => {
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

    const badOrg = {
      orgId: 'orgId02',
      name: 'Dog Finder',
      email: 'dog@finder.com',
      cep: '41950-810',
      phone: '01548752',
      password_hash: 'testpassword',
      city: 'wrongCity',
      state: 'testState',
      created_at: new Date(),
    }
    PetsRepository.Orgs.push(badOrg)
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
    await PetsRepository.create({
      name: 'Gatinho',
      description: 'Um gato carinhoso',
      age: '3',
      energyLevel: 'media',
      independenceLevel: 'alta',
      adoptionRequirements: 'Precisa ter muito amor para dar',
      image: 'Imagem de doguinho',
      orgId: badOrg.orgId,
      size: 'medio',
      spaceRequired: 'medio',
    })
    const { pets } = await sut.execute({ city: 'rightCity', page: 1 })
    expect(pets).toBeInstanceOf(Array)
    expect(pets).toHaveLength(1)
    expect(pets[0].orgId).toBe(goodOrg.orgId)
  })
  test('if can filter with optional filters combined', async () => {
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
    const badOrg = {
      orgId: 'orgId02',
      name: 'Dog Finder',
      email: 'dog@finder.com',
      cep: '41950-810',
      phone: '01548752',
      password_hash: 'testpassword',
      city: 'wrongCity',
      state: 'testState',
      created_at: new Date(),
    }
    PetsRepository.Orgs.push(badOrg)

    await PetsRepository.create({
      name: 'Doguinho',
      description: 'Um cachorro carinhoso',
      age: '5',
      energyLevel: 'media',
      independenceLevel: 'alta',
      adoptionRequirements: 'Precisa ter muito amor para dar',
      image: 'Imagem de doguinho',
      orgId: goodOrg.orgId,
      size: 'pequeno',
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
      orgId: goodOrg.orgId,
      size: 'medio',
      spaceRequired: 'medio',
    })
    await PetsRepository.create({
      name: 'Donatello',
      description: 'Um tartaruga ninja',
      age: '5',
      energyLevel: 'media',
      independenceLevel: 'alta',
      adoptionRequirements: 'Precisa ter muito amor para dar',
      image: 'Imagem de doguinho',
      orgId: badOrg.orgId,
      size: 'medio',
      spaceRequired: 'medio',
    })

    const filters = {
      city: 'rightCity',
      age: '5',
      size: $Enums.SizeEnum.pequeno,
      energyLevel: $Enums.EnergyEnum.media,
      page: 1,
    }
    const { pets } = await sut.execute(filters)
    expect(pets).toBeInstanceOf(Array)
    expect(pets).toHaveLength(1)
    expect(pets[0].orgId).toBe(goodOrg.orgId)
    expect(pets[0].age).toBe('5')
    expect(pets[0].size).toBe('pequeno')
  })

  test('if pets came paginated', async () => {
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
    for (let i = 1; i <= 22; i++) {
      await PetsRepository.create({
        name: `dog${i}`,
        description: 'Um tartaruga ninja',
        age: '5',
        energyLevel: 'media',
        independenceLevel: 'alta',
        adoptionRequirements: 'Precisa ter muito amor para dar',
        image: 'Imagem de doguinho',
        orgId: goodOrg.orgId,
        size: 'medio',
        spaceRequired: 'medio',
      })
    }
    const filters = {
      city: 'rightCity',
      page: 2,
    }
    const { pets } = await sut.execute(filters)

    expect(pets).toHaveLength(2)
    expect(pets[1].name).toBe('dog22')
  })
  test('if wrong city gives error', async () => {
    await PetsRepository.create({
      name: `dog`,
      description: 'Um tartaruga ninja',
      age: '5',
      energyLevel: 'media',
      independenceLevel: 'alta',
      adoptionRequirements: 'Precisa ter muito amor para dar',
      image: 'Imagem de doguinho',
      orgId: 'org01',
      size: 'medio',
      spaceRequired: 'medio',
    })
    const filters = {
      city: 'rightCity',
    }
    await expect(() => sut.execute(filters)).rejects.toThrowError(
      'No organizations found in this city',
    )
  })
  test('if pet adopted dont show on list', async () => {
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
      name: 'Gatinho',
      description: 'Um gato carinhoso',
      age: '3',
      energyLevel: 'media',
      independenceLevel: 'alta',
      adoptionRequirements: 'Precisa ter muito amor para dar',
      image: 'Imagem de doguinho',
      orgId: goodOrg.orgId,
      size: 'medio',
      spaceRequired: 'medio',
    })

    await PetsRepository.create({
      name: 'Donatello',
      description: 'Um tartaruga ninja',
      age: '5',
      energyLevel: 'media',
      independenceLevel: 'alta',
      adoptionRequirements: 'Precisa ter muito amor para dar',
      image: 'Imagem de doguinho',
      orgId: goodOrg.orgId,
      size: 'medio',
      spaceRequired: 'medio',
      adopted: true,
    })

    const filters = {
      city: 'rightCity',
      page: 1,
    }

    const { pets } = await sut.execute(filters)

    expect(pets).toBeInstanceOf(Array)
    expect(pets).toHaveLength(1)

    expect(pets[0]).toEqual(
      expect.objectContaining({
        name: 'Gatinho',
        description: 'Um gato carinhoso',
        age: '3',
        energyLevel: 'media',
        independenceLevel: 'alta',
        adoptionRequirements: 'Precisa ter muito amor para dar',
        image: 'Imagem de doguinho',
        orgId: goodOrg.orgId,
        size: 'medio',
        spaceRequired: 'medio',
        adopted: false,
      }),
    )
  })
})
