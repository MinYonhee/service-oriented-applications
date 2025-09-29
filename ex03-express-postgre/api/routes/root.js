import express from 'express';
import dotenv from 'dotenv';
import db from './models/index.js'; 
import userRouter from './routes/user.routes.js';
import messageRouter from './routes/message.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API Express com Sequelize rodando!');
});

app.use('/users', userRouter);
app.use('/messages', messageRouter);

db.sequelize.sync({ force: false }) 
  .then(() => {
    console.log('Database sincronizado com sucesso. Conectado ao PostgreSQL.');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Falha ao sincronizar database:', error);
    console.error('ERRO INTERNO DO SERVIDOR (500): Conexão com o DB falhou.');
    process.exit(1); 
  });



;