# 101 Estoques

Monorepo contendo microserviços, BFF e frontend para a plataforma 101 Estoques.

Estrutura:
- docs/: documentação OpenAPI
- microservice-estoques/: serviço de gestão de estoques (Node.js/Express sugerido)
- microservice-alugueis/: serviço de gestão de aluguéis
- bff-node/: Backend-for-Frontend para compor dados e orquestrar chamadas
- function-eventos/: funções de eventos (serverless)
- microfrontend/: front-end modular

Como começar (sugestão):
- Navegue até cada serviço e crie o package.json com as dependências necessárias.
- Use arquivos .env.example como referência para variáveis de ambiente.
- `docs/swagger.yaml` contém a especificação OpenAPI da plataforma.
