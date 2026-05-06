import { useState, type JSX } from "react";
import AuthRequests from "../../fetch/AuthRequests";

function BoasVindas(): JSX.Element {

    const [isAuthenticated] = useState(() => {
            const isAuth = localStorage.getItem('isAuth');
            const token = localStorage.getItem('token');
            return !!(isAuth && token && AuthRequests.checkTokenExpiry());
    });

    return (
        <main className="bg-gray-200 flex-1 flex flex-col items-center justify-center px-6 py-12 md:py-20">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center">
                Acervo Digital
            </h1>

            {isAuthenticated ? (
                <p className="text-base md:text-lg lg:text-xl mt-6 md:mt-10 text-center max-w-2xl">
                    Seja bem-vindo ao acervo digital. Aqui você encontra uma coleção
                    completa de conteúdos organizados e acessíveis para facilitar
                    sua pesquisa e aprendizado.
                </p>
            ) : (
                <p className="text-base md:text-lg lg:text-xl mt-6 md:mt-10 text-center max-w-2xl">
                    Seja bem-vindo ao acervo digital. Por favor, efetue o login para
                    acessar o conteúdo do site.
                </p>
            )}
        </main>
    );
}

export default BoasVindas;