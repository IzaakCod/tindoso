async function listarUsuarios() {
            try {
                const resposta = await axios.get('https://dummyjson.com/users');
                console.log(resposta.data);
            } catch (erro) {
                console.error('Erro:', erro);
            }
        }
        listarUsuarios();