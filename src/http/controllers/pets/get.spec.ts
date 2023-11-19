import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('get pet e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('if can get single pet and orgPhone', async () => {
    await request(app.server).post('/orgs').send({
      name: 'cat shelter test',
      email: 'test3@finder.com',
      password: '12345678',
      cep: '41950-810',
      phone: '0675487895',
      role: 'ADMIN',
    })

    const orgResponse = await request(app.server).post('/session').send({
      email: 'test3@finder.com',
      password: '12345678',
    })
    const orgId = orgResponse.body.orgId
    const token = orgResponse.body.token

    const pet = await request(app.server)
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

    const petId = pet.body.pet.petId

    const response = await request(app.server)
      .get(`/pets/${petId}`)
      .query({ city: 'Salvador' })

    expect(response.status).toBe(200)
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
    expect(response.body.orgPhone).toBe('0675487895')
  })
})
