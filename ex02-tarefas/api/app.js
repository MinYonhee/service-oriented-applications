import express from 'express';
import tarefasRoutes from './routes/tarefasRoutes.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('A API de Tarefas está online. Acesse /tarefas para ver os endpoints.');
});

app.use('/tarefas', tarefasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;