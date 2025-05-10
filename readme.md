# Inteli - Instituto de Tecnologia e Liderança 

<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="/assets/assetsWAD/inteli.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0"></a>
</p>

# Sistema de Reserva de Salas do Inteli


## 
- <a href="https://github.com/antonioatra">Henrique rodrigues diniz</a>

## :teacher: Professores:
### Orientador(a) 
- <a href="https://www.linkedin.com/in/marcelo-gon%C3%A7alves-phd-a550652/">Marcelo Gonçalves</a>
### Instrutores
- <a href="https://www.linkedin.com/in/cristiano-benites-ph-d-687647a8/">Cristiano Benites</a>
- <a href="https://www.linkedin.com/in/pedroteberga/">Pedro Teberga</a> 
- <a href="https://www.linkedin.com/in/francisco-escobar/">Francisco Escobar</a> 


## 📝 Descrição

&emsp; O Sistema de Reserva de Salas do Inteli é uma plataforma de agendamento que permite aos usuários reservar salas, visualizar disponibilidades e gerenciar seus agendamentos de forma prática e centralizada. Com foco na otimização do uso dos espaços da instituição, o sistema oferece funcionalidades como filtros por capacidade e recursos da sala, notificações automáticas e controle de permissões por tipo de usuário. A estrutura do banco de dados reflete essa lógica, conectando usuários, salas e reservas por meio de relacionamentos claros, garantindo um acompanhamento preciso de cada agendamento realizado.


## 📝 Link de demonstração

_Coloque aqui o link para seu projeto publicado e link para vídeo de demonstração_

## 📁 Estrutura de pastas

Dentre os arquivos e pastas presentes na raiz do projeto, definem-se:

```
Sistema de Reserva de Salas do Inteli/
│
├── config/                # Arquivos de configuração (ex: conexão com banco)
│   └── database.js
├── controllers/           # Lógica de controle das requisições
│   └── HomeController.js
├── models/                # Definição de modelos de dados (estrutura do banco)
│   └── User.js
├── routes/                # Definição das rotas do sistema
│   └── index.js
├── services/              # Serviços auxiliares do sistema
│   └── userService.js
├── assets/                # Arquivos públicos como imagens e fontes
├── scripts/               # Arquivos de JavaScript públicos
├── styles/                # Arquivos CSS públicos
├── tests/                 # Arquivos de testes unitários
│   └── example.test.js
├── .gitignore             # Arquivo para ignorar arquivos no Git
├── .env.example           # Arquivo de exemplo para variáveis de ambiente
├── jest.config.js         # Arquivo de configuração do Jest
├── package-lock.json      # Gerenciador de dependências do Node.js
├── package.json           # Gerenciador de dependências do Node.js
├── readme.md              # Documentação do projeto (Markdown)
├── server.js              # Arquivo principal que inicializa o servidor
├── rest.http              # Teste de endpoints (opcional)
└── wad.md                 # Documentação

```

## 💻 Configuração para desenvolvimento e execução do código


Aqui encontram-se todas as instruções necessárias para a instalação de todos os programas, bibliotecas e ferramentas imprescindíveis para a configuração do ambiente de desenvolvimento.

1. Baixar e instalar o node.js: [https://nodejs.org/pt-br/](https://nodejs.org/pt-br/) (versão 16.15.1 LTS)
2. Clone o repositório em questão.
3. No modo administrador, abra o "prompt de comando" ou o "terminal" e, após, abra a pasta "src/backend" no diretório raiz do repositório clonado e digite o segundo comando:

```sh
npm install
```

Isso instalará todas as dependências definidas no arquivo <b>package.json</b> que são necessárias para rodar o projeto. Agora o projeto já está pronto para ser modificado. Caso ainda deseje iniciar a aplicação, digite o comando abaixo no terminal:

```sh
npm start
```
5. Agora você pode acessar a aplicação através do link http://localhost:1234/
6. O servidor está online.

## 🗃 Histórico de lançamentos

* 0.5.0 - XX/XX/2024
    * 
* 0.4.0 - XX/XX/2024
    * 
* 0.3.0 - XX/XX/2024
    * 
* 0.2.0 - XX/XX/2024
    * 
* 0.1.0 - 30/04/2025 - Levantamento inicial do projeto, com entendimento do negócio, definição dos objetivos e escopo da primeira versão da Aplicação Web.
    *

## 📋 Licença/License

