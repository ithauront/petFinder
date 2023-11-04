import { describe, expect, test } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { cepToCityAndState } from '@/utils/cepToCityAndState'

describe('register use case', () => {
  test('if hash org password upon registration', async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail(email) {
        return null
      },
      async create(data) {
        const cepInfo = await cepToCityAndState(data.cep)
        if (!cepInfo) {
          throw new Error('Invalid CEP number.')
        }

        const { city, state } = cepInfo
        return {
          orgId: '123456',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          cep: data.cep,
          phone: data.phone,
          city,
          state,
          created_at: new Date(),
        }
      },
    })

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
