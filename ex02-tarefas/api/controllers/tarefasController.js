const Tarefa = require('../models/Tarefa');

let tarefas = [];

exports.criarTarefa = (req, res) => {
    try {
        const { descricao, concluida } = req.body;
        const novaTarefa = new Tarefa(descricao, concluida);
        tarefas.push(novaTarefa);
        res.status(201).json(novaTarefa);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.listarTarefas = (req, res) => {
    res.status(200).json(tarefas);
};

exports.buscarTarefaPorId = (req, res) => {
    const { objectId } = req.params;
    const tarefa = tarefas.find(t => t.objectId === objectId);
    if (!tarefa) {
        return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }
    res.status(200).json(tarefa);
};

exports.atualizarTarefa = (req, res) => {
    const { objectId } = req.params;
    const { descricao, concluida } = req.body;
    const tarefa = tarefas.find(t => t.objectId === objectId);

    if (!tarefa) {
        return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }

    if (descricao !== undefined) {
        tarefa.descricao = descricao;
    }
    if (concluida !== undefined) {
        tarefa.concluida = concluida;
    }

    res.status(200).json(tarefa);
};

exports.excluirTarefa = (req, res) => {
    const { objectId } = req.params;
    const indice = tarefas.findIndex(t => t.objectId === objectId);

    if (indice === -1) {
        return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }

    tarefas.splice(indice, 1);
    res.status(200).json({ message: 'Tarefa excluída com sucesso.' });
};