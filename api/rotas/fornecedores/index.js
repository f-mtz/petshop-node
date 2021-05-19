const roteador = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor')

// Vai exibir o Ok direto no navegador
roteador.get('/', async (requisicao, resposta) => {
    const resultados = await TabelaFornecedor.listar()
    resposta.send(JSON.stringify(resultados))
})

module.exports = roteador