import { describe, expect, test } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryOrgsRepository } from './in-memory/in-memory-orgs-repository'

describe('register use case', () => {
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
})
