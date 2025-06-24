# 📬 Guia da Collection Postman - API OMNI

Este guia explica como importar e usar a collection do Postman para testar a API OMNI completa.

## 📥 Como Importar a Collection

### **Método 1: Importar arquivo JSON**
1. Abra o Postman
2. Clique em **"Import"** no canto superior esquerdo
3. Arraste o arquivo `OMNI_API.postman_collection.json` ou clique em **"Upload Files"**
4. Clique em **"Import"** para confirmar

### **Método 2: Importar via link**
Se a collection estiver hospedada online, você pode importar via URL.

## 🚀 Preparação do Ambiente

### **1. Iniciar a API**
```bash
# No terminal, na pasta do projeto
npm start

# Aguarde até ver a mensagem de que o servidor está rodando na porta 3000
```

### **2. Verificar Variáveis**
A collection já vem configurada com as seguintes variáveis:
- `baseUrl`: `http://localhost:3000` (URL da API)
- `token`: `""` (será preenchido automaticamente após login)
- `userId1`: `""` (será preenchido automaticamente após cadastro)
- `userId2`: `""` (será preenchido automaticamente após cadastro)

## 📋 Ordem de Execução Recomendada

### **🔐 1. Autenticação (Execute nesta ordem)**

#### **1.1. Cadastrar Usuário 1 (João)**
- **Endpoint**: `POST /users/signup`
- **Objetivo**: Criar primeiro usuário
- **Resultado**: Salva automaticamente o `userId1`

#### **1.2. Cadastrar Usuário 2 (Maria)**
- **Endpoint**: `POST /users/signup`
- **Objetivo**: Criar segundo usuário
- **Resultado**: Salva automaticamente o `userId2`

#### **1.3. Login - João**
- **Endpoint**: `POST /users/signin`
- **Objetivo**: Obter token JWT
- **Resultado**: Salva automaticamente o `token` para próximas requisições

#### **1.4. Login Inválido (Teste de Erro)**
- **Endpoint**: `POST /users/signin`
- **Objetivo**: Testar validação de credenciais
- **Resultado**: Deve retornar erro 401

---

### **👥 2. Usuários**

#### **2.1. Listar Usuários**
- **Endpoint**: `GET /users`
- **Pré-requisito**: Token JWT válido
- **Objetivo**: Ver os usuários criados e seus saldos iniciais
- **Validação**: Confirma saldo inicial de R$ 100 para ambos

#### **2.2. Listar Usuários sem Token (Teste de Erro)**
- **Endpoint**: `GET /users`
- **Objetivo**: Testar proteção JWT
- **Resultado**: Deve retornar erro 401

---

### **💸 3. Transações**

#### **3.1. Transferir R$ 30 (João → Maria)**
- **Endpoint**: `POST /transfer`
- **Pré-requisito**: Token JWT válido
- **Objetivo**: Primeira transferência bem-sucedida
- **Resultado**: João: R$ 70, Maria: R$ 130

#### **3.2. Verificar Saldos Após Transferência**
- **Endpoint**: `GET /users`
- **Objetivo**: Confirmar que a transferência foi processada
- **Validação**: Saldos atualizados corretamente

#### **3.3. Transferência com Saldo Insuficiente (Teste de Erro)**
- **Endpoint**: `POST /transfer`
- **Objetivo**: Testar validação de saldo
- **Resultado**: Deve retornar erro 400

#### **3.4. Auto-transferência (Teste de Erro)**
- **Endpoint**: `POST /transfer`
- **Objetivo**: Testar regra de negócio
- **Resultado**: Deve retornar erro 400

#### **3.5. Transferência sem Autenticação (Teste de Erro)**
- **Endpoint**: `POST /transfer`
- **Objetivo**: Testar proteção JWT
- **Resultado**: Deve retornar erro 401

## 🧪 Testes Automáticos

A collection inclui **testes automáticos** que validam:

### **✅ Testes de Status**
- Códigos de resposta corretos (200, 201, 204, 400, 401)
- Tempo de resposta < 2000ms (< 3000ms para transferências)

### **✅ Testes de Estrutura**
- Presença de campos obrigatórios nas respostas
- Formato do token JWT (3 partes separadas por '.')
- Tipo de dados das respostas (arrays, objetos)

### **✅ Testes de Negócio**
- Saldo inicial de R$ 100 para novos usuários
- Atualização correta de saldos após transferências
- Preservação do total de dinheiro no sistema
- Campos senha não expostos nas respostas

### **✅ Testes de Segurança**
- Proteção de rotas com JWT
- Validação de credenciais
- Mensagens de erro apropriadas

## 📊 Executando Collection Runner

### **Para executar todos os testes automaticamente:**

1. **Clique no nome da collection** "OMNI API - Sistema de Transações"
2. **Clique em "Run"**
3. **Configure:**
   - Selecione todas as requisições
   - Defina delay entre requests: 500ms
   - Iterations: 1
4. **Clique em "Run OMNI API"**

### **Resultado esperado:**
- ✅ **11 requests executados**
- ✅ **35+ testes passando**
- ✅ **0 testes falhando**

## 🔧 Troubleshooting

### **❌ Erro de Conexão**
```
Error: connect ECONNREFUSED 127.0.0.1:3000
```
**Solução**: Verifique se a API está rodando (`npm start`)

### **❌ Erro 401 Unauthorized**
```
{"statusCode":401,"message":"Unauthorized"}
```
**Solução**: Execute primeiro o login (request "3. Login - João")

### **❌ Usuário já existe**
```
{"statusCode":409,"message":"Usuário já existe"}
```
**Solução**: Use usernames diferentes ou delete o arquivo `db.sqlite`

### **❌ Token expirado**
```
{"statusCode":401,"message":"Token expirado"}
```
**Solução**: Execute novamente o login para obter novo token

## 📝 Variáveis Personalizadas

### **Para usar um ambiente diferente:**

1. **Crie um Environment no Postman**
2. **Adicione as variáveis:**
   ```
   baseUrl: http://sua-api.com
   token: (deixe vazio)
   userId1: (deixe vazio)
   userId2: (deixe vazio)
   ```
3. **Selecione o environment antes de executar**

## 🎯 Cenários de Teste Avançados

### **Cenário 1: Transferência em Cadeia**
1. Execute requests 1-3 (cadastros + login)
2. Execute request 7 (transferir R$ 30)
3. Faça login como Maria
4. Crie transferência de Maria para João

### **Cenário 2: Teste de Volume**
1. Configure Collection Runner
2. Set Iterations: 10
3. Execute para testar performance

### **Cenário 3: Teste de Segurança**
1. Execute requests de erro (4, 6, 9, 10, 11)
2. Verifique se todos retornam códigos de erro apropriados

---

## 🏆 Collection Completa

Esta collection oferece:
- ✅ **11 endpoints testados**
- ✅ **35+ validações automáticas**
- ✅ **Fluxo completo da aplicação**
- ✅ **Testes de casos de sucesso e erro**
- ✅ **Gerenciamento automático de tokens**
- ✅ **Validações de regras de negócio**

**Perfeita para demonstrações, desenvolvimento e QA!** 🚀 