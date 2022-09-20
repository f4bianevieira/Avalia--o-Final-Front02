"use strict";
let emailLogin = document.getElementById('email-login');
let passwordLogin = document.getElementById('password-login');
let formularioLogin = document.getElementById('formulario-login');
formularioLogin.addEventListener('submit', (event) => {
    event.preventDefault();
    logar();
});
function logar() {
    let usuarios = buscarUsuarios();
    let usuarioEncontrado = usuarios.find((usuario) => usuario.email === emailLogin.value && usuario.senha === passwordLogin.value);
    if (!usuarioEncontrado) {
        alert("E-mail ou password incorretas! Verifique e tente novamente!");
        formularioLogin.reset();
        return;
    }
    localStorage.setItem('usuarioLogado', usuarioEncontrado.email);
    window.location.href = 'recados1.html';
}
function buscarUsuarios() {
    return JSON.parse(localStorage.getItem('usuarios') || '[]');
}
