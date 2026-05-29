import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlunoRequests from '../../../fetch/AlunoRequests';
import type AlunoDTO from '../../../dto/AlunoDTO';
import Utilitario from '../../../utils/Utilitario';

function FormAluno() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<AlunoDTO>({
        nome: '',
        sobrenome: '',
        data_nascimento: new Date(),
        endereco: '',
        email: '',
        celular: ''
    });

    // Atualiza o state a partir de qualquer input do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Verifica se o campo alterado é o celular, se sim irá formatar usando uma expressão regular
        if (name === 'celular') {
            const celularFormatado = Utilitario.formatarTelefone(value);
            setFormData(prev => ({ ...prev, [name]: celularFormatado }));
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Envia os dados para a requisição
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault(); // evita o recarregamento da página

        // valida para saber se o campo e-mail contém uma expressão regular de e-mail
        if (!Utilitario.validarEmail(formData.email)) {
            alert("E-mail inválido");
            return;
        }

        // chama o método que irá fazer a requisição à API
        const resposta = await AlunoRequests.enviarFormularioAluno(formData);
        if (resposta) {
            alert("Aluno cadastrado com sucesso");
        } else {
            alert("Erro ao cadastrar aluno");
        }
    };

    return (
        <main className="bg-gray-100 flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 border border-slate-200">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold text-slate-800 mb-8 sm:mb-12">
                        Cadastro de Aluno
                    </h1>

                    <div className="space-y-6 sm:space-y-8">
                        {/* Linha 1: Nome e Sobrenome */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="nome" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    name="nome"
                                    id="nome"
                                    required
                                    minLength={3}
                                    onChange={handleChange}
                                    placeholder="Digite o nome"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="sobrenome" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Sobrenome
                                </label>
                                <input
                                    type="text"
                                    name="sobrenome"
                                    id="sobrenome"
                                    required
                                    minLength={3}
                                    onChange={handleChange}
                                    placeholder="Digite o sobrenome"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        {/* Linha 2: Data de Nascimento e Celular */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="data_nascimento" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Data de Nascimento
                                </label>
                                <input
                                    type="date"
                                    name="data_nascimento"
                                    id="data_nascimento"
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="celular" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Celular
                                </label>
                                <input
                                    type="tel"
                                    name="celular"
                                    id="celular"
                                    value={formData.celular}
                                    onChange={handleChange}
                                    placeholder="(xx) x xxxx-xxxx"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        {/* Linha 3: Endereço e E-mail */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="endereco" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Endereço
                                </label>
                                <input
                                    type="text"
                                    name="endereco"
                                    id="endereco"
                                    minLength={6}
                                    onChange={handleChange}
                                    placeholder="Rua, número, bairro..."
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                                    E-mail
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    onChange={handleChange}
                                    placeholder="exemplo@email.com"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 sm:mt-14 space-y-4">
                        <input
                            type="submit"
                            value="CADASTRAR ALUNO"
                            className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold text-lg cursor-pointer hover:bg-slate-700 shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                        />
                        <button
                            type="button"
                            onClick={() => navigate('/lista/alunos')}
                            className="w-full bg-white border-2 border-slate-300 text-slate-600 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all active:scale-[0.98]"
                        >
                            VOLTAR PARA LISTAGEM
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default FormAluno;