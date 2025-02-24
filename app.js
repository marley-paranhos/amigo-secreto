// O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação.
// Aqui você deverá desenvolver a lógica para resolver o problema.

// Lista global para armazenar os amigos
let listaAmigos = [];

function adicionarAmigo() {
    let input = document.getElementById("amigo");
    let nomes = input.value.split(","); // Divide pelos nomes separados por vírgula
    input.value = ""; // Limpa o campo após adicionar

    nomes.forEach(nome => {
        nome = nome.trim().toUpperCase(); // Remove espaços antes e depois
        if (nome === "") {
            alert("É necessário digitar um nome para inseri-lo na lista!"); // Alerta se o nome estiver em branco
        } else if (!listaAmigos.includes(nome)) {
            listaAmigos.push(nome);
        }
    });

    atualizarLista();
}

function atualizarLista() {
    let ul = document.querySelector(".name-list");
    ul.innerHTML = ""; // Limpa a lista antes de atualizar

    listaAmigos.forEach((amigo) => {
        let li = document.createElement("li");
        li.textContent = amigo;
        ul.appendChild(li);
    });
}

function sortearAmigo() {
    if (listaAmigos.length < 2) {
        alert("Adicione pelo menos 2 amigos para sortear!");
        return;
    }

    let sorteio = embaralhar([...listaAmigos]); // Copia e embaralha a lista
    let resultado = [];

    for (let i = 0; i < listaAmigos.length; i++) {
        let amigo = listaAmigos[i];
        let sorteado = sorteio[i];

        // Garante que ninguém tire a si mesmo
        if (amigo == sorteado) {
            return sortearAmigo(); // Se der erro, refaz o sorteio
        }

        resultado.push(`${amigo} => ${sorteado}`);
    }

    exibirResultado(resultado);
}

function embaralhar(lista) {
    for (let i = lista.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [lista[i], lista[j]] = [lista[j], lista[i]];
    }
    return lista;
}

function exibirResultado(resultado) {
    let ul = document.querySelector(".result-list");
    ul.innerHTML = ""; // Limpa a lista antes de exibir

    resultado.forEach((par) => {
        let li = document.createElement("li");
        li.textContent = par;
        ul.appendChild(li);
    });
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    alert('O jogo será reiniciado e os nomes adicionados na lista serão excluídos!')
    listaAmigos = []; // Reseta a lista
    document.querySelector(".name-list").innerHTML = "";
    document.querySelector(".result-list").innerHTML = "";
}

