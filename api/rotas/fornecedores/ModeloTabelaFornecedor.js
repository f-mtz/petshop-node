const Sequelize = require('sequelize')
const instancia = require('../../banco-de-dados')

// Esse módulo basicamente é um modelo de representação de uma tabela no banco
const colunas = {
    "empresa": {
        type: Sequelize.STRING,
        allowNull: false
    },

    "email": {
        type: Sequelize.STRING,
        allowNull: false
    },
    "categoria": {
        type: Sequelize.ENUM('ração', 'brinquedos'),
        allowNull: false
    },
}

const opcoes = {
    freezeTableName: true,
    tableName: 'fornecedores',
    timestamps: true,
    createAt: 'dataCriacao',
    updateAt: 'dataAtualizacao',
    version: 'versao' 
}

module.exports = instancia.define('fornecedor', colunas, opcoes)