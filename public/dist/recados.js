"use strict";
let id = document.getElementById('id');
let descricao = document.getElementById('descricao');
let detalhamento = document.getElementById('detalhamento');
let tabela = document.getElementById('tabela-recados');
let formularioRecados = document.getElementById('formulario-recados');
let dadosUsuarioLogado;
document.addEventListener('DOMContentLoaded', () => {
    let usuarioLogado = localStorage.getItem('usuarioLogado');
    if (!usuarioLogado) {
        alert("Você precisa estar logado para acessar essa página!");
        window.location.href = 'login.html';
    }
    let listaUsuarios = buscarTodosUsuarios();
    dadosUsuarioLogado = listaUsuarios.find((usuario) => usuario.email === usuarioLogado);
    dadosUsuarioLogado.recados.forEach((recado) => montarHTML(recado));
});
function buscarTodosUsuarios() {
    return JSON.parse(localStorage.getItem('usuarios') || '[]');
}
formularioRecados.addEventListener('submit', (event) => {
    event.preventDefault();
    cadastrarRecados();
});
function cadastrarRecados() {
    const novoRecado = {
        id: `${Math.floor(Math.random() * (1000000000 - 10) + 10)}`,
        descricao: descricao.value,
        detalhamento: detalhamento.value,
    };
    dadosUsuarioLogado.recados.push(novoRecado);
    atualizarDadosUsuarioLogado(dadosUsuarioLogado);
    montarHTML(novoRecado);
    formularioRecados.reset();
}
function atualizarDadosUsuarioLogado(dadosAtualizados) {
    let listaUsuarios = buscarTodosUsuarios();
    let indiceUsuarioEncontrado = listaUsuarios.findIndex((usuario) => usuario.email === dadosAtualizados.email);
    listaUsuarios[indiceUsuarioEncontrado] = dadosAtualizados;
    atualizarStorage(listaUsuarios);
}
function atualizarStorage(listaDados) {
    localStorage.setItem('usuarios', JSON.stringify(listaDados));
}
function montarHTML(novoRecado) {
    let linha = document.createElement('tr');
    linha.classList.add('registro');
    linha.setAttribute('id', novoRecado.id);
    let colunaId = document.createElement('td');
    colunaId.innerHTML = novoRecado.id;
    let colunaDescricao = document.createElement('td');
    colunaDescricao.innerHTML = novoRecado.descricao;
    let colunaDetalhamento = document.createElement('td');
    colunaDetalhamento.innerHTML = novoRecado.detalhamento;
    let colunaAcoes = document.createElement('td');
    let botaoEditar = document.createElement('button');
    botaoEditar.innerHTML = 'Editar';
    botaoEditar.addEventListener('click', () => editarRecado(novoRecado));
    let botaoApagar = document.createElement('button');
    botaoApagar.innerHTML = 'Apagar';
    botaoApagar.addEventListener('click', () => apagarRecado(novoRecado.id));
    colunaAcoes.appendChild(botaoApagar);
    colunaAcoes.appendChild(botaoEditar);
    linha.appendChild(colunaId);
    linha.appendChild(colunaDescricao);
    linha.appendChild(colunaDetalhamento);
    linha.appendChild(colunaAcoes);
    tabela.appendChild(linha);
}
function editarRecado(recado) {
}
function apagarRecado(id) {
    let indiceRecadoEncontrado = dadosUsuarioLogado.recados.findIndex((recado) => recado.id === id);
    let linha = document.getElementById(id);
    let confirma = confirm(`Você deseja realmente excluir o recado ${id}?`);
    if (confirma) {
        linha.remove();
        dadosUsuarioLogado.recados.splice(indiceRecadoEncontrado, 1);
        atualizarDadosUsuarioLogado(dadosUsuarioLogado);
    }
    else {
        alert("Operação Cancelada!");
    }
}
function sairDaPagina() {
    window.location.href = 'entrar01.html';
}
