let listaAmigos = [];

function adicionarAmigo() {
    let input = document.getElementById("amigo");
    let nomes = input.value.split(",");
    input.value = "";

    nomes.forEach(nome => {
        nome = nome.trim().toUpperCase();
        if (nome == "") {
            alert("Por favor, insira um nome antes de adicioná-lo à lista.");
        } else if (!listaAmigos.includes(nome)) {
            listaAmigos.push(nome);
        }
    });

    atualizarLista();
}

function atualizarLista() {
    let ul = document.querySelector(".name-list");
    ul.innerHTML = "";

    listaAmigos.forEach(amigo => {
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

    let sorteio = embaralhar([...listaAmigos]);
    let resultado = {};

    for (let i = 0; i < listaAmigos.length; i++) {
        let amigo = listaAmigos[i];
        let sorteado = sorteio[i];

        if (amigo === sorteado) {
            return sortearAmigo();
        }

        resultado[amigo] = sorteado;
    }

    perguntarNome(resultado);
}

function embaralhar(lista) {
    for (let i = lista.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [lista[i], lista[j]] = [lista[j], lista[i]];
    }
    return lista;
}

function perguntarNome(resultado) {
    let nome = prompt("Digite seu nome para ver seu amigo secreto:").trim().toUpperCase();
    
    let ulResultado = document.getElementById("resultado");

    console.log(ulResultado)

    ulResultado.innerHTML = "";  // **Limpa qualquer resultado anterior**

    let li = document.createElement("li");

    if (listaAmigos.includes(nome)) {
        li.textContent = `Seu amigo secreto é: ${resultado[nome]}`;
        li.style.color = "green"; // Destaque positivo
    } else {
        li.textContent = "Nome não encontrado na lista. Tente novamente.";
        li.style.color = "red"; // Destaque de erro
    }

    ulResultado.appendChild(li);
}

function reiniciarJogo() {
    alert("O jogo será reiniciado e os nomes adicionados na lista serão excluídos!");
    listaAmigos = [];
    document.querySelector(".name-list").innerHTML = "";
    //document.getElementById("resultado").innerHTML = "";  // **Limpa o resultado ao reiniciar**
}
7