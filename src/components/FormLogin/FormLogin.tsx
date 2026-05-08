// Importa o tipo JSX do React para definir o tipo de retorno do componente
import { type JSX, useState } from 'react';// Importa os estilos CSS específicos para o formulário de login
import estilo from './FormLogin.module.css';
import AuthRequests from '../../fetch/AuthRequests';

// Declara o componente funcional LoginForm que retorna um elemento JSX
function LoginForm(): JSX.Element {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    interface LoginData {
        email: string;
        senha: string;
    }

    interface FormEvent {
        preventDefault: () => void;
    }

    /**
     * Envia o formulário à API invocando o método de login
     * @param e evento de envio do formulário
     */
    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        const login: LoginData = { email: email, senha: senha }
        
        // lógica para autenticação do usuário
        try {
            if(await AuthRequests.login(login)) {
                window.location.href = '/'; // redireciona para a página inicial
            }
        } catch (error) {
            // lança um erro
            console.error(`Erro ao tentar fazer login: ${error}`);
            alert('Erro ao fazer login, verifique se usuário e/ou senha estão corretos.');
        }
    };

    return (
        // Seção principal que contém o formulário de login
        <section className="flex-1 flex justify-center items-center p-4 min-h-[calc(100vh-120px)] bg-gray-100">
 
            {/* Início do formulário com classe de estilo personalizada */}
            <form action="POST" className={`${estilo['login-form']} animate-fade-in shadow-2xl rounded-2xl p-8 w-full max-w-md bg-white border border-gray-100`} onSubmit={handleSubmit}>
 
                {/* Título do formulário */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">LOGIN</h2>
                    <p className="text-gray-500 mt-2 font-medium">Acesse o sistema do Acervo Digital</p>
                </div>
 
                {/* Campo de e-mail com rótulo */}
                <div className="mb-6">
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">
                        E-mail
                    </label>
                    <div className="relative">
                        <i className="pi pi-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input
                            type="email"
                            placeholder='seuemail@adigital.com.br'
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-slate-700 focus:bg-white transition-all outline-none text-slate-700 font-medium"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            pattern="[a-zA-Z0-9._%+-]+@adigital\.com\.br"
                            title="Por favor, use um email @adigital.com.br"
                            required
                        />
                    </div>
                    {email && !/^[a-zA-Z0-9._%+-]+@adigital\.com\.br$/.test(email) && (
                        <p className="text-red-500 text-xs mt-2 font-bold animate-pulse">
                            Por favor, use um email @adigital.com.br
                        </p>
                    )}
                </div>
 
                {/* Campo de senha com rótulo */}
                <div className="mb-8">
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Senha
                    </label>
                    <div className="relative">
                        <i className="pi pi-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input
                            type="password"
                            placeholder='Informe sua senha'
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-slate-700 focus:bg-white transition-all outline-none text-slate-700 font-medium"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>
                </div>
 
                {/* Botão de login */}
                <button
                    type="submit"
                    className="w-full bg-slate-700 hover:bg-slate-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                    <i className="pi pi-sign-in"></i>
                    Entrar
                </button>
 
                <div className="mt-8 text-center">
                    <p className="text-gray-400 text-sm italic font-medium">
                        © 2026 Acervo Digital - Sistema Interno
                    </p>
                </div>
            </form>
            
            <style>{`
                .animate-fade-in {
                    animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
}

// Exporta o componente para ser utilizado em outros arquivos do projeto
export default LoginForm;