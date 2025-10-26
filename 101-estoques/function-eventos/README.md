# Function Eventos - 101 Estoques

## Descrição
Functions para processamento de eventos da plataforma 101 Estoques.

## Tecnologias
- Node.js 18
- Express (simulando Azure Functions localmente)
- MongoDB (para persistência dos eventos)

## Instalação
```bash
npm install
```

## Configuração
Copie `.env.example` para `.env` e configure:
- PORT=3003
- MONGODB_URI=sua_connection_string
- MICROSERVICE_ESTOQUES_URL=http://localhost:3001
- MICROSERVICE_ALUGUEIS_URL=http://localhost:3002

## Executar
```bash
npm start          # Produção
npm run dev        # Desenvolvimento (com nodemon)
```

## Endpoints (HTTP Triggers)

### POST /api/eventos
Cria novo evento para processamento.

Payload:
```json
{
  "tipo": "ALUGUEL_CRIADO",
  "dados": {
    "estoque_id": "123",
    "aluguel_id": 456,
    "cliente_nome": "João"
  }
}
```

Tipos de eventos suportados:
- ESTOQUE_CRIADO
- ALUGUEL_CRIADO
- ALUGUEL_FINALIZADO

### GET /api/eventos
Lista eventos. Query params opcionais:
- tipo: filtrar por tipo de evento
- status: filtrar por status (pendente, processado, erro)

## Docker
```bash
docker build -t seu-usuario/fn-eventos:v1 .
docker run -p 3003:3003 --env-file .env seu-usuario/fn-eventos:v1
```

## Testar
```bash
# Health check
curl http://localhost:3003/

# Criar evento
curl -X POST http://localhost:3003/api/eventos \
  -H "Content-Type: application/json" \
  -d '{
    "tipo": "ALUGUEL_CRIADO",
    "dados": {
      "estoque_id": "64b8f9c2f1a4e3b5c6d7e8f9",
      "aluguel_id": 1,
      "cliente_nome": "João Silva"
    }
  }'

# Listar eventos
curl http://localhost:3003/api/eventos
```

## Observações
- Esta é uma implementação Express que simula Azure Functions para desenvolvimento local
- Para produção, converter para Azure Functions com trigger HTTP
- Eventos são processados de forma assíncrona após recebimento
- Sistema mantém histórico de eventos e seu processamento