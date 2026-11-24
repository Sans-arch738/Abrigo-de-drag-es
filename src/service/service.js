
import Dragao from '../models/Dragao.js';

class DragaoService {
    constructor() {
        this.dragoes = [];
        this.proximoId = 1;
    }

    cadastrar(dados) {
        const dragao = new Dragao(
            this.proximoId++,
            dados.nome,
            dados.especie,
            dados.porte,
            dados.sexo,
            dados.idadeEstimada,
            dados.dataResgate,
            dados.situacao
        );

        this.dragoes.push(dragao);
        return dragao;
    }

    listar() {
        return this.dragoes;
    }

    buscarPorId(id) {
        return this.dragoes.find(
            dragao => dragao.id === Number(id)
        );
    }

    excluir(id) {
        const indice = this.dragoes.findIndex(
            dragao => dragao.id === Number(id)
        );

        if (indice === -1) return false;

        this.dragoes.splice(indice, 1);
        return true;
    }
}

export default new DragaoService();
