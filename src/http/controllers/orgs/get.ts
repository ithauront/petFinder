import { makeGetOrgProfileUseCase } from '@/use-cases/factory/orgs/make-get-org-profile'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getOrg(request: FastifyRequest, reply: FastifyReply) {
  const getOrgProfile = makeGetOrgProfileUseCase()

  const { org } = await getOrgProfile.execute({
    orgId: request.user.sub,
  })

  return reply.status(200).send({ org: { ...org, password_hash: undefined } })
}
