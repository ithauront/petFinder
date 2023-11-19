import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { createAndAutenticate } from '@/utils/test/createAndAutenticateForTest'

describe('get org e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  test('if can get org profile', async () => {
    const { token } = await createAndAutenticate(app)
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
