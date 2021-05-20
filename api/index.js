const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const config = require('config')
const NaoEncontrado = require('./erros/NaoEncontrado')

//Para trabalhar com JSON
app.use(bodyParser.json())

// Trazendo as rotas para a aplicação
const roteador = require('./rotas/fornecedores')
app.use('/api/fornecedores', roteador)


app.use((erro, requisicao, resposta, erroHTTP) => {
    
    if(erro instanceof NaoEncontrado) {
        resposta.status(404)
    }

    else {
    resposta.status(400)
    }
    resposta.send(JSON.stringify({
        mensagem: erro.message,
        id: erro.idErro
    })
    )
})

// Porta onde o app será executado
app.listen(config.get('api.porta'), () => {
    console.log('API está funcionando')
})