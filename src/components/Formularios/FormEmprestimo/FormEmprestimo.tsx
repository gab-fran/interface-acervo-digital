import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmprestimoRequests from '../../../fetch/EmprestimoRequests';
import AlunoRequests from '../../../fetch/AlunoRequests';
import LivroRequests from '../../../fetch/LivroRequests';
import type EmprestimoDTO from '../../../dto/EmprestimoDTO';
import type AlunoDTO from '../../../dto/AlunoDTO';
import type LivroDTO from '../../../dto/LivroDTO';

// Retorna a data atual formatada como yyyy-MM-dd (compatível com input type="date")
function getHojeStr(): string {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
}

function FormEmprestimo() {
    const navigate = useNavigate();
    const hojeStr = getHojeStr();

    const [listaAlunos, setListaAlunos] = useState<AlunoDTO[]>([]);
    const [listaLivros, setListaLivros] = useState<LivroDTO[]>([]);
    const [carregando, setCarregando] = useState<boolean>(true);

    const [formData, setFormData] = useState<EmprestimoDTO>({
        id_emprestimo: 0,
        aluno: { id_aluno: 0 },
        livro: { id_livro: 0 },
        data_emprestimo: new Date(),
        data_devolucao: undefined,
        status_emprestimo: 'Em andamento',
        status_emprestimo_registro: true
    });

    // Busca alunos e livros da API ao montar o componente
    useEffect(() => {
        async function carregarDados() {
            setCarregando(true);
            const [alunos, livros] = await Promise.all([
                AlunoRequests.obterListaDeAlunos(),
                LivroRequests.obterListaDeLivros()
            ]);

            if (alunos) setListaAlunos(alunos as unknown as AlunoDTO[]);
            if (livros) setListaLivros(livros as unknown as LivroDTO[]);
            setCarregando(false);
        }
        carregarDados();
    }, []);

    // Atualiza o state a partir de qualquer input do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'id_aluno') {
            setFormData(prev => ({ ...prev, aluno: { ...prev.aluno, id_aluno: Number(value) } }));
        } else if (name === 'id_livro') {
            setFormData(prev => ({ ...prev, livro: { ...prev.livro, id_livro: Number(value) } }));
        } else if (name === 'data_emprestimo' || name === 'data_devolucao') {
            setFormData(prev => ({ ...prev, [name]: new Date(value) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    // Envia os dados para a requisição
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // evita o recarregamento da página

        // chama o método que irá fazer a requisição à API
        const resposta = await EmprestimoRequests.enviarFormularioEmprestimo(formData);
        if (resposta) {
            alert("Empréstimo cadastrado com sucesso");
            navigate('/emprestimos');
        } else {
            alert("Erro ao cadastrar empréstimo");
        }
    };

    return (
        <main className="bg-gray-100 flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 border border-slate-200">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold text-slate-800 mb-8 sm:mb-12">
                        Cadastro de Empréstimo
                    </h1>

                    {carregando ? (
                        <div className="flex justify-center items-center py-16">
                            <div className="text-slate-500 text-lg font-medium animate-pulse">
                                Carregando dados...
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6 sm:space-y-8">
                            {/* Linha 1: Aluno e Livro */}
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1">
                                    <label htmlFor="id_aluno" className="block text-sm font-semibold text-slate-700 mb-2">
                                        Aluno
                                    </label>
                                    <select
                                        name="id_aluno"
                                        id="id_aluno"
                                        required
                                        value={formData.aluno.id_aluno || ''}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all bg-white text-slate-700"
                                    >
                                        <option value="">Selecione um aluno</option>
                                        {listaAlunos.map(aluno => (
                                            <option key={aluno.id_aluno} value={aluno.id_aluno}>
                                                {aluno.nome} {aluno.sobrenome}
                                                {aluno.ra ? ` — RA: ${aluno.ra}` : ''}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex-1">
                                    <label htmlFor="id_livro" className="block text-sm font-semibold text-slate-700 mb-2">
                                        Livro
                                    </label>
                                    <select
                                        name="id_livro"
                                        id="id_livro"
                                        required
                                        value={formData.livro.id_livro || ''}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all bg-white text-slate-700"
                                    >
                                        <option value="">Selecione um livro</option>
                                        {listaLivros.map(livro => (
                                            <option key={livro.id_livro} value={livro.id_livro}>
                                                {livro.titulo} — {livro.autor}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Linha 2: Data de Empréstimo e Data de Devolução */}
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1">
                                    <label htmlFor="data_emprestimo" className="block text-sm font-semibold text-slate-700 mb-2">
                                        Data de Empréstimo
                                    </label>
                                    <input
                                        type="date"
                                        name="data_emprestimo"
                                        id="data_emprestimo"
                                        required
                                        readOnly
                                        value={hojeStr}
                                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-50 text-slate-500 cursor-not-allowed"
                                    />
                                </div>

                                <div className="flex-1">
                                    <label htmlFor="data_devolucao" className="block text-sm font-semibold text-slate-700 mb-2">
                                        Data de Devolução
                                    </label>
                                    <input
                                        type="date"
                                        name="data_devolucao"
                                        id="data_devolucao"
                                        min={hojeStr}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all text-slate-700"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-10 sm:mt-14 space-y-4">
                        <input
                            type="submit"
                            value="CADASTRAR EMPRÉSTIMO"
                            disabled={carregando}
                            className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold text-lg cursor-pointer hover:bg-slate-700 shadow-lg hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        <button
                            type="button"
                            onClick={() => navigate('/emprestimos')}
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

export default FormEmprestimo;