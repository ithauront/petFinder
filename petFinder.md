### Regras da aplicação

[v] Deve ser possível cadastrar um pet
[v] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
[v] Deve ser possível filtrar pets por suas características
[] Deve ser possível visualizar detalhes de um pet para adoção
[v] Deve ser possível se cadastrar como uma ORG
[v] Deve ser possível realizar login como uma ORG

### Regras de negócio

[v] Para listar os pets, obrigatoriamente precisamos informar a cidade
[v] Uma ORG precisa ter um endereço e um número de WhatsApp
[v] Um pet deve estar ligado a uma ORG
[] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
[v] Todos os filtros, além da cidade, são opcionais
[] Para uma ORG acessar a aplicação como admin, ela precisa estar logada
[v] não deve ser possivel cadastrar com email duplicado

### Requisitos não funcionais
[v] a senha do usuario deve estar criptografada
[] os dados da aplicação precisam estar persistidos em um banco postgrees sql
[v] todas as listas de dados precisam estar paginadas com 20 items por pagina
[] o usuario deve ser identificado por um jwt (json web token)

# rotas
post - org - { orgID, nome, email, ,cep,, telefone (whatsapp), , senha, O ROLE VAI VIR DA MESMA FORMA QUE FIZEMOS NA OUTRA? SEM PRECISAR COLOCAR NA TABELA(ADMIN, member) } como separar cidade e estado a partir do cep ? fazer uma função em utils para isso pegando pelo axios o site dos correios e fazendo a pesquisa FEITO

post - autenticate - { name, senha, email} 

patch - refreshToken return refrshToken

post - pet - AUTENTICADO {petId, nome, description, idade,port(peq, med, grande),  nivel de energia(baixa media alta), nivel de independencia(baixa media alta), ambiente( pequeno, medio, amplo), foto, requisitos para adoção,orgID(foreingKey) ,  } FEITO

get - pet - {enviar cidade , e filtros opcionais com as outras caracteristicas} - o retorno deve trazer todo o objeto pet com todas suas caracteristicas 

OPCIONAL -
Listar orgs e mostrar todos os pets de cada org.
deletar pet apos ser adotado ou campo de adotado (sim ou não e se for adotado não mostra mais nas pesquisas) se adcionar depois colocar como default não adotado
post - member { nome, email, senha, cidade e estados, telefone(whatsapp)}

contexto da aplicação (visual do frontend):
https://www.figma.com/community/file/1220006040435238030/find-a-friend-app

