"use strict";
let nomeHtml = document.getElementById('nome-cadastro');
let emailHtml = document.getElementById('email-cadastro');
let passwordHtml = document.getElementById('password-cadastro');
let repasswordHtml = document.getElementById('repassword-cadastro');
let formularioCadastro = document.getElementById('formulario-cadastro');
formularioCadastro.addEventListener('submit', (e) => {
    e.preventDefault();
    let retorno = validarCampos();
    if (!retorno) {
        return;
    }
    cadastrarUsuario();
});
function validarCampos() {
    if (passwordHtml.value !== repasswordHtml.value) {
        alert('Preencha os campos corretamente.');
        return false;
    }
    return true;
}
;
function cadastrarUsuario() {
    let listaUsuarios = buscarUsuarioLocalStorage();
    let existe = listaUsuarios.some((usuario) => usuario.email === emailHtml.value);
    if (existe) {
        alert("Já existe e-mail cadastrado na plataforma.");
        return;
    }
    const novoUsuario = {
        nome: nomeHtml.value,
        email: emailHtml.value,
        senha: passwordHtml.value,
        recados: []
    };
    listaUsuarios.push(novoUsuario);
    salvarUsuarioLocalStorage(listaUsuarios);
    alert("Conta criada com sucesso.");
    formularioCadastro.reset();
    window.location.href = 'entrar.html';
}
;
function salvarUsuarioLocalStorage(listaDados) {
    localStorage.setItem('usuarios', JSON.stringify(listaDados));
}
function buscarUsuarioLocalStorage() {
    return JSON.parse(localStorage.getItem('usuarios') || "[]");
}
