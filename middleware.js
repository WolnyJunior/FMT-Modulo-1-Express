const express = require('express');
const app = express();
const PORT = 3434;

let produtos = []

app.use(express.json())
// app.use(registroEntrada);

const registroEntrada = (req, res, next) => {
    const horaAtual = new Date().toLocaleString();
    console.log(`Nova tarefa registrada em:[${horaAtual}]. Solicitação: ${req.method}. Caminho da URL: ${req.originalUrl}`);
    next();
}

app.get('/listar', registroEntrada, (req, res) => {
    res.json(produtos)
})

//Esta rota faz parte dos exercicio 3 e 4 - por enquanto
app.get('/buscaID/:id', registroEntrada,  (req, res)=>{
    const {id}= req.params
    const produto = produtos.find(produto=>produto.id==parseInt(id))
    if(!produto){
        res.status(404).send("Produto não encontrado.")
        return
    }
    //res.json(produto)
    res.send(`O produto solicitado pelo id: ${id}`)
    
})

app.post('/adicionar', registroEntrada, (req, res)=>{
    const produto = req.body
    produto.id = produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1
    produtos.push(produto)
    res.status(201).send('Produto adicionado com sucesso.')
})

app.put('/atualizar/:id', registroEntrada, (req, res)=>{
    const { id } = req.params
    const newData = req.body
    const index = produtos.findIndex(produto => produto.id == parseInt(id))
    if (index == -1) {
        res.status(404).send('Produto não encontrado')
        return;
    }
    produtos[index] = { ...produtos[index], ...newData }
    res.status(200).send("Produto atualizado com sucesso.")
})

app.delete('/excluir/:id', registroEntrada, (req,res)=>{
    const { id } = req.params
    const newData = req.body
    const index = produtos.findIndex(produto => produto.id == parseInt(id))
    if (index == -1) {
        res.status(404).send('Produto não encontrado')
        return;
    }
    produtos.splice(index,1)
    res.status(200).send('Produto excluído com sucesso.')
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})