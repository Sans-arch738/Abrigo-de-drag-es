import connection from './connection.js';

async function testarConexao() {
    try {
        const [resultado] = await connection.query(
            'SELECT NOW() AS dataHora'
        );

        console.log('Conexão com MySQL realizada com sucesso!');
        console.log('Data e hora do banco:', resultado[0].dataHora);

    } catch (erro) {
        console.error('Erro ao conectar com MySQL:', erro.message);

    } finally {
        await connection.end();
    }
}

testarConexao();
