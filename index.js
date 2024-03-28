const express = require("express")

const app = express();

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
