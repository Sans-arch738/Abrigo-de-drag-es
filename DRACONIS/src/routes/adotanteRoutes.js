
import express from 'express';

import {
    cadastrarAdotante,
    listarAdotantes,
    buscarAdotante,
    atualizarAdotante,
    excluirAdotante
} from '../controllers/adotanteController.js';

const router = express.Router();

router.post('/', cadastrarAdotante);
router.get('/', listarAdotantes);
router.get('/:id', buscarAdotante);
router.put('/:id', atualizarAdotante);
router.patch('/:id', atualizarAdotante);
router.delete('/:id', excluirAdotante);

export default router;