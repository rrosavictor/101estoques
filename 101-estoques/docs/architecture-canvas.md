# Software Architecture Canvas - 101Estoques

## 1. Problema e Contexto

### Problema
- Necessidade de um sistema para gerenciamento de estoques e aluguéis
- Controle de eventos e notificações assíncronas
- Integração entre diferentes serviços (estoques, aluguéis, eventos)

### Contexto
- Sistema distribuído usando arquitetura de microserviços
- Necessidade de escalabilidade e manutenibilidade
- Suporte a múltiplos bancos de dados (MongoDB, SQL)

## 2. Decisões Arquiteturais

### Padrões Arquiteturais
- Arquitetura de Microserviços
- Event-Driven Architecture (para processamento assíncrono)
- Backend-for-Frontend (BFF) para agregação de dados
- REST APIs para comunicação entre serviços

### Tecnologias Escolhidas
- Node.js 18+ como plataforma base
- Express.js para APIs REST
- MongoDB Atlas para microservice-estoques
- Azure SQL/SQLite para microservice-alugueis
- Azure Functions para processamento de eventos
- React + Material-UI para frontend

## 3. Princípios

### Princípios Técnicos
- Separação de Responsabilidades (cada serviço com função específica)
- Loose Coupling (baixo acoplamento entre serviços)
- Alta Coesão (serviços focados em domínios específicos)
- Independência de Tecnologia (cada serviço pode usar tecnologias diferentes)

### Princípios de Negócio
- Processamento Assíncrono de Eventos
- Consistência Eventual
- Isolamento de Falhas
- Escalabilidade Independente

## 4. Riscos e Mitigações

### Riscos Técnicos
- Falha na comunicação entre serviços
  - Mitigação: Retry patterns, Circuit breaker
- Consistência de dados entre serviços
  - Mitigação: Event sourcing, logs de eventos
- Complexidade de deployment
  - Mitigação: Containerização com Docker

### Trade-offs
- Complexidade vs Flexibilidade
- Consistência vs Disponibilidade
- Performance vs Manutenibilidade

## 5. Estrutura da Solução

### Componentes Principais
1. microservice-estoques
   - Gerenciamento de estoques
   - MongoDB Atlas
   - CRUD operations

2. microservice-alugueis
   - Gerenciamento de aluguéis
   - Azure SQL/SQLite
   - CRUD operations

3. function-eventos
   - Processamento de eventos
   - Azure Functions
   - Event handling

4. bff-node
   - Agregação de dados
   - Proxy de APIs
   - Gestão de eventos

5. microfrontend
   - Interface do usuário
   - React + Material-UI
   - Responsive design

### Integrações
- BFF → Microserviços: REST APIs
- BFF → Functions: HTTP Triggers
- Microserviços ← → Functions: Event-based
- Frontend → BFF: REST APIs

## 6. Visão de Implantação

### Infraestrutura
- Containers Docker para cada serviço
- MongoDB Atlas (Cloud)
- Azure SQL Database
- Azure Functions
- GitHub Actions para CI/CD

### Ambientes
- Desenvolvimento: SQLite, MongoDB local
- Produção: Azure SQL, MongoDB Atlas

## 7. Evolução e Manutenção

### Métricas de Qualidade
- Cobertura de testes
- Tempo de resposta das APIs
- Taxa de sucesso de eventos
- Disponibilidade dos serviços

### Manutenibilidade
- Documentação por serviço
- APIs documentadas com OpenAPI/Swagger
- Logs centralizados
- Monitoramento de eventos

## 8. Decisões Pendentes

### Próximos Passos
- Implementar autenticação/autorização
- Melhorar tratamento de erros
- Adicionar monitoramento
- Implementar testes E2E

### Pontos de Atenção
- Segurança entre serviços
- Backup e recuperação
- Estratégia de deploy
- Gestão de configuração