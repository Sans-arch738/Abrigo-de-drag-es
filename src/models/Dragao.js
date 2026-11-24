export default class Dragao {
    constructor(
        id,
        nome,
        especie,
        porte,
        sexo,
        idadeEstimada,
        dataResgate,
        situacao
    ) {
        this.id = id;
        this.nome = nome;
        this.especie = especie;
        this.porte = porte;
        this.sexo = sexo;
        this.idadeEstimada = idadeEstimada;
        this.dataResgate = dataResgate;
        this.situacao = situacao;
    }
}

const dragao = new Dragao(
    1,
    "Ignis",
    "Ignis",
    "Grande",
    "Macho",
    25,
    "2026-11-22",
    "Em tratamento"
);
