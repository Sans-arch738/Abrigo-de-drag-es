
import connection from '../database/connection.js';

class DragaoService {

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
            const valida = especies.some(
                especie => especie.toLowerCase() ===
                    String(dados.especie).trim().toLowerCase()
            );

            if (!valida) erros.push('Espécie inválida.');
        }

        if (dados.porte !== undefined) {
            const valida = portes.some(
                porte => porte.toLowerCase() ===
                    String(dados.porte).trim().toLowerCase()
            );

            if (!valida) erros.push('Porte inválido.');
        }

        if (dados.sexo !== undefined) {
            const valida = sexos.some(
                sexo => sexo.toLowerCase() ===
                    String(dados.sexo).trim().toLowerCase()
            );

            if (!valida) erros.push('Sexo inválido.');
        }

        if (dados.idadeEstimada !== undefined) {
            const idade = Number(dados.idadeEstimada);

            if (
                dados.idadeEstimada === '' ||
                !Number.isInteger(idade) ||
                idade < 0
            ) {
                erros.push('Idade estimada inválida.');
            }
        }

        if (dados.dataResgate !== undefined) {
            const dataValida =
                /^\d{4}-\d{2}-\d{2}$/.test(dados.dataResgate) &&
                !Number.isNaN(Date.parse(dados.dataResgate)) &&
                new Date(dados.dataResgate).toISOString()
                    .startsWith(dados.dataResgate);

            if (!dataValida) {
                erros.push('Data de resgate inválida. Utilize AAAA-MM-DD.');
            }
        }

        if (dados.situacao !== undefined) {
            const valida = situacoes.some(
                situacao => situacao.toLowerCase() ===
                    String(dados.situacao).trim().toLowerCase()
            );

            if (!valida) erros.push('Situação inválida.');
        }

        if (dados.nome !== undefined && !String(dados.nome).trim()) {
            erros.push('O nome não pode ficar vazio.');
        }

        if (
            dados.dadosResgate !== undefined &&
            !String(dados.dadosResgate).trim()
        ) {
            erros.push('Os dados do resgate não podem ficar vazios.');
        }

        return erros;
    }

    async cadastrar(dados) {
        const sql = `
            INSERT INTO dragoes (
                nome, especie, porte, sexo,
                idadeEstimada, dataResgate,
                dadosResgate, situacao
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const valores = [
            dados.nome,
            dados.especie,
            dados.porte,
            dados.sexo,
            dados.idadeEstimada,
            dados.dataResgate,
            dados.dadosResgate,
            dados.situacao
        ];

        const [resultado] = await connection.query(sql, valores);

        return this.buscarPorId(resultado.insertId);
    }

    async listar(filtros = {}) {
        let sql = 'SELECT * FROM dragoes';
        const valores = [];
        const condicoes = [];

        Object.entries(filtros).forEach(([campo, valor]) => {
            const camposPermitidos = [
                'nome', 'especie', 'porte', 'sexo',
                'idadeEstimada', 'dataResgate',
                'dadosResgate', 'situacao'
            ];

            if (camposPermitidos.includes(campo)) {
                condicoes.push(`${campo} LIKE ?`);
                valores.push(`%${valor}%`);
            }
        });

        if (condicoes.length > 0) {
            sql += ' WHERE ' + condicoes.join(' AND ');
        }

        const [dragoes] = await connection.query(sql, valores);

        return dragoes;
    }

    async buscarPorId(id) {
        const [dragoes] = await connection.query(
            'SELECT * FROM dragoes WHERE id = ?',
            [id]
        );

        return dragoes[0] || null;
    }

    async buscarPorNome(nome) {
        const [dragoes] = await connection.query(
            'SELECT * FROM dragoes WHERE nome LIKE ?',
            [`%${nome}%`]
        );

        return dragoes;
    }

    async editar(id, dados) {
        const camposPermitidos = [
            'nome', 'especie', 'porte', 'sexo',
            'idadeEstimada', 'dataResgate',
            'dadosResgate', 'situacao'
        ];

        const campos = Object.keys(dados).filter(
            campo => camposPermitidos.includes(campo)
        );

        if (campos.length === 0) {
            return this.buscarPorId(id);
        }

        const atualizacoes = campos.map(
            campo => `${campo} = ?`
        );

        const valores = campos.map(
            campo => dados[campo]
        );

        valores.push(id);

        const sql = `
            UPDATE dragoes
            SET ${atualizacoes.join(', ')}
            WHERE id = ?
        `;

        await connection.query(sql, valores);

        return this.buscarPorId(id);
    }

    async listarDisponiveisParaAdocao() {
        const [dragoes] = await connection.query(
            "SELECT * FROM dragoes WHERE situacao = ?",
            ['Disponível para adoção']
        );

        return dragoes;
    }

    async excluir(id) {
        const [resultado] = await connection.query(
            'DELETE FROM dragoes WHERE id = ?',
            [id]
        );

        return resultado.affectedRows > 0;
    }
}

export default new DragaoService();
