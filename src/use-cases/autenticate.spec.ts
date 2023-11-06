import { describe, expect, test } from 'vitest'
import { InMemoryOrgsRepository } from './in-memory/in-memory-orgs-repository'
import { AutenticateUseCase } from './autenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalidCredentials'

describe('autenticate use case', () => {
  test('if autentication happens', async () => {
    const orgRepository = new InMemoryOrgsRepository()
    const sut = new AutenticateUseCase(orgRepository)

    await orgRepository.create({
      name: 'Jhon Doe',
      email: 'jhon@doe.com',
      cep: '41950-810',
      phone: '01548752',
      password_hash: await hash('testpassword', 6),
      city: 'salvador',
      state: 'bahia',
    })

    const { org } = await sut.execute({
      email: 'jhon@doe.com',
      password: 'testpassword',
    })
    expect(org.orgId).toEqual(expect.any(String))
  })

  test('if autentication with wrong email fails', async () => {
    const orgRepository = new InMemoryOrgsRepository()
    const sut = new AutenticateUseCase(orgRepository)

    await expect(() =>
      sut.execute({
        email: 'jhon@doe.com',
        password: 'testpassword',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  test('if autentication with wrong password fails', async () => {
    const orgRepository = new InMemoryOrgsRepository()
    const sut = new AutenticateUseCase(orgRepository)

    await orgRepository.create({
      name: 'Jhon Doe',
      email: 'jhon@doe.com',
      cep: '41950-810',
      phone: '01548752',
      password_hash: await hash('testpassword', 6),
      city: 'salvador',
      state: 'bahia',
    })

    await expect(() =>
      sut.execute({
        email: 'jhon@doe.com',
        password: 'wrongpassword',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
