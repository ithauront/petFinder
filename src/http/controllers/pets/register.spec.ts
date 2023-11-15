import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('register pet e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  test('if register pet', async () => {
    await request(app.server).post('/orgs').send({
      name: 'cat shelter test',
      email: 'test3@finder.com',
      password: '12345678',
      cep: '41950-810',
      phone: '0675487895',
    })
    const org = await request(app.server).post('/session').send({
      email: 'test3@finder.com',
      password: '12345678',
    })

    const orgId = org.body.orgId
    const token = org.body.token

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
