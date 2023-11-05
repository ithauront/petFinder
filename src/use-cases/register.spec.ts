import { describe, expect, test } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryOrgsRepository } from './in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from './errors/orgAlreadyExists'

describe('register use case', () => {
  test('if registration happens', async () => {
    const orgRepository = new InMemoryOrgsRepository()
    const registerUseCase = new RegisterUseCase(orgRepository)

    const { org } = await registerUseCase.execute({
      name: 'Jhon Doe',
      email: 'jhon@doe.com',
      cep: '41950-810',
      phone: '01548752',
      password: 'testpassword',
    })
    expect(org.orgId).toEqual(expect.any(String))
  })
  test('if hash org password upon registration', async () => {
    const orgRepository = new InMemoryOrgsRepository()
    const registerUseCase = new RegisterUseCase(orgRepository)

    const { org } = await registerUseCase.execute({
      name: 'Jhon Doe',
      email: 'jhon@doe.com',
      cep: '41950-810',
      phone: '01548752',
      password: 'testpassword',
    })

    const isPasswordCorectlyHashed = await compare(
      'testpassword',
      await org.password_hash,
    )
    expect(isPasswordCorectlyHashed).toBe(true)
  })
  test('if cannot ise the same email', async () => {
    const userRepository = new InMemoryOrgsRepository()
    const registerUseCase = new RegisterUseCase(userRepository)
    const email = 'jhon@doe.com'

    await registerUseCase.execute({
      name: 'Jhon Doe',
      email,
      cep: '41950-810',
      phone: '01548752',
      password: 'testpassword',
    })
    await expect(() =>
      registerUseCase.execute({
        name: 'Jhon Doe',
        email,
        cep: '41950-810',
        phone: '01548752',
        password: 'testpassword',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
