const db = require('../database/connection');

async function listarTodos(){
    const result = await db.query('SELECT * FROM tarefas');
    return result.rows;
};

async function cadastrar(dados){
    const result = await db.query(`INSERT INTO tarefas (titulo) VALUES ($1) RETURNING id_tarefa AS id`[dados.titulo]);
    return result.rows[0];
};

async function atualizar(id,dados){
     await db.query(
    'UPDATE tarefas SET titulo = $1, status = $2 WHERE id_tarefa = $3',
    [dados.titulo, dados.status, id]
  );
};

async function excluir(id){
   const result = await db.query(
    'DELETE FROM tarefas WHERE id_tarefa = $1',
    [id]
  );
  return result.rowCount > 0;
}

module.exports = { listarTodos, cadastrar, atualizar, excluir };