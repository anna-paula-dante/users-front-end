# front-end users
# User Management Dashboard - Frontend
 
## Overview
Este é um projeto frontend desenvolvido com Next.js (React) que oferece uma interface moderna e responsiva para gerenciamento de usuários. A aplicação permite autenticação via login, cadastro de novos usuários, listagem, edição e exclusão de usuários com validações robustas utilizando `react-hook-form` e `zod`. A comunicação com backend é feita via REST API protegida por JWT.
 
## Tecnologias Utilizadas
- **Next.js (App Router)** - Framework React para SSR/SSG e rotas modernas.
- **React Query (@tanstack/react-query)** - Gerenciamento de estado e sincronização dos dados com o backend.
- **React Hook Form + Zod** - Validação e gerenciamento eficiente dos formulários.
- **Tailwind CSS** - Estilização moderna e responsiva baseada em utilitários.
- **Radix UI + Lucide Icons** - Componentes acessíveis e ícones para UI/UX aprimorados.
- **js-cookie** - Manipulação de cookies para armazenamento seguro do token JWT.
- **Sonner** - Biblioteca para notificações toast para feedback ao usuário.
 
## Funcionalidades
### Autenticação
 
- Tela de Login com validação de email e senha.
- Armazenamento seguro do token JWT no cookie com expiração de 7 dias.
- Redirecionamento para Dashboard após login bem-sucedido.
- Link para cadastro para novos usuários.
 
### Cadastro de Usuário
- Formulário completo com validação para nome, email, senha, telefone e indicação se é administrador.
- Criação de nova conta via API, com feedback visual (toast).
- Redirecionamento automático para Dashboard após registro.
 
### Dashboard de Usuários
- Listagem paginada de usuários obtida via chamada autenticada à API.
- Visualização dos detalhes principais: status (administrador), nome, email e telefone.
- Edição inline de usuário com modal, com validações consistentes.
- Exclusão de usuários com confirmação e atualização da lista.
- Logout removendo token JWT e redirecionando para tela de login.
 
### Componentização e Arquitetura
- Uso de componentes reutilizáveis para botões, inputs, formulários, tabelas, modais e notificações.
- Gestão centralizada de chamadas API e estado via React Query.
- Aplicação responsiva e acessível com foco em usabilidade.
 
## Como Rodar o Projeto
Clone o repositório:
 
```bash
git clone <url-do-repositorio>
cd <nome-do-projeto>
Instale as dependências:
 
bash
npm install
# ou
yarn install
Configure o backend para rodar localmente em http://localhost:3001 com os endpoints esperados (/login, /users etc).
 
Execute a aplicação:
 
bash
npm run dev
# ou
yarn dev
Como Acessar o Projeto:
Após iniciar a aplicação, acesse as seguintes rotas no navegador:
 
Login: http://localhost:3000/sign-in
Realize o login com um usuário cadastrado.
 
Cadastro: http://localhost:3000/sign-up
Crie uma nova conta de usuário.
 
Dashboard: http://localhost:3000/dashboard
Área principal para gerenciamento de usuários, acessível após login.
 
Logout:
Use o botão no cabeçalho do dashboard para encerrar a sessão.