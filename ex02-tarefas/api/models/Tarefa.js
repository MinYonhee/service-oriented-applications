const { v4: uuidv4 } = require('uuid');

class Tarefa {
    constructor(descricao, concluida = false) {
        if (!descricao) {
            throw new Error("A descrição da tarefa é obrigatória.");
        }
        this.objectId = uuidv4();
        this.descricao = descricao;
        this.concluida = concluida;
    }
}

module.exports = Tarefa;