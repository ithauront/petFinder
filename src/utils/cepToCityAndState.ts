import { InvalidCepError } from '@/use-cases/errors/invalidCEP'
import axios from 'axios'

export async function cepToCityAndState(cep: string) {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    if (response.data.erro) {
      throw new InvalidCepError()
    }
    return {
      city: response.data.localidade,
      state: response.data.uf,
    }
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      throw new InvalidCepError()
    }
    console.error(error)
    throw new Error('Erro ao acessar o serviço de CEP')
  }
}
