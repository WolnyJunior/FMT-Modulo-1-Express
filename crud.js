const express = require("express")
const app = express();
app.use(express.json())

let usuarios = []

app.post("/usuario", (req, res) => {
    const { nome, idade } = req.body

    let novoUsuario = { nome, idade }

    usuarios.push(novoUsuario)

    res.status(201).send('Novo usuario adicionado com sucesso. \nNome: ' + novoUsuario.nome + '\nIdade: ' + novoUsuario.idade)
    // res.status(201).send(`Novo usuario adicionado com sucesso. ${JSON.stringify(novaPessoa)}`);
})

app.get("/usuario", (req, res) => {
    res.json(usuarios)

})

app.listen(3000, function () {
    console.log("servidor-rodando-POST")
})