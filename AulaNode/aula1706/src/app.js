const express = require('express');
const app = express();

const db = require('./models/db/db');
const {buscarUsuarios, editarUsuario} = require('./models/DAO/usuarioDAO');

//Configurações
app.set('view engine', 'EJS');
app.set('views', './src/views');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
const PORTA = 3000;

//Configurar usando o jwt
const jwt = require('jsonwebtoken');
const SECRET = 'K9ykm5e8gws6Xf2AxSn3seXnDYi9ss7P'; //gerado do lastpass, SECRET é indicando que foi esse servidor que gerou o token
//READ: Listar os usuários
app.get('/', segurancaDaBalada, async (req, res)=>{
    res.render('index', {usuarios: await buscarUsuarios()});
});

//READ: Listar um usuário específico
app.get('/usuario/:id', verificaPulseiraVip, async (req, res)=>{
    const id = parseInt(req.params.id);
    const usuariosBanco = await db.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    console.log(`Resultado do banco: ${JSON.stringify(usuariosBanco.rows)}`);
    res.render('index', {usuarios: usuariosBanco.rows});
});

//CREATE: Formulário de adição
app.get('/adicionar', (req, res)=>{
    res.render('adicionar');
});

//CREATE: Recebe os dados e salva
app.post('/adicionar',verificaPulseiraVip, async (req, res)=>{
    const { nome, email } = req.body;
    const query = 'INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING *';
    const values = [nome, email];

    try{
        const respostaBanco = await db.query(query, values);
        console.log('Resposta do banco: ', respostaBanco.rows[0]);
    }catch (err){
        console.error("Erro ao inserir: ", err);
    }finally{
        res.redirect('/');
    }
});

//UPDATE: Formulário de edição
app.get('/editar/:id', verificaPulseiraVip, async (req, res)=>{
    const id = parseInt(req.params.id);
    const linhas = await db.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    const usuario = linhas.rows[0];
    if(!usuario) return res.status(404).send('Usuario não encontrado');
    res.render('editar', {usuario});
});

//UPDATE: Receber os dados e atualizar
app.post('/editar/:id', verificaPulseiraVip, async (req, res) => {
    const id = parseInt(req.params.id);
    const {nome, email} = req.body;
    
    try{
        const usuario = {id, nome, email};
        await editarUsuario(usuario);
    }catch (err){
        console.error('Erro ao atualizar: ', err);
    }finally{
        res.redirect('/');
    }
})

//DELETE: Remover o usuário
app.post('/deletar/:id',verificaPulseiraVip, async (req, res) =>{
    const id = parseInt(req.params?.id);
    const query = 'DELETE FROM usuarios WHERE id = $1';
    const values = [id];
    
    try{
        const respostaBanco = await db.query(query, values);
        console.log('Linhas afetadas', respostaBanco.rowCount);
    }catch(err){
        console.error('Erro ao remover: ', err);
    }finally{
        res.redirect('/');
    }
})

app.post('/login',verificaPulseiraVip, async (req,res) =>{
    const {email, senha} = req.body; 
    const corpo = req.body;
    const result = await db.query('SELECT * FROM usuarios WHERE email = $1 AND senha = $2', [email,senha]);

    const usuario = result.rowowbs[0];

    if(!usuario){
        return res.status(401).send('Acesso negado! Usuários e/ou senha incorretos');
    }

    //CRIANDO a pulseira VIP (O token JWT)
    const token = jwt.sign(
        {id: usuario.id, nome: usuario.nome},//Payload 
        SECRET, //assinatura (nosso selo)
        {expiresIn: '1h'} //Definindo duração do token
    );
})

res.jason({mensagem: 'Logado com sucesso!', token});

function verificaPulseiraVip(req,res,next){
    const token = req.headers['authorization'];

    if(!token) return res.status(401).send('Você não tem a pulseira VIP(Token Ausente)');

    const tokenLimpo = token.split(' ')[1] || token; //verificando o token 

    jwt.verify(token, SECRET, tokenLimpo, (err, decoded)=>{
        if(err) return res.status(403).send("Pulseira falsa ou vencida(Token Inválido");

        req.usuario = decoded; //Salva os dados do usuario para a rota poder usar 

        next();
    })
}

//Middleware
function segurancaDaBalada(req, res, next){

    //1° O segurança olha para a mão do usuário (headers de requisição)
    const token = req.headers['authorization'];

    //2° Se o usuario chegou com as maos abanandoi (sem token)
    if(!token){
        return res.status(401).send('<h1>Acesso Negado! Cadê sua pulseira, parça?</h1>');
    }

    //3° Se ele tem a pulseira, o segurança verifica se ela é valida
    //o Padrão esperado é a plavra 'Bearer <token>' -> padrão de comportamento
    if(token === 'Bearer PULSEIRA_VIP_NIVERHELTINHO_2026'){//vamos gerar com jsonwebtoken 
        next();
    }else{
        //Se a pulseira for de outra festa/ano
        return res.status(403).send('<h1>Acesso negado! Pulseira falsa</h1>');
    }
    next();
}

app.listen(PORTA, ()=>{
    console.log(`Servidor rodando na porta ${PORTA}`);
})