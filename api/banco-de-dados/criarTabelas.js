const ModeloTabela = require('../rotas/fornecedores/ModeloTabelaFornecedor')

// chamada para criar as tabelas
ModeloTabela
     .sync()
     .then(()=> console.log('Tabela criada com sucesso'))
     .catch(console.log)