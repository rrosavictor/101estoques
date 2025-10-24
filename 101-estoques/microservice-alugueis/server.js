require('dotenv').config();
const app = require('./src/app');
const { connectDB } = require('./src/config/database');

const PORT = process.env.PORT || 3002;

(async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`Microserviço Aluguéis rodando na porta ${PORT}`));
})();