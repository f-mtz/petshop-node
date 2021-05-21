const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')


// Vai exibir o Ok direto no navegador
roteador.get('/', async (requisicao, resposta) => {
    const resultados = await TabelaFornecedor.listar()
    resposta.status(200)
    resposta.send(JSON.stringify(resultados))
})


roteador.post('/', async (requisicao, resposta, erroHTTP) => {
    
    try {
        const dadosRecebidos = requisicao.body
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar()
        resposta.status(201)
        resposta.send(
            JSON.stringify(fornecedor)
        )
    }
    catch (erro) {
        erroHTTP(erro)
    }
})

roteador.get('/:idFornecedor', async (requisicao, resposta, erroHTTP) => {

    try {
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()

        resposta.status(200)
        resposta.send(JSON.stringify(fornecedor))
    } catch (erro) {
        erroHTTP(erro)
    }
})

roteador.put('/:idFornecedor', async (requisicao, resposta, erroHTTP) => {

    try {
        const id = requisicao.params.idFornecedor
        const dadosRecebidos = requisicao.body

        // A linha abaixo serge para juntar em um objeto só
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()
        resposta.status(204)
        resposta.end()

    }
    catch (erro) {
        erroHTTP(erro)
    }
})

roteador.delete('/:idFornecedor', async (requisicao, resposta, erroHTTP) => {
    try {

        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        await fornecedor.remover()
        resposta.status(204)
        resposta.end()
    } catch (erro) {
       erroHTTP(erro)
    }
})

module.exports = roteador