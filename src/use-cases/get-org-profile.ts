import { OrgsRepository } from './repositories/orgs-repository'
import { ResourceNotFoundError } from './errors/resourceNotFound'
import { Orgs } from '@prisma/client'

interface GetOrgProfileUseCaseRequest {
  orgId: string
}
interface GetOrgProfileUseCaseResponse {
  org: Orgs
}

export class GetOrgProfileUseCase {
  constructor(private orgsRepository: OrgsRepository) {}
  async execute({
    orgId,
  }: GetOrgProfileUseCaseRequest): Promise<GetOrgProfileUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)
    if (!org) {
      throw new ResourceNotFoundError()
    }

    return { org }
  }
}
