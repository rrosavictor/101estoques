require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/database');

const PORT = process.env.PORT || 3003;

(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Function Eventos rodando na porta ${PORT}`);
  });
})();