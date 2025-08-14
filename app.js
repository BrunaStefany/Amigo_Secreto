let amigos = [];
let poolSorteio = [];   // Nomes ainda não sorteados
let historico = [];     // Ordem dos sorteados

// Adiciona um nome (máximo 4)
function adicionarAmigo() {
    const amigoInput = document.getElementById('amigo');
    const nomeAmigo = amigoInput.value.trim();

    if (nomeAmigo === '') {
        alert("Por favor, digite o nome do seu amigo.");
        return;
    }
    if (/\d/.test(nomeAmigo)) {
        alert("O nome não pode conter números. Digite um nome válido.");
        amigoInput.value = '';
        amigoInput.focus();
        return;
    }
    if (amigos.map(a => a.toLowerCase()).includes(nomeAmigo.toLowerCase())) {
        alert("Este nome já foi adicionado! Insira um nome diferente.");
        amigoInput.value = '';
        return;
    }
    if (amigos.length >= 4) {
        alert("Este sorteio é para 4 nomes. Remova alguém ou reinicie.");
        return;
    }

    amigos.push(nomeAmigo);
    atualizarListaAmigos();

    // Se a lista mudou, reseta qualquer sorteio em andamento
    poolSorteio = [];
    historico = [];
    document.getElementById('resultado').innerHTML = '';
    const btn = document.getElementById('btnSortear');
    if (btn) { btn.disabled = false; btn.textContent = 'Sortear'; }

    amigoInput.value = '';
    amigoInput.focus();
}

// Sorteia um nome por clique, sem repetir
function sortearAmigo() {
    if (amigos.length < 4) {
        alert("Você precisa ter exatamente 4 nomes para sortear.");
        return;
    }

    // Inicializa a pool no primeiro clique
    if (poolSorteio.length === 0 && historico.length === 0) {
        poolSorteio = [...amigos]; // cópia da lista original
    }

    if (poolSorteio.length === 0) {
        // já acabou
        const btn = document.getElementById('btnSortear');
        if (btn) { btn.disabled = true; btn.textContent = 'Fim do sorteio'; }
        return;
    }

    const i = Math.floor(Math.random() * poolSorteio.length);
    const nomeSorteado = poolSorteio.splice(i, 1)[0]; // remove para não repetir
    historico.push(nomeSorteado);

    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `
        <p><strong>Sorteado:</strong> ${nomeSorteado}</p>
        <p>Restantes: ${poolSorteio.length}</p>
        <p><strong>Ordem dos sorteados:</strong></p>
        <ul>${historico.map(n => `<li>${n}</li>`).join('')}</ul>
    `;

    if (poolSorteio.length === 0) {
        const btn = document.getElementById('btnSortear');
        if (btn) { btn.disabled = true; btn.textContent = 'Fim do sorteio'; }
    }
}

// Atualiza a lista visível
function atualizarListaAmigos() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = amigos.map(a => `<li>${a}</li>`).join('');
}

// Embaralhar (se quiser usar em alguma variação)
function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Reinicia tudo
function reiniciar() {
    amigos = [];
    poolSorteio = [];
    historico = [];
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
    const btn = document.getElementById('btnSortear');
    if (btn) { btn.disabled = false; btn.textContent = 'Sortear'; }
    document.getElementById('amigo').focus();
}