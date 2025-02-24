// O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação.
// Aqui você deverá desenvolver a lógica para resolver o problema.

// Lista global para armazenar os amigos
let listaAmigos = [];

function adicionarAmigo() {
    let input = document.getElementById("amigo"); // Obtém o elemento de input pelo ID
    let nomes = input.value.split(","); // Divide os nomes inseridos separados por vírgula
    input.value = ""; // Limpa o campo de input após adicionar os nomes

    nomes.forEach(nome => {
        nome = nome.trim().toUpperCase(); // Remove espaços antes e depois e converte para maiúsculas
        if (nome === "") {
            alert("Por favor, insira um nome antes de adicioná-lo à lista."); // Alerta se o nome estiver em branco
        } else if (!listaAmigos.includes(nome)) { // Verifica se o nome já está na lista para evitar duplicatas
            listaAmigos.push(nome); // Adiciona o nome à lista
        }
    });

    atualizarLista(); // Atualiza a lista na interface
}

function atualizarLista() {
    let ul = document.querySelector(".name-list"); // Obtém a lista no HTML
    ul.innerHTML = ""; // Limpa a lista antes de atualizá-la

    listaAmigos.forEach((amigo) => {
        let li = document.createElement("li"); // Cria um novo item de lista
        li.textContent = amigo; // Define o texto do item como o nome do amigo
        ul.appendChild(li); // Adiciona o item à lista
    });
}

function sortearAmigo() {
    if (listaAmigos.length < 2) { // Verifica se há pelo menos 2 amigos para o sorteio
        alert("Adicione pelo menos 2 amigos para sortear!"); // Exibe um alerta caso contrário
        return;
    }

    let sorteio = embaralhar([...listaAmigos]); // Cria uma cópia da lista e embaralha
    let resultado = [];

    for (let i = 0; i < listaAmigos.length; i++) {
        let amigo = listaAmigos[i];
        let sorteado = sorteio[i];

        // Garante que ninguém tire a si mesmo
        if (amigo == sorteado) {
            return sortearAmigo(); // Se isso acontecer, refaz o sorteio
        }

        resultado.push(`${amigo} => ${sorteado}`); // Armazena o par sorteado
    }

    exibirResultado(resultado); // Exibe o resultado na tela
}

function embaralhar(lista) {
    for (let i = lista.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // Gera um índice aleatório
        [lista[i], lista[j]] = [lista[j], lista[i]]; // Troca os elementos de posição
    }
    return lista; // Retorna a lista embaralhada
}

function exibirResultado(resultado) {
    let ul = document.querySelector(".result-list"); // Obtém a lista de resultados no HTML
    ul.innerHTML = ""; // Limpa a lista antes de exibir o novo resultado

    resultado.forEach((par) => {
        let li = document.createElement("li"); // Cria um novo item de lista
        li.textContent = par; // Define o texto do item como o par sorteado
        ul.appendChild(li); // Adiciona o item à lista de resultados
    });
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    alert('O jogo será reiniciado e os nomes adicionados na lista serão excluídos!'); // Exibe um alerta de aviso
    listaAmigos = []; // Reseta a lista de amigos
    document.querySelector(".name-list").innerHTML = ""; // Limpa a lista de amigos na interface
    document.querySelector(".result-list").innerHTML = ""; // Limpa a lista de resultados na interface
}
