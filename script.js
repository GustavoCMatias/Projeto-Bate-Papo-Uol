let nome;
Botarnome();

function Botarnome() {
    nome = prompt("Qual o seu nome?");
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', { name: nome })
    promessa.catch(Botarnome);
    promessa.then(PuxarMensagens);
    setInterval(ManterConexao, 4500);
}

function PuxarMensagens() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    promessa.then(CarregarMensagens)
}

function CarregarMensagens(resposta) {
    const elemento = document.querySelector(".corpo");

    for (let i = 0; i < resposta.data.length; i++) {
        const dados = resposta.data[i];
        if (dados.type == 'status') {
            elemento.innerHTML += `
        <div class="mensagem ${dados.type}">
        <div>
            <span>(${dados.time})</span> <span> ${dados.from} </span> <span>${dados.text}</span>
        </div>
        </div>`
        } else if (dados.type == 'message') {
            console.log('aqui', dados.type)
            elemento.innerHTML += `
        <div class="mensagem ${dados.type}">
        <div>
            <span>(${dados.time})</span> <span> ${dados.from} </span><span>para</span><span> ${dados.to} </span> <span>${dados.text}</span>
        </div>
        </div>`
        } else if (dados.to == nome) {
            console.log('aqui', dados.type)
            elemento.innerHTML += `
        <div class="mensagem ${dados.type}">
        <div>
            <span>(${dados.time})</span> <span> ${dados.from} </span><span>reservadamente para</span><span> ${nome} </span> <span>${dados.text}</span>
        </div>
        </div>`
        }
    }
}

function ManterConexao() {
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', { name: nome })
}


