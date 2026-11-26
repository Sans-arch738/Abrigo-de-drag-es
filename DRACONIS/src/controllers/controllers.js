import dragaoService from '../service/service.js';

class DragaoController {

    async cadastrar(req, res) {
        try {
            const dados = req.body;

            const erros = dragaoService.validarDados(dados);

            if (erros.length > 0) {
                return res.status(400).json({
                    mensagem: 'Erro ao cadastrar dragão.',
                    erros
                });
            }

            const novoDragao = await dragaoService.cadastrar(dados);

            return res.status(201).json({
                mensagem: 'Dragão cadastrado com sucesso!',
                dragao: novoDragao
            });

        } catch (erro) {
            return res.status(500).json({
                mensagem: 'Erro ao cadastrar dragão.',
                erro: erro.message
            });
        }
    }

    async listar(req, res) {
        try {
            const filtros = req.query;
            const dragoes = await dragaoService.listar(filtros);

            return res.status(200).json(dragoes);

        } catch (erro) {
            return res.status(500).json({
                mensagem: 'Erro ao listar dragões.',
                erro: erro.message
            });
        }
    }

    async buscarPorId(req, res) {
        try {
            const id = req.params.id;
            const dragao = await dragaoService.buscarPorId(id);

            if (!dragao) {
                return res.status(404).json({
                    mensagem: 'Dragão não encontrado.'
                });
            }

            return res.status(200).json(dragao);

        } catch (erro) {
            return res.status(500).json({
                mensagem: 'Erro ao buscar dragão.',
                erro: erro.message
            });
        }
    }

    async buscarPorNome(req, res) {
        try {
            const nome = req.query.nome;

            if (!nome || nome.trim() === '') {
                return res.status(400).json({
                    mensagem: 'Informe um nome para realizar a busca.'
                });
            }

            const dragoes = await dragaoService.buscarPorNome(nome);

            if (dragoes.length === 0) {
                return res.status(404).json({
                    mensagem: 'Nenhum dragão encontrado com esse nome.'
                });
            }

            return res.status(200).json(dragoes);

        } catch (erro) {
            return res.status(500).json({
                mensagem: 'Erro ao buscar dragão pelo nome.',
                erro: erro.message
            });
        }
    }

    async editar(req, res) {
        try {
            const id = req.params.id;
            const dados = req.body;

            const erros = dragaoService.validarDados(dados, true);

            if (erros.length > 0) {
                return res.status(400).json({
                    mensagem: 'Erro ao atualizar dragão.',
                    erros
                });
            }

            const dragaoAtualizado = await dragaoService.editar(id, dados);

            if (!dragaoAtualizado) {
                return res.status(404).json({
                    mensagem: 'Dragão não encontrado.'
                });
            }

            return res.status(200).json({
                mensagem: 'Dragão atualizado com sucesso!',
                dragao: dragaoAtualizado
            });

        } catch (erro) {
            return res.status(500).json({
                mensagem: 'Erro ao atualizar dragão.',
                erro: erro.message
            });
        }
    }

    async listarDisponiveisParaAdocao(req, res) {
        try {
            const dragoes = await dragaoService.listarDisponiveisParaAdocao();

            return res.status(200).json(dragoes);

        } catch (erro) {
            return res.status(500).json({
                mensagem: 'Erro ao listar dragões disponíveis para adoção.',
                erro: erro.message
            });
        }
    }

    async excluir(req, res) {
        try {
            const id = req.params.id;
            const excluido = await dragaoService.excluir(id);

            if (!excluido) {
                return res.status(404).json({
                    mensagem: 'Dragão não encontrado.'
                });
            }

            return res.status(200).json({
                mensagem: 'Dragão excluído com sucesso!'
            });

        } catch (erro) {
            return res.status(500).json({
                mensagem: 'Erro ao excluir dragão.',
                erro: erro.message
            });
        }
    }
}

export default new DragaoController();
