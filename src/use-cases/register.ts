import { prisma } from '@/lib/prisma'
import { cepToCityAndState } from '@/utils/cepToCityAndState'
import { hash } from 'bcryptjs'

interface RegisterUseCaseParams {
  name: string
  email: string
  password: string
  cep: string
  phone: string
}

export async function registerUseCase({
  name,
  email,
  password,
  cep,
  phone,
}: RegisterUseCaseParams) {
  const password_hash = await hash(password, 6)

  const cepInfo = await cepToCityAndState(cep)
  if (!cepInfo) {
    throw new Error('Invalid CEP number.')
  }

  const { city, state } = cepInfo

  const orgWithSameEmail = await prisma.orgs.findUnique({
    where: { email },
  })
  if (orgWithSameEmail) {
    throw new Error('Email already exists.')
  }

  await prisma.orgs.create({
    data: {
      name,
      email,
      password_hash,
      cep, // mesmo transformando o cep em cidade e estado, ainda acho interessante salvar essa informação.
      city,
      state,
      phone,
    },
  })
}
