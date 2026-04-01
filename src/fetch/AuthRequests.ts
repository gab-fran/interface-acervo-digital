// Classe responsável por fazer requisições à API - autenticação
import { SERVER_CFG } from "../AppConfig";
import type LoginDTO from "../dto/LoginDTO";

class AuthRequests {
    /**
     * Realiza a autenticação do usuário
     * @param loginDados Objeto com email e senha
     * @returns Objeto com status de autenticação, token e dados do usuário
     */
    async login(loginDados: LoginDTO): Promise<boolean> {
        try {
            const respostaAPI = await fetch(`${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_LOGIN}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginDados)
            });

            if (respostaAPI.ok) {
                const dados = await respostaAPI.json();
                if (dados.auth) this.persistToken(dados.token, dados.usuario.nome, dados.usuario.email, dados.usuario.id_usuario, dados.auth);
                return true;
            } else {
                const erro = await respostaAPI.json();
                throw new Error(erro.message || "Erro ao realizar login.");
            }
        } catch (error) {
            console.error(`Erro ao tentar realizar login. ${error}`);
            return false;
        }
    }

    /**
     * Persiste o token no localStorage
     * @param {*} token - token recebido do servidor
     * @param {*} email - nome usuário recebido do servidor
     * @param {*} id_usuario - idUsuario recebido do servidor
     */
    persistToken(token: string, nome: string, email: string, id_usuario: number, is_auth: boolean) {
        // adiciona o token no localstorade com o apelido de token
        localStorage.setItem('token', token);  // -> armazena o token no localStorage e coloca o 'apelido' de token
        localStorage.setItem('nome', nome);
        // adiciona o nome de usuário no localstorade com o apelido de username
        localStorage.setItem('email', email);  // -> armazena o username no localStorage e coloca o 'apelido' de username 
        // adiciona o id da pessoa no localstorade com o apelido de idPessoa
        localStorage.setItem('id_usuario', id_usuario.toString());  // -> armazena o idPessoa no localStorage e coloca o 'apelido' de idPessoa
        // adiciona o valor de autenticação no localstorade com o apelido de isAuth
        localStorage.setItem('is_auth', is_auth.toString());  // -> armazena o estado da autenticação (true, false) no localStorage e coloca o 'apelido' de isAuth
    }

    /**
     * Remove as informações do localStorage
     */
    removeToken() {
        // remove o token do localstorade
        localStorage.removeItem('token');  // -> remove o 'apelido' de token do localStorage
        localStorage.removeItem('nome');
        // remove o username do localstorage
        localStorage.removeItem('email');  // -> remove o 'apelido' de username do localStorage
        // remove o id_usuario do localstorage
        localStorage.removeItem('id_usuario');  // -> remove o 'apelido' de id_usuario do localStorage
        // remove o is_auth do localstorage
        localStorage.removeItem('is_auth');  // -> remove o 'apelido' de is_auth do localStorage
        // redireciona o usuário para a página de login
        window.location.href = `/login`;
    }

    /**
     * Verifica a validade do token
     * @returns **true** caso token válido, **false** caso token inválido
     */
    checkTokenExpiry() {
        // recupera o valor do token no localstorage
        const token = localStorage.getItem('token');

        // verifica se o valor é diferente de vazio
        if (token) {
            // recupera a data de expiração do token
            const payload = JSON.parse(atob(token.split('.')[1]));
            // recuepra a hora de expiração do token
            const expiry = payload.exp;
            // pega a data e hora atual
            const now = Math.floor(Date.now() / 1000);

            // verifica se o token está expirado
            if (expiry < now) {
                // invoca a função para remover o token do localstorage
                this.removeToken();
                // retorna false
                return false;
            }
            // caso o token não esteja expirado, retorna true
            return true;
        }
        // caso o token esteja vazio, retorna false
        return false;
    }
}

export default new AuthRequests();