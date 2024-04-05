const express = require("express")
const app = express();
const PORT = 3434;

app.use(express.json())

let usuarios = []

//Rota post para adicionar um novo usuário
app.post("/users", (req, res) => {
    const user = req.body
    user.id = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1
    usuarios.push(user)
    res.status(201).send('Novo usuario adicionado com sucesso. \nNome: ' + user.nome + '\nIdade: ' + user.idade)

    //Outra opção para exibir os dados do usuário recém criado em formato JSON
    // res.status(201).send(`Novo usuario adicionado com sucesso. ${JSON.stringify(novoUsuario)}`);
})

//Rota get para listar os usuários
app.get("/users", (req, res) => {
    res.json(usuarios)
})

//Rota get para buscar um usuário através do ID
app.get("/users/:id", (req, res) => {
    const { id } = req.params
    const user = usuarios.find(user => user.id == parseInt(id))
    if (!user) {
        res.status(404).send("Usuário não encontrado.")
        return
    }
    res.json(user)
})

//Rota para atualizar usuário através do ID
app.put("/users/:id", (req, res) => {
    const { id } = req.params
    const newData = req.body
    const index = usuarios.findIndex(user => user.id == parseInt(id))
    if (index == -1) {
        res.status(404).send("Usuário não encontrado.")
        return
    }
    usuarios[index] = { ...usuarios[index], ...newData }
    res.status(200).send(`Usuário atualizado com sucesso.`)
})

//Rota para deletar usuário através do ID
app.delete("/users/:id", (req, res)=>{
    const { id } = req.params
    const index = usuarios.findIndex(user => user.id == parseInt(id))
    if (index == -1) {
        res.status(404).send("Usuário não encontrado.")
        return
    }
    usuarios.splice(index, 1)
    res.status(200).send("Usuário deletado com sucesso.")

})

app.listen(PORT, function () {
    console.log(`Servidor rodando CRUD em http://localhost://${PORT}`)
})