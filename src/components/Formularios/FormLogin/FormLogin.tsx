import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthRequests from '../../../fetch/AuthRequests';
import type LoginDTO from '../../../dto/LoginDTO';

function FormLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginDTO>({
        email: '',
        senha: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const logado = await AuthRequests.login(formData);
            
            if (logado) {
                // Redireciona para a home
                navigate('/');
            } else {
                setError('Falha na autenticação. Verifique suas credenciais.');
            }
        } catch (err: any) {
            setError(err.message || 'Ocorreu um erro ao tentar entrar.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 bg-white rounded-2xl shadow-xl w-full max-w-md border border-slate-100 flex flex-col items-center">
            <div className="flex flex-col items-center mb-8 gap-2">
                <div className="bg-slate-700 p-3 rounded-xl shadow-md">
                    <i className="pi pi-lock text-white text-3xl"></i>
                </div>
                <h2 className="text-3xl font-bold text-slate-800">Acesso Restrito</h2>
                <p className="text-slate-500 text-sm">Biblioteca Digital - Login</p>
            </div>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
                {error && (
                    <div className="w-full bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-700 text-sm flex items-center gap-3">
                        <i className="pi pi-exclamation-circle text-red-500"></i>
                        <span>{error}</span>
                    </div>
                )}

                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-semibold text-slate-600 ml-1">
                        E-mail de Usuário
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                            <i className="pi pi-at"></i>
                        </span>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="exemplo@email.com"
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-hidden focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition-all text-slate-700"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="senha" className="text-sm font-semibold text-slate-600 ml-1">
                        Senha de Acesso
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                            <i className="pi pi-key"></i>
                        </span>
                        <input
                            id="senha"
                            name="senha"
                            type="password"
                            value={formData.senha}
                            onChange={handleChange}
                            required
                            placeholder="Sua senha secreta"
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-hidden focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition-all text-slate-700"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 py-4 bg-slate-700 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 active:scale-98 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <i className="pi pi-spin pi-spinner text-xl"></i>
                    ) : (
                        <>
                            <i className="pi pi-sign-in text-xl"></i>
                            <span>ENTRAR NO SISTEMA</span>
                        </>
                    )}
                </button>
            </form>

            <div className="mt-10 text-center flex flex-col gap-1">
                <p className="text-sm text-slate-400 uppercase tracking-widest font-medium">Esqueceu a senha?</p>
                <p className="text-xs text-slate-400">Entre em contato com o administrador do acervo.</p>
            </div>
        </div>
    );
}

export default FormLogin;
