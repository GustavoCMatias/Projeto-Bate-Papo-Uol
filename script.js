let nome;
Botarnome();

function Botarnome() {
    nome = prompt("Qual o seu nome?");
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', { name: nome })
    promessa.catch(Botarnome);
    setInterval(ManterConexao, 4500);
}

function ManterConexao() {
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', { name: nome })
    promessa.then(bom);
}


