import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AlunoRequests from '../../../fetch/AlunoRequests';
import LivroRequests from '../../../fetch/LivroRequests';
import EmprestimoRequests from '../../../fetch/EmprestimoRequests';
import type AlunoDTO from '../../../dto/AlunoDTO';
import type LivroDTO from '../../../dto/LivroDTO';
import type EmprestimoDTO from '../../../dto/EmprestimoDTO';
import Utilitario from '../../../utils/Utilitario';

function FormAtualizarEmprestimo() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [alunos, setAlunos] = useState<AlunoDTO[]>([]);
    const [livros, setLivros] = useState<LivroDTO[]>([]);
    const [formData, setFormData] = useState<any>({
        aluno: { id_aluno: 0 },
        livro: { id_livro: 0 },
        data_emprestimo: '',
        data_devolucao: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const carregarDados = async () => {
            const listaAlunos = await AlunoRequests.obterListaDeAlunos();
            const listaLivros = await LivroRequests.obterListaDeLivros();
            
            if (listaAlunos && Array.isArray(listaAlunos)) {
                setAlunos(listaAlunos);
            }
            if (listaLivros && Array.isArray(listaLivros)) {
                setLivros(listaLivros);
            }

            if (id) {
                const emprestimo = await EmprestimoRequests.obterEmprestimoPorId(Number(id));
                if (emprestimo) {
                    setFormData({
                        aluno: { id_aluno: emprestimo.aluno.id_aluno },
                        livro: { id_livro: emprestimo.livro.id_livro },
                        data_emprestimo: Utilitario.formatarDataParaInput(emprestimo.data_emprestimo),
                        data_devolucao: Utilitario.formatarDataParaInput(emprestimo.data_devolucao)
                    });
                } else {
                    alert("Empréstimo não encontrado.");
                    navigate('/emprestimo');
                }
            }
            setLoading(false);
        };

        carregarDados();
    }, [id, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'id_aluno') {
            setFormData((prev: any) => ({
                ...prev,
                aluno: { ...prev.aluno, id_aluno: Number(value) }
            }));
        } else if (name === 'id_livro') {
            setFormData((prev: any) => ({
                ...prev,
                livro: { ...prev.livro, id_livro: Number(value) }
            }));
        } else {
            setFormData((prev: any) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (formData.aluno.id_aluno === 0 || formData.livro.id_livro === 0) {
            alert('Por favor, selecione um aluno e um livro.');
            return;
        }

        if (id) {
            const resposta = await EmprestimoRequests.atualizarEmprestimo(Number(id), formData as unknown as EmprestimoDTO);
            if (resposta) {
                alert('Empréstimo atualizado com sucesso.');
                navigate('/emprestimo');
            } else {
                alert('Erro ao atualizar empréstimo.');
            }
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-[76vh]">Processando...</div>;
    }

    return (
        <section className='bg-gray-200 h-[76vh] flex items-center justify-center overflow-auto'>
            <form onSubmit={handleSubmit} className="py-8">
                <h1 className="text-[3rem] text-center pt-[1.5rem]">Atualizar Empréstimo</h1>

                <div className='flex flex-col items-center'>
                    <div className='flex justify-center'>
                        <label htmlFor="id_aluno" className='text-xl m-4'>
                            Aluno <br />
                            <select
                                name="id_aluno"
                                id="id_aluno"
                                required
                                value={formData.aluno.id_aluno}
                                onChange={handleChange}
                                className='w-2xs border-2 border-slate-500 rounded-md p-1 bg-white h-[2.5rem]'
                            >
                                <option value="">Selecione um aluno</option>
                                {alunos.map(aluno => (
                                    <option key={aluno.id_aluno} value={aluno.id_aluno}>
                                        {aluno.nome} {aluno.sobrenome}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label htmlFor="id_livro" className='text-xl m-4'>
                            Livro <br />
                            <select
                                name="id_livro"
                                id="id_livro"
                                required
                                value={formData.livro.id_livro}
                                onChange={handleChange}
                                className='w-2xs border-2 border-slate-500 rounded-md p-1 bg-white h-[2.5rem]'
                            >
                                <option value="">Selecione um livro</option>
                                {livros.map(livro => (
                                    <option key={livro.id_livro} value={livro.id_livro}>
                                        {livro.titulo}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div className='flex justify-center'>
                        <label htmlFor="data_emprestimo" className='text-xl m-4'>
                            Data do Empréstimo <br />
                            <input
                                type="date"
                                name="data_emprestimo"
                                id="data_emprestimo"
                                required
                                value={formData.data_emprestimo}
                                onChange={handleChange}
                                className='w-2xs border-2 border-slate-500 rounded-md p-1'
                            />
                        </label>

                        <label htmlFor="data_devolucao" className='text-xl m-4'>
                            Data de Devolução (Opcional) <br />
                            <input
                                type="date"
                                name="data_devolucao"
                                id="data_devolucao"
                                value={formData.data_devolucao}
                                onChange={handleChange}
                                className='w-2xs border-2 border-slate-500 rounded-md p-1'
                            />
                        </label>
                    </div>
                </div>

                <input type="submit" value="ATUALIZAR" className=' block mx-auto mt-12 bg-slate-500 min-w-3xs min-h-[2.5rem] rounded-md text-white cursor-pointer hover:bg-slate-600 shadow-md transition-all' />
                <button 
                    type="button" 
                    onClick={() => navigate('/emprestimo')}
                    className=' block mx-auto mt-4 bg-white border-2 border-slate-500 text-slate-500 min-w-3xs min-h-[2.5rem] rounded-md font-semibold hover:bg-slate-50 transition-all shadow-sm'
                >
                    VOLTAR
                </button>
            </form>
        </section>
    );
}

export default FormAtualizarEmprestimo;
