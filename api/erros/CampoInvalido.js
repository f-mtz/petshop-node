class CampoInvalido extends Error {
    constructor(campo) {
        const mensagem = `O Campo '${campo}' está inválido!`
        super(mensagem)
        this.name = 'CampoInvalido'
        this.idErro = 1

    }
}

module.exports = CampoInvalido