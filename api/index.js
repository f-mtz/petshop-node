const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const config = require('config')


//Para trabalhar com JSON
app.use(bodyParser.json())

// Trazendo as rotas para a aplicação
const roteador = require('./rotas/fornecedores')
app.use('/api/fornecedores', roteador)

// Porta onde o app será executado
app.listen(config.get('api.porta'), () => {
    console.log('API está funcionando')
})