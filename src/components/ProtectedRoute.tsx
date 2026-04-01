import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: JSX.Element;
}

/**
 * Componente para proteger rotas privadas.
 * Se o usuário não estiver autenticado, redireciona para a página de login.
 */
function ProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
    const isAuth = localStorage.getItem('is_auth') === 'true';

    if (!isAuth) {
        // Redireciona para o login se não estiver autenticado
        return <Navigate to="/login" replace />;
    }

    // Retorna os componentes filhos se estiver autenticado
    return children;
}

export default ProtectedRoute;
