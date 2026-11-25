import Dragao from '../models/Dragao.js';

class DragaoService {

    constructor() {
        this.dragoes = [];
        this.proximoId = 1;
    }

    validarDados(dados, parcial = false) {
        const especies = [
            'Ignis', 'Sylvan', 'Aquaris', 'Nereus',
            'Zephyrus', 'Altaris', 'Glacius',
            'Duneris', 'Noctis', 'Vectaris'
        ];

        const portes = ['Pequeno', 'Médio', 'Grande'];
        const sexos = ['Macho', 'Fêmea'];

        const situacoes = [
            'Em tratamento',
            'Disponível para adoção',
            'Adotado'
        ];

        const erros = [];

        const camposObrigatorios = [
            'nome', 'especie', 'porte', 'sexo',
            'idadeEstimada', 'dataResgate',
            'dadosResgate', 'situacao'
        ];

        if (!parcial) {
            camposObrigatorios.forEach(campo => {
                if (
                    dados[campo] === undefined ||
                    dados[campo] === null ||
                    dados[campo] === ''
                ) {
                    erros.push(`O campo ${campo} é obrigatório.`);
                }
            });
        }

        if (dados.especie !== undefined) {
            const especieValida = especies.some(
                especie => especie.toLowerCase() ===
                    String(dados.especie).trim().toLowerCase()
            );

            if (!especieValida) {
                erros.push('Espécie inválida. Escolha uma das dez espécies do Draconis.');
            }
        }

        if (dados.porte !== undefined) {
            const porteValido = portes.some(
                porte => porte.toLowerCase() ===
                    String(dados.porte).trim().toLowerCase()
            );

            if (!porteValido) {
                erros.push('Porte inválido. Utilize Pequeno, Médio ou Grande.');
            }
        }

        if (dados.sexo !== undefined) {
            const sexoValido = sexos.some(
                sexo => sexo.toLowerCase() ===
                    String(dados.sexo).trim().toLowerCase()
            );

            if (!sexoValido) {
                erros.push('Sexo inválido. Utilize Macho ou Fêmea.');
            }
        }

        if (dados.idadeEstimada !== undefined) {
            const idade = Number(dados.idadeEstimada);

            if (
                dados.idadeEstimada === '' ||
                !Number.isInteger(idade) ||
                idade < 0
            ) {
                erros.push('A idade estimada deve ser um número inteiro igual ou maior que zero.');
            }
        }

        if (dados.dataResgate !== undefined) {
            const dataValida =
                /^\d{4}-\d{2}-\d{2}$/.test(dados.dataResgate) &&
                !Number.isNaN(Date.parse(dados.dataResgate)) &&
                new Date(dados.dataResgate).toISOString().startsWith(dados.dataResgate);

            if (!dataValida) {
                erros.push('Data de resgate inválida. Utilize o formato AAAA-MM-DD.');
            }
        }

        if (dados.situacao !== undefined) {
            const situacaoValida = situacoes.some(
                situacao => situacao.toLowerCase() ===
                    String(dados.situacao).trim().toLowerCase()
            );

            if (!situacaoValida) {
                erros.push('Situação inválida. Utilize Em tratamento, Disponível para adoção ou Adotado.');
            }
        }

        if (dados.nome !== undefined && !String(dados.nome).trim()) {
            erros.push('O nome do dragão não pode ficar vazio.');
        }

        if (
            dados.dadosResgate !== undefined &&
            !String(dados.dadosResgate).trim()
        ) {
            erros.push('Os dados do resgate não podem ficar vazios.');
        }

        return erros;
    }

}

export default new DragaoService();
