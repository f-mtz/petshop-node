const Modelo = require('./ModeloTabelaFornecedor')

// Esse módulo é responsável por renomear os métodos de acesso ao banco (até então)
module.exports = {
    listar() {
        return Modelo.findAll()
    },

    inserir(fornecedor) {
        return Modelo.create(fornecedor)
    },

    async pegarPorId(id) {
        const encontrado = await Modelo.findOne({
            where: {
                id: id
            }
        })

        if(!encontrado) {
            throw new Error('Fornecedor não encontrado')
        }

        return encontrado
    },

    async atualizar(id, dadosParaAtualizar) { 
        return Modelo.update(
            dadosParaAtualizar, 
            {
                where: { id: id }
            })

    },

    async remover(id) {
        return Modelo.destroy({
            where: {
                id: id
            }
        })
    }
}
