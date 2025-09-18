const express = require('express');
const router = express.Router();
const tarefasController = require('../controllers/tarefasController');

router.post('/', tarefasController.criarTarefa);
router.get('/', tarefasController.listarTarefas);
router.get('/:objectId', tarefasController.buscarTarefaPorId);
router.put('/:objectId', tarefasController.atualizarTarefa);
router.delete('/:objectId', tarefasController.excluirTarefa);

module.exports = router;