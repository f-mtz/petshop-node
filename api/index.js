const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const config = require('config')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
const formatosAceitos = require('./Serializador').formatosAceitos

//Para trabalhar com JSON
app.use(bodyParser.json())
//Middleware, próxima rota
app.use((requisicao, resposta, proximaRota) => {
    let formatoRequisitado = requisicao.header('Accept')

    if(formatoRequisitado === '*/*') {
        formatoRequisitado = 'application/json'
    }

    if(formatosAceitos.indexOf(formatoRequisitado) === -1) {
        resposta.status(406)
        resposta.end()
        return
    }

    resposta.setHeader('Content-Type', formatoRequisitado)
    proximaRota()
})

// Trazendo as rotas para a aplicação
const roteador = require('./rotas/fornecedores')
app.use('/api/fornecedores', roteador)


app.use((erro, requisicao, resposta, erroHTTP) => {
    let status = 500
    if(erro instanceof NaoEncontrado) {
        status = 404
    }

    if (erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos) {
        status = 400
    }

    if(erro instanceof ValorNaoSuportado) {
        status = 406
    }

    resposta.status(status)
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