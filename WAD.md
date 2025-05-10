# Web Application Document - Projeto Individual - Módulo 2 - Inteli

## Sistema de Reserva de Salas do Inteli

#### [Henrique rodrigues diniz](https://www.linkedin.com/in/henrique-rodrigues-diniz-b7b011319/)

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução (Semana 01)

## 1. Introdução

O **Sistema de Reserva de Salas do Inteli** é uma aplicação web desenvolvida para facilitar o processo de agendamento de salas de estudo, salas de reunião e espaços multiuso dentro da instituição. Seu objetivo principal é **otimizar a gestão dos espaços físicos**, evitando conflitos de horários e garantindo que os usuários tenham acesso rápido e confiável às informações de disponibilidade.

Por meio da plataforma, os usuários podem **visualizar as salas disponíveis**, **realizar reservas**, **cancelar agendamentos** e acompanhar suas reservas anteriores. O sistema foi projetado para atender tanto **estudantes**, que precisam reservar salas para trabalhos em grupo, quanto **professores e colaboradores**, que utilizam os espaços para reuniões, aulas e atividades acadêmicas. A aplicação busca oferecer uma **experiência intuitiva e eficiente**, com funcionalidades que simplificam o agendamento, reduzem o risco de conflitos e promovem uma melhor utilização dos recursos físicos da instituição.




---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas (Semana 01 - opcional)

*Posicione aqui sua(s) Persona(s) em forma de texto markdown com imagens, ou como imagem de template preenchido. Atualize esta seção ao longo do módulo se necessário.*

### 2.2. User Stories (Semana 01 - opcional)

*Posicione aqui a lista de User Stories levantadas para o projeto. Siga o template de User Stories e utilize a referência USXX para numeração (US01, US02, US03, ...). Indique todas as User Stories mapeadas, mesmo aquelas que não forem implementadas ao longo do projeto. Não se esqueça de explicar o INVEST de 1 User Storie prioritária.*

---

## <a name="c3"></a>3. Projeto da Aplicação Web


### 3.1. Modelagem do Banco de Dados

A modelagem do banco de dados foi estruturada para representar de forma clara as entidades e relacionamentos essenciais do **Sistema de Reserva de Salas do Inteli**. As principais tabelas do sistema são **users** (usuários), **rooms** (salas) e **bookings** (reservas). A tabela de **bookings** conecta usuários e salas, registrando quem fez a reserva, para qual sala e em qual período.

<p align="center">
  <b>Figura 1: Modelo Relacional do Banco de Dados</b><br>
  <img src="assets/Screenshot%202025-05-09%20211036.png" alt="Modelo Banco de Dados">
</p>

No diagrama apresentado, observa-se que a tabela **bookings** possui chaves estrangeiras apontando para **users** e **rooms**, garantindo que apenas salas e usuários válidos sejam registrados em uma reserva. Essa estrutura facilita o controle de agendamentos, evitando sobreposições e garantindo integridade referencial.

O código SQL para criação das tabelas está descrito a seguir:

```sql
-- Criação da tabela USERS
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    status VARCHAR(20) DEFAULT 'ativo'
);

-- Criação da tabela ROOMS
CREATE TABLE rooms (
    room_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(100),
    capacity INT NOT NULL,
    status VARCHAR(20) DEFAULT 'ativa'
);

-- Criação da tabela BOOKINGS
CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    room_id INT NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'confirmada',
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (room_id) REFERENCES rooms(room_id)
);


```
&emsp;No exemplo acima, é apresentada a forma como é possível estabelecer a relação entre tabelas por meio do comando 'REFERENCES', que usa uma chave estrangeira em uma tabela e apondar para uma chave primária em outra tabela, permitindo a interação entre tabelas e realizando a lógica para as funcionalidades do gerenciador de tarefas.

### 3.1.1 BD e Models (Semana 5)
*Descreva aqui os Models implementados no sistema web*

### 3.2. Arquitetura (Semana 5)

*Posicione aqui o diagrama de arquitetura da sua solução de aplicação web. Atualize sempre que necessário.*

**Instruções para criação do diagrama de arquitetura**  
- **Model**: A camada que lida com a lógica de negócios e interage com o banco de dados.
- **View**: A camada responsável pela interface de usuário.
- **Controller**: A camada que recebe as requisições, processa as ações e atualiza o modelo e a visualização.
  
*Adicione as setas e explicações sobre como os dados fluem entre o Model, Controller e View.*

### 3.3. Wireframes (Semana 03 - opcional)

*Posicione aqui as imagens do wireframe construído para sua solução e, opcionalmente, o link para acesso (mantenha o link sempre público para visualização).*

### 3.4. Guia de estilos (Semana 05 - opcional)

*Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução.*


### 3.5. Protótipo de alta fidelidade (Semana 05 - opcional)

*Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização).*

### 3.6. WebAPI e endpoints (Semana 05)

*Utilize um link para outra página de documentação contendo a descrição completa de cada endpoint. Ou descreva aqui cada endpoint criado para seu sistema.*  

### 3.7 Interface e Navegação (Semana 07)

*Descreva e ilustre aqui o desenvolvimento do frontend do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

*VIDEO: Insira o link do vídeo demonstrativo nesta seção*
*Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

*Indique pontos fortes e pontos a melhorar de maneira geral.*
*Relacione também quaisquer outras ideias que você tenha para melhorias futuras.*



## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que o leitor possa consultar caso ele se interessar em aprofundar._<br>

---
---
