const express = require('express');
const tarefasRoutes = require('./routes/tarefasRoutes');

const app = express();
app.use(express.json());

app.use('/tarefas', tarefasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;