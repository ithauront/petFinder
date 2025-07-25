import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryOrgsRepository } from '../in-memory/in-memory-orgs-repository'
import { AutenticateUseCase } from './autenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalidCredentials'

let orgsRepository: InMemoryOrgsRepository
let sut: AutenticateUseCase

describe('autenticate use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AutenticateUseCase(orgsRepository)
  })
  test('if autentication happens', async () => {
    await orgsRepository.create({
      name: 'Dog Finder',
      email: 'dog@finder.com',
      cep: '41950-810',
      phone: '01548752',
      password_hash: await hash('testpassword', 6),
      city: 'salvador',
      state: 'bahia',
    })

    const { org } = await sut.execute({
      email: 'dog@finder.com',
      password: 'testpassword',
    })
    expect(org.orgId).toEqual(expect.any(String))
  })

  test('if autentication with wrong email fails', async () => {
    await expect(() =>
      sut.execute({
        email: 'dog@finder.com',
        password: 'testpassword',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  test('if autentication with wrong password fails', async () => {
    await orgsRepository.create({
      name: 'Dog Finder',
      email: 'dog@finder.com',
      cep: '41950-810',
      phone: '01548752',
      password_hash: await hash('testpassword', 6),
      city: 'salvador',
      state: 'bahia',
    })

    await expect(() =>
      sut.execute({
        email: 'dog@finder.com',
        password: 'wrongpassword',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
