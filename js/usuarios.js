function submeterForm(event) {
    event.preventDefault()
    let id = Number(document.getElementById('id').value)
    let dados = {
        firstName: document.getElementById('nome').value,
        lastName: document.getElementById('sobrenome').value,
        age: Number(document.getElementById('idade').value)
    }
    if (id == 0) {
        criarUsuario(dados)
    } else {
        alterarUsuario({ id, ...dados })
    }
}

async function criarUsuario(dados) {
    try {
        let resposta = await axios.post('https://dummyjson.com/users/add', dados)
        console.log('Usuário criado:', resposta.data)
        alert('Usuário criado com sucesso!')
        document.getElementById('form').reset()
        listarUsuarios()
    } catch (erro) {
        console.log('Erro ao criar usuário:', erro)
        alert('Erro ao criar usuário')
    }
}

async function listarUsuarios() {
    let divUsuarios = document.getElementById('divUsuarios')
    divUsuarios.innerHTML = ''
    try {
        let resposta = await axios.get('https://dummyjson.com/users')
        let usuarios = resposta.data.users
        console.log('Lista de usuários:', resposta.data)
        for (let i = 0; i < usuarios.length; i++) {
            divUsuarios.innerHTML += `<p>
                <button onclick="exibirUsuario(${usuarios[i].id})">✏</button>
                <button onclick="excluirUsuario(${usuarios[i].id})">❌
                ${usuarios[i].firstName} 
                ${usuarios[i].lastName} 
                (${usuarios[i].age} anos)
            </p>`
        }
    } catch (erro) {
        console.log('Erro ao listar usuários:', erro)
        divUsuarios.innerHTML += 'Erro ao listar usuários'
    }
}

async function exibirUsuario(id) {
    try {
        let resposta = await axios.get('https://dummyjson.com/users/' + id)
        let usuario = resposta.data
        document.getElementById('id').value = usuario.id
        document.getElementById('nome').value = usuario.firstName
        document.getElementById('sobrenome').value = usuario.lastName
        document.getElementById('idade').value = usuario.age
    } catch (erro) {
        console.log('Erro ao exibir usuário:', erro)
        alert('Erro ao exibir usuário')
    }
}

async function alterarUsuario(dados) {
    try {
        let resposta = await axios.put('https://dummyjson.com/users/' + dados.id, dados)
        console.log('Usuário alterado:', resposta.data)
        alert('Usuário alterado com sucesso!')
        document.getElementById('form').reset()
        listarUsuarios()
    } catch (erro) {
        console.log('Erro ao alterar usuário:', erro)
        alert('Erro ao alterar usuário')
    }
}

async function excluirUsuario(id) {
    if (!confirm('Você realmente quer excluir este usuário?')) return
    try {
        let resposta = await
            axios.delete('https://dummyjson.com/users/' + id)
        console.log('Usuário excluído:', resposta.data)
        alert('Usuário excluído com sucesso')
        listarUsuarios()
    } catch (erro) {
        console.log('Erro ao excluir usuário:', erro)
        alert('Erro ao excluir usuário')
    }
}
