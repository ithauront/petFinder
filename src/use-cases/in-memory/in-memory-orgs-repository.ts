import { Orgs, Prisma } from '@prisma/client'
import { OrgsRepository } from '../repositories/orgs-repository'
import { cepToCityAndState } from '@/utils/cepToCityAndState'

export class InMemoryOrgsRepository implements OrgsRepository {
  public Itens: Orgs[] = []
  async findByEmail(email: string): Promise<Orgs | null> {
    const org = this.Itens.find((item) => item.email === email)

    if (!org) {
      return null
    }
    return org
  }

  async create(data: Prisma.OrgsCreateInput): Promise<Orgs> {
    const cepInfo = await cepToCityAndState(data.cep)
    if (!cepInfo) {
      throw new Error('Invalid CEP number.')
    }

    const { city, state } = cepInfo
    const org = {
      orgId: '123456',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      cep: data.cep,
      phone: data.phone,
      city,
      state,
      created_at: new Date(),
    }
    this.Itens.push(org)
    return org
  }
}
