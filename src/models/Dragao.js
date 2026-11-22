export class Dragao {
    constructor(id, nomes, especie, porte, sexo, idadeEstimada, dataResgate, situacao) {
        this.id = id;
        this.nomes = nomes;
        this.especie = especie;
        this.porte = porte;
        this.sexo = sexo;
        this.idadeEstimada = idadeEstimada;
        this.dataResgate = dataResgate;
        this.situacao = situacao;
    }
}

export default class DragaoService {
    constructor(){
        this.dragoes = []; 
        this.proximoID = 1;
    }

cadastrar(dados){
    const dragao = new Dragao(
        this.proximoID++,
        dados.nomes,
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
    
buscarPorId(id){
    return this.dragoes.find(
        dragao => dragao.id === id
    );
}

excluir(id){
    const indice = this.dragoes.findIndex(
        dragao => dragao.id === Number(id)
    );

    if (indice === -1) return false;

    this.dragoes.splice(indice, 1);

    return true;
}
}
