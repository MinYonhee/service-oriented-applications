import { v4 as uuidv4 } from 'uuid';

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

export default Tarefa;