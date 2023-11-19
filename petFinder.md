### Regras da aplicação

[v] Deve ser possível cadastrar um pet
[v] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
[v] Deve ser possível filtrar pets por suas características
[v] Deve ser possível visualizar detalhes de um pet para adoção
[v] Deve ser possível se cadastrar como uma ORG
[v] Deve ser possível realizar login como uma ORG

### Regras de negócio

[v] Para listar os pets, obrigatoriamente precisamos informar a cidade
[v] Uma ORG precisa ter um endereço e um número de WhatsApp
[v] Um pet deve estar ligado a uma ORG
[v] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
[v] Todos os filtros, além da cidade, são opcionais
[V] Para uma ORG acessar a aplicação como admin, ela precisa estar logada
[v] não deve ser possivel cadastrar com email duplicado

### Requisitos não funcionais
[v] a senha do usuario deve estar criptografada
[v] todas as listas de dados precisam estar paginadas com 20 items por pagina
[V] o usuario deve ser identificado por um jwt (json web token)

# rotas
post - org - { orgID, nome, email, ,cep,, telefone (whatsapp), senha,(ADMIN, member) } como separar cidade e estado a partir do cep ? fazer uma função em utils para isso pegando pelo axios o site dos correios e fazendo a pesquisa FEITO 
#### obs: eu criei as logicas todas usando a terminologia org e não como user, porque no inicio pensei que so faria orgs como usuarios, depois com a implementação de role eu percebi que as informações de uma org cabem bem tambem para um usuario "pessoa fisica" então agora ao criar um user ele pode ser admin e assim vai ser a representaçao de uma org que pode cadastrar um pet ou um member que não vai poder cadastrar pet. porem sem estar logado, ou seja mesmo sem ser member um visitante vai poder ver os pets listados e tambem entrar em contato com a org por telefone porque essas rotas não são verificadas por autenticação.

post - autenticate - { name, senha, email} 

patch - refreshToken return refrshToken

post - pet - AUTENTICADO {petId, nome, description, idade,port(peq, med, grande),  nivel de energia(baixa media alta), nivel de independencia(baixa media alta), ambiente( pequeno, medio, amplo), foto, requisitos para adoção,orgID(foreingKey) ,  } FEITO

get - pet - {enviar cidade , e filtros opcionais com as outras caracteristicas} - o retorno deve trazer todo o objeto pet com todas suas caracteristicas 

OPCIONAL -
 campo de adotado se for adotado não mostra mais nas pesquisas v


contexto da aplicação (visual do frontend):
https://www.figma.com/community/file/1220006040435238030/find-a-friend-app

