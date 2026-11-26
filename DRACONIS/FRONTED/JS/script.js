// Endereço da API Draconis
const API = 'http://localhost:3000/api';

// ======================================
// NAVEGAÇÃO ENTRE AS SEÇÕES
// ======================================

function mostrarSecao(secao) {
    const secoes = document.querySelectorAll('main section');

    secoes.forEach(elemento => {
        elemento.hidden = true;
    });

    document.getElementById(secao).hidden = false;

    if (secao === 'lista') {
        listarDragoes();
    }

    if (secao === 'adocao') {
        listarAdocao();
    }
}

// ======================================
// CADASTRAR DRAGÃO
// ======================================

const formulario = document.getElementById('formCadastro');

formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const dragao = {
        nome: document.getElementById('nome').value,
        especie: document.getElementById('especie').value,
        porte: document.getElementById('porte').value,
        sexo: document.getElementById('sexo').value,
        idadeEstimada: Number(document.getElementById('idadeEstimada').value),
        dataResgate: document.getElementById('dataResgate').value,
        dadosResgate: document.getElementById('dadosResgate').value,
        situacao: document.getElementById('situacao').value
    };

    try {
        const resposta = await fetch(`${API}/dragoes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dragao)
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            alert(resultado.erros?.join('\n') || resultado.mensagem);
            return;
        }

        alert('Dragão cadastrado com sucesso!');

        formulario.reset();

    } catch (erro) {
        alert('Não foi possível conectar ao servidor Draconis.');
        console.error(erro);
    }
});

// ======================================
// LISTAR TODOS OS DRAGÕES
// ======================================


function listarDragoes() {
    const lista = document.getElementById('listaDragoes');

    const dragoes = [
        {
            nome: 'Ignis',
            especie: 'Ignis',
            porte: 'Grande',
            sexo: 'Macho',
            idadeEstimada: 120,
            situacao: 'Em tratamento'
        },
        {
            nome: 'Luna',
            especie: 'Noctis',
            porte: 'Pequeno',
            sexo: 'Fêmea',
            idadeEstimada: 45,
            situacao: 'Disponível para adoção'
        },
        {
            nome: 'Aqua',
            especie: 'Aquaris',
            porte: 'Médio',
            sexo: 'Fêmea',
            idadeEstimada: 80,
            situacao: 'Disponível para adoção'
        },
        {
            nome: 'Frost',
            especie: 'Glacius',
            porte: 'Grande',
            sexo: 'Macho',
            idadeEstimada: 200,
            situacao: 'Adotado'
        }
    ];

    lista.innerHTML = '';

    dragoes.forEach(dragao => {
        const item = document.createElement('div');
        item.classList.add('cartao-dragao');

        item.innerHTML = `
            <h3>🐉 ${dragao.nome}</h3>
            <p><strong>Espécie:</strong> ${dragao.especie}</p>
            <p><strong>Porte:</strong> ${dragao.porte}</p>
            <p><strong>Sexo:</strong> ${dragao.sexo}</p>
            <p><strong>Idade:</strong> ${dragao.idadeEstimada} anos</p>
            <p><strong>Situação:</strong> ${dragao.situacao}</p>
            <hr>
        `;

        lista.appendChild(item);
    });
}


// ======================================
// LISTAR DRAGÕES PARA ADOÇÃO
// ======================================


function listarAdocao() {
    const lista = document.getElementById('listaAdocao');

    const dragoes = [
        {
            nome: 'Luna',
            especie: 'Noctis',
            porte: 'Pequeno',
            idadeEstimada: 45
        },
        {
            nome: 'Aqua',
            especie: 'Aquaris',
            porte: 'Médio',
            idadeEstimada: 80
        }
    ];

    lista.innerHTML = '';

    dragoes.forEach(dragao => {
        const item = document.createElement('div');
        item.classList.add('cartao-dragao');

        item.innerHTML = `
            <h3>🐉 ${dragao.nome}</h3>
            <p><strong>Espécie:</strong> ${dragao.especie}</p>
            <p><strong>Porte:</strong> ${dragao.porte}</p>
            <p><strong>Idade:</strong> ${dragao.idadeEstimada} anos</p>
            <p class="status-adocao">Disponível para adoção</p>
            <hr>
            <button onclick="alert('Entre em contato com o santuário para saber mais sobre ${dragao.nome}!')">
                Tenho interesse
            </button>
        `;

        lista.appendChild(item);
    });
}


// Exibe a página inicial ao abrir o sistema
mostrarSecao('inicio');
