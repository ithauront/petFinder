import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('register org e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  test('if can register', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'cat shelter test',
      email: 'test3@finder.com',
      password: '12345678',
      cep: '41950-810',
      phone: '0675487895',
      role: 'ADMIN',
    })
    expect(response.statusCode).toEqual(201)
    expect(response.body.org).toEqual(
      expect.objectContaining({
        name: 'cat shelter test',
        email: 'test3@finder.com',
        cep: '41950-810',
        phone: '0675487895',
      }),
    )
  })
})
