require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/database');

const PORT = process.env.PORT || 3001;

// Conectar ao MongoDB
connectDB();

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Microserviço Estoques rodando na porta ${PORT}`);
});