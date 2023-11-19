import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { createAndAutenticate } from '@/utils/test/createAndAutenticateForTest'

describe('list pet e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('if can list pets', async () => {
    const { orgId, token } = await createAndAutenticate(app, true)

    await request(app.server)
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

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Gatinho',
        description: 'Um gatinho carinhoso',
        age: '3',
        energyLevel: 'media',
        independenceLevel: 'alta',
        adoptionRequirements: 'Precisa ter muito amor para dar',
        image: 'Imagem de gatinho',
        size: 'medio',
        spaceRequired: 'medio',
        orgId,
      })

    const response = await request(app.server)
      .get('/pets')
      .query({ city: 'Salvador' })

    expect(response.status).toBe(200)
    expect(response.body.pets).toBeInstanceOf(Array)
    expect(response.body.pets).toHaveLength(2)
  })
})
