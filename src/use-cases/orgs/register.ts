import { cepToCityAndState } from '@/utils/cepToCityAndState'
import { hash } from 'bcryptjs'
import { OrgsRepository } from '../repositories/orgs-repository'
import { OrgAlreadyExistsError } from '../errors/orgAlreadyExists'
import { Orgs } from '@prisma/client'

interface RegisterUseCaseParams {
  name: string
  email: string
  password: string
  cep: string
  phone: string
}

interface RegisterUseCaseResponse {
  org: Orgs
}

export class RegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    password,
    cep,
    phone,
  }: RegisterUseCaseParams): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const cepInfo = await cepToCityAndState(cep)
    if (!cepInfo) {
      throw new Error('Invalid CEP number.')
    }

    const { city, state } = cepInfo

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      name,
      email,
      password_hash,
      cep, // mesmo transformando o cep em cidade e estado, ainda acho interessante salvar essa informação.
      city,
      state,
      phone,
    })
    return { org }
  }
}
