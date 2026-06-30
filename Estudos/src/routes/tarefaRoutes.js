const express = require('express');
const router = express.Router();
const tarefaController = require('../controller/tarefaController');

router.get('/', tarefaController.listar);
router.post('/salvar', tarefaController.salvar);
router.post('/:id/atualizar', tarefaController.atualizar);
router.post('/:id/excluir', tarefaController.excluir);

module.exports = router;