let nomeHtml = document.getElementById('nome-cadastro') as HTMLInputElement;
let emailHtml = document.getElementById('email-cadastro') as HTMLInputElement;
let passwordHtml = document.getElementById('password-cadastro') as HTMLInputElement;
let repasswordHtml = document.getElementById('repassword-cadastro') as HTMLInputElement;

let formularioCadastro = document.getElementById('formulario-cadastro') as HTMLFormElement;

interface Recado {
    id: string,
    detalhamento: string,
    descricao: string
}

interface Usuario {
    nome: string,
    email: string,
    senha: string,
    recados: Recado[]
}


formularioCadastro.addEventListener('submit', (e) =>{
    e.preventDefault();

    let retorno = validarCampos();
    

    if(!retorno){
        return 
    }
    cadastrarUsuario();
});

function validarCampos(): Boolean {

    if(passwordHtml.value !== repasswordHtml.value){
        alert('Preencha os campos corretamente.')
        return false;
    }
    return true
};


function cadastrarUsuario(){

    let listaUsuarios= buscarUsuarioLocalStorage();

    let existe = listaUsuarios.some((usuario) => usuario.email === emailHtml.value);

    if(existe){
        alert("Já existe e-mail cadastrado na plataforma.");
        return
    }
    const novoUsuario:Usuario = {
        nome: nomeHtml.value ,
        email: emailHtml.value,
        senha: passwordHtml.value ,
        recados: [] 
    }

    listaUsuarios.push(novoUsuario);
    salvarUsuarioLocalStorage(listaUsuarios);

    alert("Conta criada com sucesso.");
    formularioCadastro.reset();
    window.location.href = 'entrar01.html';
    
};

function salvarUsuarioLocalStorage(listaDados: Usuario[]){
    localStorage.setItem('usuarios', JSON.stringify(listaDados));
}

function buscarUsuarioLocalStorage(): Usuario[]{
  return JSON.parse(localStorage.getItem('usuarios') || "[]");
}