import dragaoService from '../services/dragaoService.js';

class DragaoController {

    cadastrar(req, res) {
        const novoDragao = dragaoService.cadastrar(req.body);

        return res.status(201).json(novoDragao);
    }

    listar(req, res) {
        const dragoes = dragaoService.listar();

        return res.status(200).json(dragoes);
    }

    buscarPorId(req, res) {
        const dragao = dragaoService.buscarPorId(req.params.id);

        if (!dragao) {
            return res.status(404).json({
                mensagem: 'Dragão não encontrado.'
            });
        }

        return res.status(200).json(dragao);
    }

    excluir(req, res) {
        const excluido = dragaoService.excluir(req.params.id);

        if (!excluido) {
            return res.status(404).json({
                mensagem: 'Dragão não encontrado.'
            });
        }

        return res.status(200).json({
            mensagem: 'Dragão excluído com sucesso.'
        });
    }
}

export default new DragaoController();
