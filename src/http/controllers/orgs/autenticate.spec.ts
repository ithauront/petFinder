import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('autenticate org e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  test('if can autenticate', async () => {
    await request(app.server).post('/orgs').send({
      name: 'cat shelter test',
      email: 'test3@finder.com',
      password: '12345678',
      cep: '41950-810',
      phone: '0675487895',
    })
    const response = await request(app.server).post('/session').send({
      email: 'test3@finder.com',
      password: '12345678',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.orgId).toEqual(expect.any(String))
    expect(response.body.token).toEqual(expect.any(String))
  })
})
