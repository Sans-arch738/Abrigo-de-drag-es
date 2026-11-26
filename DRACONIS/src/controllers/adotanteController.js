
import Adotante from '../models/adotante.js';

// CREATE - Cadastrar um adotante
async function cadastrarAdotante(req, res) {
    try {
        const adotante = await Adotante.create(req.body);

        return res.status(201).json(adotante);

    } catch (erro) {
        return res.status(400).json({
            erro: erro.message
        });
    }
}

// READ - Listar todos os adotantes
async function listarAdotantes(req, res) {
    try {
        const adotantes = await Adotante.findAll();

        return res.status(200).json(adotantes);

    } catch (erro) {
        return res.status(500).json({
            erro: erro.message
        });
    }
}

// READ - Buscar um adotante pelo ID
async function buscarAdotante(req, res) {
    try {
        const adotante = await Adotante.findByPk(req.params.id);

        if (!adotante) {
            return res.status(404).json({
                erro: 'Adotante não encontrado'
            });
        }

        return res.status(200).json(adotante);

    } catch (erro) {
        return res.status(500).json({
            erro: erro.message
        });
    }
}

// UPDATE - Atualizar um adotante
async function atualizarAdotante(req, res) {
    try {
        const adotante = await Adotante.findByPk(req.params.id);

        if (!adotante) {
            return res.status(404).json({
                erro: 'Adotante não encontrado'
            });
        }

        await adotante.update(req.body);

        return res.status(200).json(adotante);

    } catch (erro) {
        return res.status(400).json({
            erro: erro.message
        });
    }
}

// DELETE - Excluir um adotante
async function excluirAdotante(req, res) {
    try {
        const adotante = await Adotante.findByPk(req.params.id);

        if (!adotante) {
            return res.status(404).json({
                erro: 'Adotante não encontrado'
            });
        }

        await adotante.destroy();

        return res.status(200).json({
            mensagem: 'Adotante excluído com sucesso'
        });

    } catch (erro) {
        return res.status(500).json({
            erro: erro.message
        });
    }
}

// Exportar as funções
export {
    cadastrarAdotante,
    listarAdotantes,
    buscarAdotante,
    atualizarAdotante,
    excluirAdotante
};
