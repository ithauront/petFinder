import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { createAndAutenticate } from '@/utils/test/createAndAutenticateForTest'

describe('register pet e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  test('if register pet', async () => {
    const { orgId, token } = await createAndAutenticate(app, true)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Doguinho',
        description: 'Um cachorro carinhoso',
        age: '3',
        energyLevel: 'media',
        independenceLevel: 'alta',
        adoptionRequirements: 'Precisa ter muito amor para dar',
        image: 'Imagem de doguinho',
        size: 'medio',
        spaceRequired: 'medio',
        orgId,
      })

    expect(response.status).toEqual(201)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        name: 'Doguinho',
        description: 'Um cachorro carinhoso',
        age: '3',
        energyLevel: 'media',
        independenceLevel: 'alta',
        adoptionRequirements: 'Precisa ter muito amor para dar',
        image: 'Imagem de doguinho',
        size: 'medio',
        spaceRequired: 'medio',
      }),
    )
  })
})
