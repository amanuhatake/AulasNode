const express = require("express"); // importou para dentro do projeto o pacote express || importando o pacote express
const app = express(); //chamar o construtor do express, receber a crição do objeto express || Instanciando/Inicializando o Express
const port = 3000; 

//Declarar o middleware para processar o corpo da requisição 
//garantindo que sempre que eu enviar um parametro dentro do corpo da requisição precisa pegar 
app.use(express.urlencoded({extended: true}));


app.use(express.json());


//Rotas da aplicação 

app.get('/', (req, res) =>{
    console.log("Requisição tipo Get realizada na rota/");
    res.send("<h1>BEm vindo ao Sistema XPTO!</h>");
    
});

app.get("/cadastrocliente", (req,res) =>{ //mostrando no servidor
    console.log("Requisição tipo GET na rota /cadastrodeCliente");
    res.send("<h1>Cadastro do Cliente</h>");
});

//Capturando um parametro 
app.get('/buscar', (req,res)=>{ //verificar se o termo tem valor
    const termoDeBusca = req.query.termo;
    if(termoDeBusca){//se nao existe e se nao for vazio
        console.log("Parametro via query:" + termoDeBusca);
        res.send(`<h1>Você pesquisou por ${termoDeBusca}</h1>`);
    }else{
        res.send("<h1>Você nao informou o parametro de busca</h1>");// respondendo por res 
    }
});

//Nao se deve fazer isso, passar informações sensiveis para o queryParameter
app.get('/login', (req,res)=>{
    const pLogin = req.query.login;
    const sSenha= req.query.senha;

    if(pLogin === "Manu" && sSenha === "123"){
        res.send("<h1> Bem vindo Manu</h1>");
    }
});

//corpo da função da requisição
app.post('/recebeform', (req,res)=>{
    const dados = req.body
    console.log("Dados vindo do formulário: ", dados);
    res.send("Dados enviados!");//sempre responder o cliente, se nao fica em looping
});

app.post('/login', (req,res) =>{
    const {login, senha} = req.body; //desconstruindo o objeto 
    console.log(`Login: ${login}, Senha: ${senha}`);
    if(login === 'Manu' && senha === '12345'){

        res.status(202).send("<h1>Bem vindo ao Sistema</h>")
    }else{
        res.status(401).send("<h1>Login e ou senha incorretos!</h1>");
    }
})

app.post('/cadastrarproduto', (req,res) =>{
    const {condigo, nome, preco} = req.body;
    if(codigo && nome && preco){
        res.status(202).send(`<h1>Peoduto Inserido!<p>Codigo: ${codigo} | Nome: ${nome} | Preço: ${preco}</p></h1>`);
    }else{
        res.status(400).send("<h1>Você não informou algum dos 3 parametros</h1>");
    }
})

app.put("/editaonibus", (req,res)=>{
    const {numero, linha, lugares} = req.body;
    if(numero && linha && lugares){
        res.status(200).send(`<h1> Busao alterado!</h1><p>Numero: ${numero}| Linha: ${linha}| Lugares: ${lugares}</p>`);
    }else{
        res.status(400).send("<h1> alguma coisa</h1>");
    }
})


app.get("/sobre", (req,res) =>{
    console.log("Requisição tipo GET na rota /sobre"); 
});
//Startabdo o servidor na porta 3000
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
});