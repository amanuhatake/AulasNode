const express = require('express');
const app = express();
const PORTA = 3000;

//Configurações 
app.set('view engine', 'EJS');
app.use(express.urlencoded({extended:true}));
app.set('views', './src/views');

//Nosso "Banco de dados" em memoria 
let usuarios = [
    {id:1, nome:"Manu", email: 'manu@up.com.br'},
    {id:2, nome:"Margo", email: 'margo@up.com.br'},
    {id:3, nome:"Livian", email: 'livian@up.com.br'},
    {id:4, nome:"Lizie", email: 'lizie@up.com.br'},
]

//READ: Listar ao usuários
app.get('/', (req,res)=>{
    res.render('index.ejs', {usuarios});
})

app.listen(PORTA,()=>{
    console.log(`Servidor rodando na porta ${PORTA}`);
})

//CREATE: Formulário de adição. 
app.get('/adicionar', (req,res)=>{//mostrar a pagina
    res.render('adicionar');
}) 

//CREATE: Rebece os dados e salva
app.post('/adicionar', (req,res)=>{
    const {nome,email} = req.body; //pegar os dados do corpo da requisição

    //criar um novoID e pegar o tamanho do array
    //acessando a posição -1 para saber o ultimo elemento para colocar o primeiro e 
    //se for vazio vai pra 1
    const novoId = usuarios.length > 0 ?  usuarios[usuarios.length -1].id  +1 : 1; 
    usuarios.push({id:novoId, nome, email}); // chave e valor mesmo nome, coloca só o nome 1x

    res.redirect('/'); //redirecionando para o cliente com res = response
})

//UPDATE: Formulário de edição
app.get('/editar/:id', (req,res)=>{
    //regra de trabalho , todo parametro vem como STRING pq usamos html que é escrita e por isso chamamos parseInt para converter para numero (inteiro)
    const id = parseInt(req.params.id) //retornar um objeto com todos os parametros

    // passar em cada posição do array 
    //possiveis erros: encontrar e não encontrar 
    const usuario = usuarios.find(u =>u.id === id); 
    //se nao encontrar
    if(!usuario) return res.status(404).send('Usuario nao encontrado');

    //se contrar
    res.render('editar', {usuario});

    
})
