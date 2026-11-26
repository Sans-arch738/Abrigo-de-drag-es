
import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize.js';

// O ID será criado automaticamente pelo Sequelize
const Adotante = sequelize.define('Adotante', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    cpf: {
        type: DataTypes.STRING(14),
        allowNull: false,
        unique: true
    },

    dataNascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false,

        validate: {
            maiorDeIdade(valor) {
                if (!valor) return;

                const partes = valor.split('-');
                const ano = Number(partes[0]);
                const mes = Number(partes[1]);
                const dia = Number(partes[2]);

                const nascimento = new Date(
                    Date.UTC(ano, mes - 1, dia)
                );

                // Verifica se a data é válida
                if (
                    !/^\d{4}-\d{2}-\d{2}$/.test(valor) ||
                    nascimento.getUTCFullYear() !== ano ||
                    nascimento.getUTCMonth() !== mes - 1 ||
                    nascimento.getUTCDate() !== dia
                ) {
                    throw new Error(
                        'Data de nascimento inválida'
                    );
                }

                const hoje = new Date();
                let idade = hoje.getFullYear() - ano;

                // Verifica se já fez aniversário
                if (
                    hoje.getMonth() + 1 < mes ||
                    (
                        hoje.getMonth() + 1 === mes &&
                        hoje.getDate() < dia
                    )
                ) {
                    idade--;
                }

                if (idade < 18) {
                    throw new Error(
                        'O adotante deve ter pelo menos 18 anos'
                    );
                }
            }
        }
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },

    telefone: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
});

export default Adotante;
