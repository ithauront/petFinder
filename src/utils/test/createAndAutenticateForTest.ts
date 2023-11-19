import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAutenticate(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.orgs.create({
    data: {
      name: 'cat shelter test',
      email: 'test3@finder.com',
      password_hash: await hash('12345678', 6),
      cep: '41950-810',
      phone: '0675487895',
      city: 'Salvador',
      state: 'Bahia',
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const org = await request(app.server).post('/session').send({
    email: 'test3@finder.com',
    password: '12345678',
  })
  const { orgId } = org.body
  const { token } = org.body

  return { orgId, token }
}
