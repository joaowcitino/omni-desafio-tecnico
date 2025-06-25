# OMNI API - Desafio Técnico Backend

> Implementação completa do [desafio técnico da OMNI Saúde](https://github.com/omnipharma/omni_technical_challenge) para vaga de desenvolvedor backend. API robusta e escalável para gerenciamento de transações financeiras, desenvolvida com NestJS e TypeScript.

[![CI/CD Pipeline](https://github.com/joaowcitino/omni-desafio-tecnico/workflows/CI/CD%20Pipeline/badge.svg)](https://github.com/joaowcitino/omni-desafio-tecnico/actions)

## 🚀 Sobre o Projeto

Este projeto é uma **implementação completa** do [desafio técnico da OMNI Saúde](https://github.com/omnipharma/omni_technical_challenge) para vaga de desenvolvedor backend. A **OMNI API** é um sistema para simulação de transações monetárias entre usuários, incluindo cadastro de usuários, autenticação segura e transferências de dinheiro entre contas. 

Desenvolvida com foco na **segurança**, **performance** e **escalabilidade**, esta implementação vai além dos requisitos básicos do desafio, demonstrando as melhores práticas de desenvolvimento e deploy automatizado em nuvem.

### 🎯 Objetivos do Desafio

✅ **Implementar todas as rotas solicitadas** conforme especificação  
✅ **Demonstrar conhecimentos avançados** em NestJS e TypeScript  
✅ **Aplicar boas práticas** de desenvolvimento e arquitetura  
✅ **Incluir funcionalidades extras** para destacar competências técnicas  

### 💡 Diferenciais Implementados

- **Segurança**: Autenticação JWT robusta com hash de senhas
- **Confiabilidade**: Cobertura de testes acima de 70%
- **Escalabilidade**: Arquitetura modular e containerizada
- **Automação**: Deploy contínuo com pipeline CI/CD
- **Qualidade**: Lint, formatação e validações automáticas

## 🏗️ Arquitetura

A aplicação segue os princípios da **Clean Architecture** e **Domain-Driven Design**, utilizando o framework NestJS que implementa naturalmente os padrões SOLID.

```mermaid
graph TB
    subgraph "🌐 Presentation Layer"
        A[Controllers] --> B[DTOs/Validation]
    end
    
    subgraph "🎯 Business Layer"
        C[Services] --> D[Auth Guard]
        C --> E[JWT Strategy]
    end
    
    subgraph "💾 Data Layer"
        F[TypeORM] --> G[SQLite Database]
        H[Entities] --> F
    end
    
    subgraph "🔒 Security"
        I[bcrypt] --> J[Password Hashing]
        K[JWT] --> L[Token Authentication]
    end
    
    A --> C
    C --> H
    D --> K
    
    style A fill:#e1f5fe
    style C fill:#f3e5f5
    style F fill:#e8f5e8
    style I fill:#fff3e0
```

### 📐 Padrões Utilizados

- **Repository Pattern**: Abstração da camada de dados
- **Dependency Injection**: Gerenciamento automático de dependências
- **Guard Pattern**: Proteção de rotas com middleware de autenticação
- **DTO Pattern**: Validação e transformação de dados de entrada
- **Module Pattern**: Organização modular do código

## 🛠️ Tecnologias Utilizadas

### Backend Core
- **[NestJS](https://nestjs.com/)** `^11.0.1` - Framework Node.js progressivo
- **[TypeScript](https://www.typescriptlang.org/)** `^5.7.3` - Superset tipado do JavaScript
- **[TypeORM](https://typeorm.io/)** `^0.3.25` - ORM para TypeScript e JavaScript
- **[SQLite](https://www.sqlite.org/)** `^5.1.7` - Banco de dados relacional embarcado

### Segurança & Autenticação
- **[Passport JWT](https://github.com/mikenicholson/passport-jwt)** `^4.0.1` - Estratégia JWT para autenticação
- **[bcrypt](https://github.com/kelektiv/node.bcrypt.js)** `^6.0.0` - Hash seguro de senhas
- **[class-validator](https://github.com/typestack/class-validator)** `^0.14.2` - Validação baseada em decorators

### DevOps & Deploy
- **[Docker](https://www.docker.com/)** - Containerização da aplicação
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD automatizado
- **[AWS ECR](https://aws.amazon.com/ecr/)** - Registry de containers
- **[AWS EC2](https://aws.amazon.com/ec2/)** - Infraestrutura de hospedagem

### Qualidade & Testes
- **[Jest](https://jestjs.io/)** `^29.7.0` - Framework de testes
- **[ESLint](https://eslint.org/)** `^9.18.0` - Análise estática de código
- **[Prettier](https://prettier.io/)** `^3.4.2` - Formatação automática de código

## ✨ Funcionalidades

### 👤 Gestão de Usuários
- ✅ **Cadastro de usuários** com validação de dados
- ✅ **Autenticação JWT** segura
- ✅ **Hash de senhas** com bcrypt
- ✅ **Listagem de usuários** com proteção de dados sensíveis

### 💰 Sistema de Transações
- ✅ **Transferências entre usuários** em tempo real
- ✅ **Validação de saldo** antes da transferência
- ✅ **Histórico completo** de transações
- ✅ **Atomicidade** das operações financeiras

### 🔐 Segurança
- ✅ **Autenticação JWT** com expiração
- ✅ **Proteção de rotas** sensíveis
- ✅ **Validação rigorosa** de entrada de dados
- ✅ **Sanitização** de dados do usuário

## 📝 Sobre o Desafio Técnico

### 🎯 Requisitos Originais

Conforme especificado no [repositório oficial do desafio](https://github.com/omnipharma/omni_technical_challenge), era necessário desenvolver:

#### **Rotas Obrigatórias:**
- ✅ `POST /users/signup` - Cadastro de usuário
- ✅ `POST /users/signin` - Login de usuário  
- ✅ `POST /transfer` - Transferência entre usuários
- ✅ `GET /users` - Listagem de usuários

#### **Tecnologias Sugeridas:**
- ✅ **NestJS** - Framework principal
- ✅ **TypeORM** (opcional) - Implementado
- ✅ **Docker** (opcional) - Implementado
- ✅ **Testes** (opcional) - Implementado com cobertura > 70%
- ✅ **Deploy** (opcional) - Pipeline CI/CD completo

### 🚀 Extras Implementados

Esta implementação vai **muito além** dos requisitos básicos:

- 🔐 **Segurança avançada** com bcrypt e JWT
- 🧪 **Testes automatizados** (unitários e integração)
- 📊 **Cobertura de código** com validação automática
- 🐳 **Containerização** com Docker multi-stage
- ☁️ **Deploy automático** na AWS (ECR + EC2)
- 📋 **Collection do Postman** para testes
- 🔄 **Pipeline CI/CD** completo
- 📐 **Arquitetura Clean** com padrões SOLID
- 📚 **Documentação profissional** detalhada

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18.x ou 20.x)
- **npm** (versão 8.x ou superior)
- **Docker** (para containerização)
- **Git** (para versionamento)

### Verificação do Ambiente

```bash
node --version   # >= 18.0.0
npm --version    # >= 8.0.0
docker --version # >= 20.0.0
```

## 🚀 Instalação

### 1. Clone o Repositório

```bash
git clone https://github.com/joaowcitino/omni-desafio-tecnico.git
cd omni-desafio-tecnico
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configure as Variáveis de Ambiente

```bash
# Copie o arquivo de exemplo (se existir)
cp .env.example .env

# Configure as variáveis necessárias
export JWT_SECRET="seu-jwt-secret-super-seguro-aqui"
export NODE_ENV="development"
export PORT="3005"
```

### 4. Execute a Aplicação

#### Desenvolvimento
```bash
npm run start:dev
```

#### Produção
```bash
npm run build
npm run start:prod
```

### 5. Usando Docker

```bash
# Build da imagem
docker build -t omni-api .

# Execute o container
docker run -p 3005:3005 \
  -e JWT_SECRET="seu-jwt-secret" \
  -e NODE_ENV="production" \
  omni-api
```

## 📖 Uso

### Collection do Postman

Importe a collection `OMNI_API.postman_collection.json` no Postman para ter acesso a todos os endpoints pré-configurados com testes automatizados.

### Exemplo de Uso Básico

```bash
# 1. Cadastrar usuário
curl -X POST http://localhost:3005/users/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "joao",
    "password": "123456",
    "birthdate": "1990-01-01"
  }'

# 2. Fazer login
curl -X POST http://localhost:3005/users/signin \
  -H "Content-Type: application/json" \
  -d '{
    "username": "joao",
    "password": "123456"
  }'

# 3. Usar o token recebido para acessar rotas protegidas
curl -X GET http://localhost:3005/users \
  -H "Authorization: Bearer SEU_JWT_TOKEN_AQUI"
```

## 🔌 API Endpoints

### 🔐 Autenticação

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `POST` | `/users/signup` | Cadastra novo usuário | ❌ |
| `POST` | `/users/signin` | Autentica usuário | ❌ |

### 👥 Usuários

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `GET` | `/users` | Lista todos os usuários | ✅ |

### 💸 Transações

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `POST` | `/transfer` | Realiza transferência | ✅ |

#### Exemplo de Resposta

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "username": "joao",
  "balance": 100.00,
  "birthdate": "1990-01-01"
}
```

## 🚀 Deploy Automático

A aplicação possui um pipeline de **CI/CD completamente automatizado** utilizando GitHub Actions. O processo é acionado automaticamente a cada push na branch `main`.

### 🔄 Pipeline de Deploy

```mermaid
graph LR
    A[📝 Push Code] --> B[🧪 Tests]
    B --> C[🔨 Build]
    C --> D[🐳 Docker Build]
    D --> E[📦 Push to ECR]
    E --> F[🚀 Deploy EC2]
    
    style A fill:#e3f2fd
    style B fill:#e8f5e8
    style C fill:#fff3e0
    style D fill:#f3e5f5
    style E fill:#fce4ec
    style F fill:#e0f2f1
```

### 📋 Etapas do Pipeline

#### 1. **Testes Automatizados** 🧪
- Execução em **múltiplas versões** do Node.js (18.x, 20.x)
- **Linting** automático com ESLint
- **Testes unitários** completos
- **Cobertura de código** com upload para Codecov
- **Quality Gate** com cobertura mínima de 70%

#### 2. **Build da Aplicação** 🔨
- Compilação do TypeScript
- Verificação de integridade da build
- Teste de inicialização da aplicação

#### 3. **Containerização** 🐳
- Build da imagem Docker otimizada
- **Multi-stage build** para reduzir tamanho
- Push automático para **AWS ECR**

#### 4. **Deploy Automatizado** 🚀
- Deploy automático em **AWS EC2**
- **Blue-green deployment** com zero downtime
- Configuração automática de rede Docker
- Limpeza de imagens antigas

### 🔧 Configuração do Pipeline

O pipeline requer as seguintes **secrets** no GitHub:

```env
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_ECR_REGISTRY=123456789.dkr.ecr.sa-east-1.amazonaws.com
ECR_REPOSITORY=omni-api
EC2_HOST=ec2-xxx-xxx-xxx-xxx.sa-east-1.compute.amazonaws.com
EC2_USER=ubuntu
EC2_SSH_KEY=-----BEGIN RSA PRIVATE KEY-----...
JWT_SECRET=super-secret-jwt-key
```

### 🌟 Vantagens do Deploy Automático

- ✅ **Zero Downtime**: Deploy sem interrupção do serviço
- ✅ **Rollback Rápido**: Reversão automática em caso de falha
- ✅ **Segurança**: Credenciais gerenciadas via secrets
- ✅ **Rastreabilidade**: Histórico completo de deploys
- ✅ **Qualidade**: Deploy apenas após validação completa

## 🧪 Testes

### Executar Testes

```bash
# Todos os testes
npm test

# Testes com watch mode
npm run test:watch

# Testes com cobertura
npm run test:cov

# Testes end-to-end
npm run test:e2e
```

### 📊 Cobertura de Testes

O projeto mantém uma **cobertura mínima de 70%** validada automaticamente no pipeline.

```bash
# Visualizar relatório de cobertura
npm run test:cov
open coverage/lcov-report/index.html
```

### 🎯 Estratégia de Testes

- **Unitários**: Testam funções e métodos isoladamente
- **Integração**: Validam a comunicação entre módulos
- **E2E**: Simulam fluxos completos do usuário
- **Mocks**: Isolamento de dependências externas

## 📁 Estrutura do Projeto

```
src/
├── 📁 auth/                 # Módulo de autenticação
│   ├── auth.service.ts      # Lógica de autenticação
│   ├── jwt.strategy.ts      # Estratégia JWT do Passport
│   └── jwt-auth.guard.ts    # Guard de proteção de rotas
├── 📁 users/                # Módulo de usuários
│   ├── dto/                 # Data Transfer Objects
│   ├── entities/            # Entidades do banco de dados
│   ├── users.controller.ts  # Controlador de usuários
│   └── users.service.ts     # Lógica de negócio de usuários
├── 📁 transactions/         # Módulo de transações
│   ├── dto/                 # DTOs de transações
│   ├── entities/            # Entidade de transação
│   ├── transactions.controller.ts
│   └── transactions.service.ts
├── app.module.ts           # Módulo principal da aplicação
└── main.ts                 # Ponto de entrada da aplicação

🗂️ Arquivos de Configuração:
├── 🐳 Dockerfile              # Configuração do container
├── 📋 package.json           # Dependências e scripts
├── 🔧 tsconfig.json          # Configuração TypeScript
├── 🎨 .prettierrc            # Formatação de código
├── 📏 eslint.config.mjs      # Linting de código
└── 🧪 jest.config.js         # Configuração de testes
```

### 🎯 Responsabilidades dos Módulos

- **Auth**: Gerencia autenticação e autorização
- **Users**: CRUD de usuários e gestão de contas
- **Transactions**: Lógica de transferências financeiras
- **App**: Configuração global e inicialização

## 🔧 Variáveis de Ambiente

### Produção

```env
NODE_ENV=production
PORT=3005
JWT_SECRET=super-secret-jwt-key-256-bits
DATABASE_URL=file:./db.sqlite
TZ=America/Sao_Paulo
```

### Desenvolvimento

```env
NODE_ENV=development
PORT=3005
JWT_SECRET=development-jwt-secret
DATABASE_URL=file:./db.sqlite
LOG_LEVEL=debug
```

### 🔒 Segurança das Variáveis

- **Produção**: Gerenciadas via AWS Secrets Manager
- **CI/CD**: Armazenadas como GitHub Secrets
- **Desenvolvimento**: Arquivo `.env` local (não versionado)

### 🎯 Padrões de Código

- ✅ **ESLint**: Código deve passar no linting
- ✅ **Prettier**: Formatação automática obrigatória
- ✅ **Testes**: Cobertura mínima de 70%
- ✅ **TypeScript**: Tipagem forte obrigatória
- ✅ **Commits**: Mensagens descritivas e claras

### 🔍 Code Review

Todos os PRs passam por:
- ✅ **Revisão de código** por desenvolvedor sênior
- ✅ **Validação automática** do pipeline
- ✅ **Testes de integração** em ambiente isolado