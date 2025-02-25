// Lista para armazenar os nomes dos amigos que participarão do sorteio
let listaAmigos = [];

/**
 * Adiciona amigos à lista com base no input do usuário.
 * Aceita múltiplos nomes separados por vírgula.
 */
function adicionarAmigo() {
    let input = document.getElementById("amigo"); // Obtém o campo de input
    let nomes = input.value.split(","); // Separa os nomes por vírgula
    input.value = ""; // Limpa o campo após a entrada

    nomes.forEach(nome => {
        nome = nome.trim().toUpperCase(); // Remove espaços extras e padroniza para maiúsculas
        if (nome == "") {
            alert("Por favor, insira um nome antes de adicioná-lo à lista.");
        } else if (!listaAmigos.includes(nome)) { // Verifica se o nome já está na lista
            listaAmigos.push(nome); // Adiciona à lista
        }
    });

    atualizarLista(); // Atualiza a exibição da lista na tela
}

/**
 * Atualiza a lista de amigos na interface.
 */
function atualizarLista() {
    let ul = document.querySelector(".name-list"); // Obtém a lista na interface
    ul.innerHTML = ""; // Limpa a lista antes de atualizar

    listaAmigos.forEach(amigo => {
        let li = document.createElement("li"); // Cria um novo item da lista
        li.textContent = amigo; // Define o texto do item como o nome do amigo
        ul.appendChild(li); // Adiciona o item à lista na tela
    });
}

/**
 * Realiza o sorteio de amigo secreto.
 */
function sortearAmigo() {
    if (listaAmigos.length < 2) { // Verifica se há pelo menos dois participantes
        alert("Adicione pelo menos 2 amigos para sortear!");
        return;
    }

    let sorteio = embaralhar([...listaAmigos]); // Cria uma cópia embaralhada da lista
    let resultado = {}; // Objeto para armazenar os pares sorteados

    for (let i = 0; i < listaAmigos.length; i++) {
        let amigo = listaAmigos[i]; // Pega o amigo da posição atual
        let sorteado = sorteio[i]; // Pega o correspondente na lista embaralhada

        if (amigo === sorteado) { // Se alguém tirar a si mesmo, refaz o sorteio
            return sortearAmigo();
        }

        resultado[amigo] = sorteado; // Armazena a relação no objeto resultado
    }

    perguntarNome(resultado); // Pergunta ao usuário o nome para revelar o amigo secreto
}

/**
 * Embaralha uma lista usando o algoritmo de Fisher-Yates.
 */
function embaralhar(lista) {
    for (let i = lista.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // Sorteia um índice aleatório
        [lista[i], lista[j]] = [lista[j], lista[i]]; // Troca os elementos de posição
    }
    return lista; // Retorna a lista embaralhada
}

/**
 * Pergunta o nome do usuário e revela seu amigo secreto.
 */
function perguntarNome(resultado) {
    let nome = prompt("Digite seu nome para ver seu amigo secreto:").trim().toUpperCase();
    
    let ulResultado = document.getElementById("resultado"); // Obtém a área de exibição do resultado

    ulResultado.innerHTML = "";  // Limpa qualquer resultado anterior

    let li = document.createElement("li");

    if (listaAmigos.includes(nome)) { // Verifica se o nome informado está na lista de amigos
        li.textContent = `Seu amigo secreto é: ${resultado[nome]}`; // Exibe o resultado
        li.style.color = "green"; // Aplica cor verde para destacar positivamente
    } else {
        li.textContent = "Nome não encontrado na lista. Tente novamente."; // Mensagem de erro
        li.style.color = "red"; // Aplica cor vermelha para destacar o erro
    }

    ulResultado.appendChild(li); // Adiciona o resultado na tela
}

/**
 * Reinicia o jogo, limpando a lista de amigos e os resultados.
 */
function reiniciarJogo() {
    alert("O jogo será reiniciado e os nomes adicionados na lista serão excluídos!");
    listaAmigos = []; // Zera a lista de amigos
    document.querySelector(".name-list").innerHTML = ""; // Limpa a exibição da lista
    document.getElementById("resultado").innerHTML = ""; // Limpa o resultado na interface
}
