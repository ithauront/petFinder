import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('get org e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  test('if can get org profile', async () => {
    await request(app.server).post('/orgs').send({
      name: 'cat shelter test',
      email: 'test3@finder.com',
      password: '12345678',
      cep: '41950-810',
      phone: '0675487895',
    })
    const authResponse = await request(app.server).post('/session').send({
      email: 'test3@finder.com',
      password: '12345678',
    })
    const token = authResponse.body.token
    const response = await request(app.server)
      .get('/orgs')
      .set('Authorization', `Bearer ${token}`)
      .send()
    expect(response.statusCode).toEqual(200)
    expect(response.body.org).toEqual(
      expect.objectContaining({
        email: 'test3@finder.com',
      }),
    )
  })
})
