let nome;
Botarnome();
let last_message, last_name;

function Botarnome() {
    nome = prompt("Qual o seu nome?");
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', { name: nome })
    promessa.catch(Botarnome);
    promessa.then(PrimeiroPuxarMensagens);
    setInterval(ManterConexao, 4500);
}

function CarregarMensagens(elemento, dados) {
    if (dados.type == 'status') {
        elemento.innerHTML += `
    <div class="mensagem ${dados.type}">
    <div>
        <span>(${dados.time})</span> <span> ${dados.from} </span> <span>${dados.text}</span>
    </div>
    </div>`
    } else if (dados.type == 'message') {
        elemento.innerHTML += `
    <div class="mensagem ${dados.type}">
    <div>
        <span>(${dados.time})</span> <span> ${dados.from} </span><span>para</span><span> ${dados.to}: </span> <span>${dados.text}</span>
    </div>
    </div>`
    } else if (dados.to == nome) {
        elemento.innerHTML += `
    <div class="mensagem ${dados.type}">
    <div>
        <span>(${dados.time})</span> <span> ${dados.from} </span><span>reservadamente para</span><span> ${nome}: </span> <span>${dados.text}</span>
    </div>
    </div>`
    }
}

function PrimeiroPuxarMensagens() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    promessa.then(PrimeiroCarregarMensagens)
}

function PrimeiroCarregarMensagens(resposta) {
    const elemento = document.querySelector(".corpo");
    last_message = resposta.data[resposta.data.length - 1].time;
    last_name = resposta.data[resposta.data.length - 1].from;
    for (let i = 0; i < resposta.data.length; i++) {
        const dados = resposta.data[i];
        CarregarMensagens(elemento, dados);
    }
    setInterval(OutrosPuxarMensagens, 3000)
}

function OutrosPuxarMensagens() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    promessa.then(OutrosCarregarMensagens)
}

function OutrosCarregarMensagens(resposta) {
    const elemento = document.querySelector(".corpo");
    let idx_ultimo = resposta.data.findIndex((dado) => dado.from === last_name && dado.time === last_message)
    console.log(idx_ultimo);
    if (idx_ultimo === resposta.data.length - 1) {
        return idx_ultimo;
    } else if (idx_ultimo == -1) {
        idx_ultimo = 0;
    }
    for (let i = idx_ultimo + 1; i < resposta.data.length; i++) {
        const dados = resposta.data[i];
        CarregarMensagens(elemento, dados);
    }
    const new_message = document.querySelectorAll(".mensagem");
    new_message[new_message.length - 1].scrollIntoView();
    last_message = resposta.data[resposta.data.length - 1].time;
    last_name = resposta.data[resposta.data.length - 1].from;
}
function ManterConexao() {
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', { name: nome })
}

function MandarMensagem() {
    const elemento = document.querySelector(".input-box");
}


