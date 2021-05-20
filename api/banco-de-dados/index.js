const Sequelize = require('sequelize')
const config = require('config')

// Esse módulo basicamente associa as strings de conexão do banco a uma instancia do Sequelize
const instancia = new Sequelize(
    // Forma direta:

    // 'petshop', //nome do banco de dados
    // 'root', // usuario do banco de dados
    // '123456', // senha
    // {
    //     host: '127.0.0.1',
    //     dialect: 'mysql',

    // }
    
    config.get('mysql.banco-de-dados'),
    config.get('mysql.usuario'),
    config.get('mysql.senha'),

    {
        host: config.get('mysql.host'),
        dialect: 'mysql'
    }
)

module.exports = instancia