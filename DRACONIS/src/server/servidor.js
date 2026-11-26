import express from 'express';
import dragaoRoutes from '../routes/rotas.js';
import serverConfig from '../config/config.js';

const app = express();

app.use(express.json());

app.use('/api', dragaoRoutes);

app.listen(serverConfig.port, () => {
    console.log(
        `Servidor Draconis rodando na porta ${serverConfig.port}`
    );
});
