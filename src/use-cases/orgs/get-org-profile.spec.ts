import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryOrgsRepository } from '../in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { GetOrgProfileUseCase } from './get-org-profile'
import { ResourceNotFoundError } from '../errors/resourceNotFound'

let orgsRepository: InMemoryOrgsRepository
let sut: GetOrgProfileUseCase

describe('get org profile use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetOrgProfileUseCase(orgsRepository)
  })
  test('if can get the org profile', async () => {
    const createdOrg = await orgsRepository.create({
      name: 'dog finder',
      email: 'dog@finder.com',
      cep: '41950-810',
      phone: '01548752',
      password_hash: await hash('testpassword', 6),
      city: 'salvador',
      state: 'bahia',
    })

    const { org } = await sut.execute({
      orgId: createdOrg.orgId,
    })
    expect(org.name).toEqual('dog finder')
  })

  test('if autentication with wrong email fails', async () => {
    await expect(() =>
      sut.execute({
        orgId: 'wrong id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
