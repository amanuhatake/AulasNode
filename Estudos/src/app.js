const express = require('express');
const app = express();
const PORT = 3000;

// configurações
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.set('views', './src/views');

// rotas
const tarefaRoutes = require('./routes/tarefaRoutes');
app.use('/tarefas', tarefaRoutes);

// inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});