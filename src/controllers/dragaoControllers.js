
import dragaoService from '../services/dragaoService.js';

class DragaoController {

    cadastrar(req, res) {
        const dados = req.body;

        const erros = dragaoService.validarDados(dados);

        if (erros.length > 0) {
            return res.status(400).json({
                mensagem: 'Erro ao cadastrar dragão.',
                erros
            });
        }

        const novoDragao = dragaoService.cadastrar(dados);

        return res.status(201).json({
            mensagem: 'Dragão cadastrado com sucesso!',
            dragao: novoDragao
        });
    }

    listar(req, res) {
        const filtros = req.query;

        const dragoes = dragaoService.listar(filtros);

        return res.status(200).json(dragoes);
    }

    buscarPorId(req, res) {
        const id = req.params.id;

        const dragao = dragaoService.buscarPorId(id);

        if (!dragao) {
            return res.status(404).json({
                mensagem: 'Dragão não encontrado.'
            });
        }

        return res.status(200).json(dragao);
    }

    buscarPorNome(req, res) {
        const nome = req.query.nome;

        if (!nome || nome.trim() === '') {
            return res.status(400).json({
                mensagem: 'Informe um nome para realizar a busca.'
            });
        }

        const dragoes = dragaoService.buscarPorNome(nome);

        if (dragoes.length === 0) {
            return res.status(404).json({
                mensagem: 'Nenhum dragão encontrado com esse nome.'
            });
        }

        return res.status(200).json(dragoes);
    }

    editar(req, res) {
        const id = req.params.id;
        const dados = req.body;

        const dragaoExistente = dragaoService.buscarPorId(id);

        if (!dragaoExistente) {
            return res.status(404).json({
                mensagem: 'Dragão não encontrado.'
            });
        }

        const erros = dragaoService.validarDados(dados, true);

        if (erros.length > 0) {
            return res.status(400).json({
                mensagem: 'Erro ao atualizar dragão.',
                erros
            });
        }

        const dragaoAtualizado = dragaoService.editar(id, dados);

        return res.status(200).json({
            mensagem: 'Dragão atualizado com sucesso!',
            dragao: dragaoAtualizado
        });
    }

    listarDisponiveisParaAdocao(req, res) {
        const dragoes = dragaoService.listarDisponiveisParaAdocao();

        return res.status(200).json(dragoes);
    }

    excluir(req, res) {
        const id = req.params.id;

        const excluido = dragaoService.excluir(id);

        if (!excluido) {
            return res.status(404).json({
                mensagem: 'Dragão não encontrado.'
            });
        }

        return res.status(200).json({
            mensagem: 'Dragão excluído com sucesso!'
        });
    }
}

export default new DragaoController();
