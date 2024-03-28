const paises = [
    { nome: "argentina", dicas: ["Latino", "Dança", "Carne", "Futebol", "Inicial - A"] },
    { nome: "uruguai", dicas: ["Latino", "Cassino", "Vinhos", "Chimarrão", "Inicial - U"] },
    { nome: "peru", dicas: ["Ex-Colonia", "Codilheiras", "Machu Picchu", "Capital - Lhamas", "Inicial - P"] },
    { nome: "mexico", dicas: ["Latino", "Asteca", "Tourada", "Cactos", "Inicial - M"] },
    { nome: "cuba", dicas: ["Arquipélogo", "Charutos", "Carros antigos", "Embargos econômicos", "Inicial - C"] },
    { nome: "honduras", dicas: ["Latino", "Maias", "Punta", "Capital - Tegucigalpa", "Incial - H"] },
    { nome: "vaticano", dicas: ["Europeu", "Basílica", "Religioso", "Menor País", "Inicial - V"] },
    { nome: "grecia", dicas: ["Europeu", "mitologia", "Filósofos", "Ruínas", "Inicial - G"] },
    { nome: "servia", dicas: ["Europeu", "Kolo", "Cultura Slava", "Kosovo", "Inicial - S"] },
    { nome: "senegal", dicas: ["Africano", "Terrorismo", "Savanas", "língua - francês", "Inicial - S"] },
    { nome: "marrocos", dicas: ["Africano", "Mar mediterrâneo", "Árabes", "Mosaico", "Inicial - M"] },
    { nome: "egito", dicas: ["Africano", "País Mulçumano", "País Antigo", "Deserto", "Inicial - I"] },
    { nome: "india", dicas: ["Ásia", "Grande população", "Temperos", "Templos", "Inicial - I"] },
    { nome: "russia", dicas: ["Diversos Fusos", "Grandes Palácios", "Frio Extremo", "Sede de Copa", "Incial - R"] },
    { nome: "ira", dicas: ["Ásia", "Islâmismo", "Antiga Persia", "Oriente médio", "Inicial - I"] },
    { nome: "australia", dicas: ["Oceania", "Barreira de Corais", "Animais exóticos", "Chris Hemsworth", "Inicial - A"] },
    { nome: "nova zelandia", dicas: ["Oceania", "Haka", "Rúgbi", "Auckland", "Incial - N"] }
];

let palpite;
let tentativas = 0;
let paisSelecionado;
let chutes = [];
let dicaAtual = 0;
let ganhadores = [];

const gerarPaisAleatorio = () => {
    const indiceAleatorio = Math.floor(Math.random() * paises.length);
    paisSelecionado = paises[indiceAleatorio];
};

const verificarPalpite = () => {
    const palpiteFormatado = palpite.trim().toLowerCase();
    if (palpiteFormatado === paisSelecionado.nome) {
        const nomeJogador = document.getElementById('nomeJogador').value;
        const tentativasAcerto = tentativas + 1; 
        setTimeout(() => {
        alert(`Parabéns, ${nomeJogador}! Você acertou o país em ${tentativasAcerto} tentativas.`);
        }, 100);
        adicionarGanhador(nomeJogador, tentativasAcerto);
        reiniciarJogo();
    } else {
        tentativas++;
        chutes.push(palpiteFormatado);
        exibirChutes();
        if (tentativas < 5) {
            dicaAtual++;
            exibirDica();
        } else {
            setTimeout(() => {
                alert("Você atingiu o máximo de tentativas. O país era " + paisSelecionado.nome);
                reiniciarJogo();
            }, 100); 
        }
    }
};


const exibirChutes = () => {
    document.getElementById('chutes').innerText = chutes.join(', ');
};

const exibirDica = () => {
    const dicaAtualTexto = paisSelecionado.dicas.slice(0, dicaAtual + 1).join(', ');
    document.getElementById('dica').innerText = "Dicas: " + dicaAtualTexto;
};

const exibirResultado = (mensagem) => {
    document.getElementById('resultado').innerText = mensagem;
};

const adicionarGanhador = (nome, tentativasAcerto) => {
    ganhadores.push({ nome, tentativas: tentativasAcerto });
    exibirRanking();
};

const exibirRanking = () => {
    const ranking = document.getElementById('ganhadores');
    ranking.innerHTML = '<h2>Ranking de Ganhadores</h2>';
    ganhadores.sort((a, b) => a.tentativas - b.tentativas); // Ordena os ganhadores pelo número de tentativas
    ganhadores.forEach((ganhador, index) => {
        ranking.innerHTML += `<p>${index + 1}. ${ganhador.nome} - Tentativas: ${ganhador.tentativas}</p>`;
    });
};

const reiniciarJogo = () => {
    gerarPaisAleatorio();
    tentativas = 0;
    dicaAtual = 0;
    chutes = [];
    exibirChutes();
    exibirDica();
    exibirResultado('');
    document.getElementById('nomeJogador').value = ''; // Limpa o input do nome do jogador
};

document.getElementById('gerenciador').addEventListener('submit', function (event) {
    event.preventDefault();
    palpite = document.getElementById('valor').value;
    verificarPalpite();
});

window.onload = function () {
    gerarPaisAleatorio();
    exibirDica();
    exibirRanking();
};


//INTEGRANTES: Lethicia, Raquel, Maria Eduarda Xavier, Gabriel de Melo, Tomás, Moisés Corrêa, Erik, João
               