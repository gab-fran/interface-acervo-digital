import { useState, type JSX } from "react";
import AuthRequests from "../../fetch/AuthRequests";

function BoasVindas(): JSX.Element {

    const [isAuthenticated] = useState(() => {
            const isAuth = localStorage.getItem('isAuth');
            const token = localStorage.getItem('token');
            return !!(isAuth && token && AuthRequests.checkTokenExpiry());
    });

    return (
        <main className="bg-gray-100 flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-20">
            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8 md:p-16 text-center animate-welcome-fade">
                <div className="flex justify-center mb-8">
                    <div className="w-20 h-20 bg-slate-700 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6">
                        <i className="pi pi-book text-4xl text-white"></i>
                    </div>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tighter mb-6">
                    Acervo <span className="text-blue-600">Digital</span>
                </h1>

                {isAuthenticated ? (
                    <div className="space-y-6">
                        <p className="text-lg md:text-2xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
                            Seja bem-vindo de volta! Explore nossa coleção completa de conteúdos organizados e acessíveis para impulsionar sua pesquisa e aprendizado.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                            <button 
                                onClick={() => window.location.href = '/livros'}
                                className="bg-slate-700 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                            >
                                <i className="pi pi-search"></i>
                                Explorar Livros
                            </button>
                            <button 
                                onClick={() => window.location.href = '/emprestimos'}
                                className="bg-white text-slate-700 border-2 border-slate-700 hover:bg-slate-50 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                            >
                                <i className="pi pi-calendar"></i>
                                Meus Empréstimos
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <p className="text-lg md:text-2xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
                            Sua biblioteca digital completa, em um só lugar. Por favor, efetue o login para acessar o catálogo e gerenciar seus empréstimos.
                        </p>
                        <div className="mt-10">
                            <button 
                                onClick={() => window.location.href = '/login'}
                                className="bg-slate-700 hover:bg-slate-800 text-white px-10 py-4 rounded-xl font-bold text-xl transition-all shadow-xl active:scale-95 inline-flex items-center gap-3"
                            >
                                <i className="pi pi-user"></i>
                                Entrar no Sistema
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes welcomeFade {
                    from { opacity: 0; transform: scale(0.95) translateY(20px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                .animate-welcome-fade {
                    animation: welcomeFade 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }
            `}</style>
        </main>
    );
}

export default BoasVindas;