import { Orgs } from '@prisma/client'
import { OrgsRepository } from '../repositories/orgs-repository'
import { InvalidCredentialsError } from '../errors/invalidCredentials'
import { compare } from 'bcryptjs'

interface AutenticateUseCaseRequest {
  email: string
  password: string
}
interface AutenticateUseCaseResponse {
  org: Orgs
}

export class AutenticateUseCase {
  constructor(private orgsRepository: OrgsRepository) {}
  async execute({
    email,
    password,
  }: AutenticateUseCaseRequest): Promise<AutenticateUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)
    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, org.password_hash)
    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }
    return { org }
  }
}
