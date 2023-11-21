import { beforeEach, describe, expect, test } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryOrgsRepository } from '../in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from '../errors/orgAlreadyExists'
import { error } from 'console'
import { InvalidCepError } from '../errors/invalidCEP'

let OrgsRepository: InMemoryOrgsRepository
let sut: RegisterUseCase

describe('register use case', () => {
  beforeEach(() => {
    OrgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterUseCase(OrgsRepository)
  })
  test('if registration happens', async () => {
    const { org } = await sut.execute({
      name: 'Dog Finder',
      email: 'dog@finder.com',
      cep: '41950-810',
      phone: '01548752',
      password: 'testpassword',
    })
    expect(org.orgId).toEqual(expect.any(String))
  })
  test('if cepToCityandState function is returning the corect location', async () => {
    const { org } = await sut.execute({
      name: 'Dog Finder',
      email: 'dog@finder.com',
      cep: '41950-810',
      phone: '01548752',
      password: 'testpassword',
    })
    expect(org.city).toEqual('Salvador')
    expect(org.state).toEqual('BA')
  })
  test('if hash org password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'Dog Finder',
      email: 'dog@finder.com',
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
  test('if cannot use the same email', async () => {
    const email = 'dog@finder.com'

    await sut.execute({
      name: 'Dog Finder',
      email,
      cep: '41950-810',
      phone: '01548752',
      password: 'testpassword',
    })
    await expect(() =>
      sut.execute({
        name: 'Dog Finder',
        email,
        cep: '41950-810',
        phone: '01548752',
        password: 'testpassword',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
  test('if wrong cep returns an error', async () => {
    await expect(
      sut.execute({
        name: 'Dog Finder',
        email: 'dog@finder.com',
        cep: '41950-8103234564235642',
        phone: '01548752',
        password: 'testpassword',
      }),
    ).rejects.toBeInstanceOf(InvalidCepError)
  })
})
