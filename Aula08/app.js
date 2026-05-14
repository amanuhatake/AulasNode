//Importação o pacote HTTP 

const http = require('http');

const server = http.createServer((req, res)=>{
    res.setHeader('Content-Type', 'text/html; charset=utf-8');//função dentro do objeto response, pq abro parentese para usar ela


    //Alterando a propriedade no Controller(orquestra com view e model)
    if(req.url === '/'){
        res.end('<html><head><title>Bem vindo</title></head><body><h1>Seja Bem vindo ao Sistema XPTO!</h1></body></html>');
    }else if(req.url === '/cliente'){
        res.end('<h2>Cadastro de Cliente</h2>');
    }else{
        res.statusCode = 404;
        res.end('<h1>Página não encontrada</h1>');//acessando o objeto de resposta, o que vou enviar para o cliente
    }
});

const PORT = 3000;

server.listen(PORT, 'localhost', ()=>{//porta que estou escutando 
    console.log(`Servidor rodando na porta ${PORT}`);
})