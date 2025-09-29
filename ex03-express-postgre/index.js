import "dotenv/config";
import cors from "cors";
import express from "express";

import db from "./models/index.js"; 
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";

const app = express();
app.set("trust proxy", true);

var corsOptions = {
  origin: "*", 
  optionsSuccessStatus: 200, 
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log(`[LOG] ${req.method} ${req.path} - IP: ${req.ip}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API Express com Sequelize e PostgreSQL rodando! Rotas: /users e /messages');
});

app.use("/users", userRouter);
app.use("/messages", messageRouter);


const port = process.env.PORT ?? 3000;


db.sequelize.sync({ force: false }) 
  .then(() => {
    console.log('Database sincronizado com sucesso. Tabelas prontas.');
    
    app.listen(port, () => {
      console.log(`Servidor rodando e ouvindo na porta ${port}!`);
    });
  })
  .catch((error) => {
    console.error('====================================================');
    console.error('FALHA CRÍTICA (Status 500): Não foi possível conectar/sincronizar o DB.');
    console.error('Verifique o DATABASE_URL no .env local e nas variáveis do Vercel.');
    console.error('Detalhes do Erro:', error.message);
    console.error('====================================================');
    process.exit(1); 
  });

