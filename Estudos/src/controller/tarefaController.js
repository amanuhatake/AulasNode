const TarefaModel = require('../model/tarefaModel');

exports.listar = async (req, res) => {
  const tarefas = await TarefaModel.listarTodos();
  res.render('index', { tarefas });
};

exports.salvar = async (req, res) => {
  await TarefaModel.cadastrar(req.body);
  res.redirect('/tarefas');
};

exports.atualizar = async (req, res) => {
  const id = Number(req.params.id);
  await TarefaModel.atualizar(id, req.body);
  res.redirect('/tarefas');
};

exports.excluir = async (req, res) => {
  const id = Number(req.params.id);
  await TarefaModel.excluir(id);
  res.redirect('/tarefas');
};