import axios from 'axios'

interface CepInfo {
  state: string
  city: string
}

export async function cepToCityAndState(cep: string): Promise<CepInfo | null> {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    const data = response.data

    if (data.uf && data.localidade) {
      return {
        state: data.uf,
        city: data.localidade,
      }
    }

    return null // CEP inválido ou não encontrado
  } catch (error) {
    console.error('Erro ao obter informações do CEP:', error)
    return null // Tratamento de erros
  }
}
