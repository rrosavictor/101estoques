require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const estoqueRoutes = require('./routes/estoque.routes');
const aluguelRoutes = require('./routes/aluguel.routes');
const agregadoRoutes = require('./routes/agregado.routes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Swagger UI
const swaggerDocument = YAML.load(path.join(__dirname, '../docs/swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/estoques', estoqueRoutes);
app.use('/api/alugueis', aluguelRoutes);
app.use('/api/agregado', agregadoRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Algo deu errado!',
    error: err.message
  });
});

app.listen(port, () => {
  console.log(`BFF rodando na porta ${port}`);
});