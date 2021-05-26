const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor

// Define as operações HTTP que podem ser executadas a partir do '/' 
// por meio do navegador e outras aplicações
roteador.options('/', (requisicao, resposta) => {
    resposta.set('Access-Control-Allow-Methods', 'GET, POST')
    resposta.set('Access-Control-Allow-Headers', 'Content-Type')
    resposta.status(204)
    resposta.end()
})

roteador.get('/', async (requisicao, resposta) => {
    const resultados = await TabelaFornecedor.listar()
    resposta.status(200)
    const serializador = new SerializadorFornecedor(
        resposta.getHeader('Content-Type'),
        ['empresa']
    )
    resposta.send(
        serializador.serializar(resultados)
    )
})


roteador.post('/', async (requisicao, resposta, erroHTTP) => {
    
    try {
        const dadosRecebidos = requisicao.body
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar()
        resposta.status(201)
        const serializador = new SerializadorFornecedor(
            resposta.getHeader('Content-Type'),
            ['empresa']
        )
        resposta.send(
            serializador.serializar(fornecedor)
        )
    }
    catch (erro) {
        erroHTTP(erro)
    }
})

roteador.options('/:idFornecedor', (requisicao, resposta) => {
    resposta.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE')
    resposta.set('Access-Control-Allow-Headers', 'Content-Type')
    resposta.status(204)
    resposta.end()
})

roteador.get('/:idFornecedor', async (requisicao, resposta, erroHTTP) => {

    try {
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()

        resposta.status(200)
        const serializador = new SerializadorFornecedor(
            resposta.getHeader('Content-Type'),
            ['email', 'empresa', 'dataCriacao', 'dataAtualizacao', 'versao']
        )
        resposta.send(
            serializador.serializar(fornecedor)
        )
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

const roteadorProdutos = require('./produtos')

const verificarFornecedor = async (requisicao, resposta, erroHTTP) => {
    try {
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        requisicao.fornecedor = fornecedor
        erroHTTP()
    }
    catch (erro) {
        erroHTTP(erro)
    }
}

// A ordem abaixo importa
roteador.use('/:idFornecedor/produtos', verificarFornecedor, roteadorProdutos)

module.exports = roteador