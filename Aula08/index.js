const fs = require('fs'); //função que importa algo 
//console.log("Código funcionando!");

//Exemplo de código Node.js 

const nome = "Manu Silva";
console.log("Seja bem-vindo!", nome);

fs.writeFile('aula08.txt', 'Esse arquivo foi gerado o Node.js',(err) => {
    if(err) throw err;
    console.log('Arquivo cirado com sucesso!');
});

fs.readFile('arquivo07-externo.txt','utf8', (err, data)=>{//exibe conteúdo do arquivo
    if(err) throw err;
    console.log(data);
});

