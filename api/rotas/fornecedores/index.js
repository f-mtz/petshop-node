const roteador = require('express').Router();

// Vai exibir o Ok direto no navegador
roteador.get('/', (requisicao, resposta) => {
    resposta.send('Ok')
})

module.exports = roteador