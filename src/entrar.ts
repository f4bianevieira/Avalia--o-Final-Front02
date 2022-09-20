let emailLogin = document.getElementById('email-login') as HTMLInputElement;
let passwordLogin = document.getElementById('password-login') as HTMLInputElement;

let formularioLogin = document.getElementById('formulario-login') as HTMLFormElement;

interface Usuario {
    nome: string,
    email: string;
    senha: string;
    recados: Recado[];
}

formularioLogin.addEventListener('submit', (event) => {
    event.preventDefault();

    logar();
});

function logar(): void{
    let usuarios = buscarUsuarios();

    let usuarioEncontrado = usuarios.find((usuario) => usuario.email === emailLogin.value && usuario.senha === passwordLogin.value);

    if(!usuarioEncontrado){
        alert("E-mail ou password incorretas! Verifique e tente novamente!")
        formularioLogin.reset();
        return
    }

    localStorage.setItem('usuarioLogado', usuarioEncontrado.email);

    window.location.href = 'recados1.html';

}

function buscarUsuarios(): Usuario[] {
  return JSON.parse(localStorage.getItem('usuarios') || '[]');
}