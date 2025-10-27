# Microfrontend 101estoques

Interface web do sistema 101estoques, construída com React e Material-UI.

## Funcionalidades

- Listagem e gerenciamento de estoques
- Listagem e gerenciamento de aluguéis
- Visualização de dados agregados
- Interface responsiva e moderna

## Tecnologias

- React 18
- Material-UI
- Vite
- React Router
- Axios

## Estrutura do Projeto

```
src/
  components/    # Componentes reutilizáveis
  pages/        # Páginas da aplicação
  services/     # Serviços de API
  contexts/     # Contextos React
  hooks/        # Custom hooks
  utils/        # Funções utilitárias
  assets/       # Imagens e outros recursos
```

## Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Construir para produção
npm run build

# Visualizar build de produção
npm run preview
```

## Variáveis de Ambiente

```
VITE_API_URL=http://localhost:3000  # URL do BFF
```

## Docker

```bash
# Build
docker build -t microfrontend-101estoques .

# Run
docker run -p 5173:80 microfrontend-101estoques
```