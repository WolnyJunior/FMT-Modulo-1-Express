const express = require("express")

const app = express();

app.use(express.json())

// Chamar arquivos estáticos através do express
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html")
})

app.get("/sobre", function(req,res){
    res.send("Olá, tudo bem?\nEssa é minha prmeira app de servidor.")
})

app.get("/ola/:contato", function(req,res){
    let contato = req.params.contato
    res.send("Entre em contato pelo e-mail suporte@email.com")
})

app.listen(3000, function(){
    console.log("servidor-rodando")
})
