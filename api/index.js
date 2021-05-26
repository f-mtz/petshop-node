const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const config = require('config')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
const formatosAceitos = require('./Serializador').formatosAceitos
const SerializadorErro = require('./Serializador').SerializadorErro

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

// Permitindo que outras aplicações use nossa API, o * significa any URL, 
//se fosse uma apenas bateria passar o URL raiz
app.use((requisicao, resposta, erroHTTP) => {
    resposta.set('Access-Control-Allow-Origin', '*')
    erroHTTP()
})

// Trazendo as rotas para a aplicação
const roteador = require('./rotas/fornecedores')
app.use('/api/fornecedores', roteador)

const roteadorV2 = require('./rotas/fornecedores/rotas.v2')
app.use('/api/v2/fornecedores', roteadorV2)


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
    const serializador = new SerializadorErro(
        resposta.getHeader('Content-Type')
    )
    resposta.status(status)
    resposta.send(
        serializador.serializar(({
        mensagem: erro.message,
        id: erro.idErro
    }))
    )
})

// Porta onde o app será executado
app.listen(config.get('api.porta'), () => {
    console.log('API está funcionando')
})

// version X.Y.Z, 
// X representa uma mudança que requer alterações de código e muda a forma de usar a nossa API (MAJOR)
// Y representa acrescimo de funcionalidades (MINOR)
// Z representa correcao de BUG's (PATCH)