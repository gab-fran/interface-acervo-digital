// Interceptor para detectar tokens expirados (resposta 401)
import AuthRequests from '../fetch/AuthRequests';

/**
 * Verifica se a resposta é 401 (Token expirado) e redireciona para login
 * @param response - Resposta da API
 * @returns true se for 401, false caso contrário
 */
export function checkIfTokenExpired(response: Response): boolean {
    if (response.status === 401) {
        // Token expirado, faz logout do usuário
        AuthRequests.removeToken();
        return true;
    }
    return false;
}
