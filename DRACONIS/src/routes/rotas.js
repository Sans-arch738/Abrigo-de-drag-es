import express from 'express';
import dragaoController from '../controllers/dragaoControllers.js';

const router = express.Router();

router.post('/dragoes', (req, res) =>
    dragaoController.cadastrar(req, res)
);

router.get('/dragoes', (req, res) =>
    dragaoController.listar(req, res)
);

router.get('/dragoes/buscar', (req, res) =>
    dragaoController.buscarPorNome(req, res)
);

router.get('/dragoes/adocao', (req, res) =>
    dragaoController.listarDisponiveisParaAdocao(req, res)
);

router.get('/dragoes/:id', (req, res) =>
    dragaoController.buscarPorId(req, res)
);

router.put('/dragoes/:id', (req, res) =>
    dragaoController.editar(req, res)
);

router.delete('/dragoes/:id', (req, res) =>
    dragaoController.excluir(req, res)
);

export default router;
