# Web Application Document - Projeto Individual - Módulo 2 - Inteli

## TASKO

#### [Antônio Augusto Tavares Ribeiro André](https://www.linkedin.com/in/antonio-augusto-tavares-ribeiro-andr%C3%A9-613937345?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app)

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução (Semana 01)

&emsp;TASKO é um gerenciador de tarefas projetado para proporcionar uma maneira eficiente e ágil de controlar atividades, ajudando os usuários a aumentar sua produtividade. A plataforma foi desenvolvida para otimizar a organização e execução de tarefas, permitindo que os usuários se concentrem no essencial, sem sobrecargas ou atrasos.

&emsp;Sua principal funcionalidade é a organização e detalhamento intuitivo das tarefas. Com o TASKO, o usuário pode criar listas de tarefas e destrinchá-las em subtarefas, facilitando o acompanhamento de atividades mais complexas. Além disso, a plataforma conta com uma ferramenta de priorização inteligente que organiza as tarefas de acordo com sua urgência, garantindo que o usuário sempre saiba o que deve ser feito primeiro.

---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas (Semana 01 - opcional)

*Posicione aqui sua(s) Persona(s) em forma de texto markdown com imagens, ou como imagem de template preenchido. Atualize esta seção ao longo do módulo se necessário.*

### 2.2. User Stories (Semana 01 - opcional)

*Posicione aqui a lista de User Stories levantadas para o projeto. Siga o template de User Stories e utilize a referência USXX para numeração (US01, US02, US03, ...). Indique todas as User Stories mapeadas, mesmo aquelas que não forem implementadas ao longo do projeto. Não se esqueça de explicar o INVEST de 1 User Storie prioritária.*

---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados  (Semana 3)

&emsp;A modelagem de banco de dados é uma etapa essencial para organização e eficiência de um sistema de armazenamento. <br>
&emsp;Apenas com uma boa prática na criação do banco de dados é que se pode ter um bom uso e execução de um sistema.

<div style ="text-align: center">

Figura 1: MER Banco de Dados
![alt text](assets/ModeloDB.png)

</div>

&emsp;No modelo relacional acima, é possível observar que a tabela tasks está associada a um usuário, que pode escolher uma categoria para criar sua atividade. Cada atividade possui informações sobre quem a criou, assim como o ID da tarefa associada, sendo esta uma sub-seção das atividades. Dentro das tarefas, há a opção de adicionar tags, bem como de definir um nível de prioridade, utilizando características previamente definidas.

&emsp;A partir do modelo relacional é traduzí-lo para código SQL, linguagem usada para poder realizar a aplicação.

``` sql
    CREATE TABLE users (
    id INT PRIMARY KEY,
    name TEXT NOT NULL,
    cpf TEXT NOT NULL,
    birthdate DATE NOT NULL
);
```
&emsp;No exemplo acima é possível perceber o comando básico para criação de uma tabela no banco de dados com a sua entidade e seus respectivos atributos.

``` sql
CREATE TABLE categories (
    id INT PRIMARY KEY,
    title TEXT NOT NULL
);

CREATE TABLE tasks (
    id INT PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT,
    created_at TIMESTAMP
);

CREATE TABLE activities (
    id INT PRIMARY KEY,
    task_id INT REFERENCES tasks(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id),
    category_id INT REFERENCES categories(id),
    duration_hours INT,
    day_activ DATE,
    description TEXT
);

CREATE TABLE comments (
    id INT PRIMARY KEY,
    task_id INT REFERENCES tasks(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id),
    content TEXT,
    created_at TIMESTAMP
);

CREATE TABLE priorities (
    id INT PRIMARY KEY,
    label TEXT,
    color TEXT
);

CREATE TABLE task_priority (
    task_id INT REFERENCES tasks(id) ON DELETE CASCADE,
    priority_id INT REFERENCES priorities(id),
    PRIMARY KEY (task_id) 
);

CREATE TABLE reminders (
    id INT PRIMARY KEY,
    task_id INT REFERENCES tasks(id) ON DELETE CASCADE,
    remind_at TIMESTAMP,
    sent BOOLEAN
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
