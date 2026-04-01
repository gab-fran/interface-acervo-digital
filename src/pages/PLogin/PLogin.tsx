import { type JSX, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormLogin from "../../components/Formularios/FormLogin/FormLogin";
import Rodape from "../../components/Rodape/Rodape";
import Navegacao from "../../components/Navegacao/Navegacao";

function PLogin(): JSX.Element {
    const navigate = useNavigate();

    useEffect(() => {
        const isAuth = localStorage.getItem('is_auth') === 'true';
        if (isAuth) {
            navigate('/', { replace: true });
        }
    }, [navigate]);

    return (
        <div className="flex flex-col min-h-screen">
            <Navegacao />
            
            <main className="flex-grow flex items-center justify-center bg-slate-50 py-8 px-4">
                <FormLogin />
            </main>
            
            <Rodape />
        </div>
    );
}

export default PLogin;
