// Lista para armazenar os amigos adicionados (para manipulação no frontend)
let listaDeAmigos = [];

// Função para adicionar um amigo
async function adicionarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nome = inputAmigo.value.trim();
    
    if (nome === '') {
        alert('Por favor, digite um nome válido!');
        return;
    }
    
    try {
        const response = await fetch('/api/amigos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome: nome })
        });
        
        if (!response.ok) {
            throw new Error('Erro ao adicionar amigo');
        }
        
        const amigo = await response.json();
        
        // Adiciona à lista local para exibição imediata
        listaDeAmigos.push(amigo);
        
        // Limpa o campo de entrada
        inputAmigo.value = '';
        
        // Atualiza a lista exibida
        atualizarListaExibida();
        
        // Limpa o resultado anterior do sorteio, se houver
        document.getElementById('resultado').innerHTML = '';
    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao adicionar o amigo. Por favor, tente novamente.');
    }
}

// Função para atualizar a lista exibida na página
function atualizarListaExibida() {
    const listaElement = document.getElementById('listaAmigos');
    listaElement.innerHTML = '';
    
    listaDeAmigos.forEach(amigo => {
        const li = document.createElement('li');
        li.textContent = amigo.nome;
        listaElement.appendChild(li);
    });
}

// Função para buscar a lista completa do backend
async function buscarAmigos() {
    try {
        const response = await fetch('/api/amigos');
        
        if (!response.ok) {
            throw new Error('Erro ao buscar amigos');
        }
        
        listaDeAmigos = await response.json();
        atualizarListaExibida();
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Função para sortear um amigo
async function sortearAmigo() {
    if (listaDeAmigos.length === 0) {
        alert('Adicione pelo menos um amigo antes de sortear!');
        return;
    }
    
    try {
        const response = await fetch('/api/amigos/sortear');
        
        if (!response.ok) {
            throw new Error('Erro ao sortear amigo');
        }
        
        const amigoSorteado = await response.json();
        
        // Exibe o resultado
        const resultadoElement = document.getElementById('resultado');
        resultadoElement.innerHTML = '';
        
        const li = document.createElement('li');
        li.textContent = `🎉 ${amigoSorteado.nome} foi sorteado! 🎉`;
        resultadoElement.appendChild(li);
    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao sortear o amigo. Por favor, tente novamente.');
    }
}

// Carrega a lista de amigos quando a página é carregada
document.addEventListener('DOMContentLoaded', buscarAmigos);