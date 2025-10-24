const { Sequelize } = require('sequelize');

let sequelize;

function getSequelizeInstance() {
  if (sequelize) return sequelize;

  const azureConn = process.env.AZURE_SQL_CONNECTION;
  if (azureConn) {
    // Parse Azure connection string into options for tedious
    sequelize = new Sequelize(process.env.AZURE_SQL_CONNECTION, {
      dialect: 'mssql',
      dialectOptions: {
        options: {
          encrypt: true
        }
      },
      logging: false
    });
  } else {
    // Fallback to SQLite for local development
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: process.env.SQLITE_STORAGE || './data/alugueis.sqlite',
      logging: false
    });
  }

  return sequelize;
}

const connectDB = async () => {
  try {
    const seq = getSequelizeInstance();
    await seq.authenticate();
    await seq.sync();
    console.log('Database conectado com sucesso');
  } catch (error) {
    console.error('Erro ao conectar ao DB:', error.message);
    process.exit(1);
  }
};

module.exports = { connectDB, getSequelizeInstance };