import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmprestimoRequests from '../../../fetch/EmprestimoRequests';
import AlunoRequests from '../../../fetch/AlunoRequests';
import LivroRequests from '../../../fetch/LivroRequests';
import type EmprestimoDTO from '../../../dto/EmprestimoDTO';
import type AlunoDTO from '../../../dto/AlunoDTO';
import type LivroDTO from '../../../dto/LivroDTO';
import PaginaConteudo from '../../Comuns/PaginaConteudo';
import CabecalhoPagina from '../../Comuns/CabecalhoPagina';
import CardConteudo from '../../Comuns/CardConteudo';
import CampoFormulario from '../../Comuns/CampoFormulario';
import { ui } from '../../Comuns/styles';

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const resposta = await EmprestimoRequests.enviarFormularioEmprestimo(formData);
        if (resposta) {
            alert("Emprestimo cadastrado com sucesso");
            navigate('/emprestimos');
        } else {
            alert("Erro ao cadastrar emprestimo");
        }
    };

    return (
        <PaginaConteudo formLayout>
            <CabecalhoPagina
                titulo="Cadastro de Emprestimo"
                subtitulo="Vincule aluno, livro e previsao de devolucao"
            />

            <form onSubmit={handleSubmit}>
                <CardConteudo asForm>
                    {carregando ? (
                        <div className="flex flex-col justify-center items-center gap-3 py-16 text-center">
                            <i className="pi pi-spin pi-spinner text-3xl text-slate-500"></i>
                            <p className="text-slate-500 text-lg font-medium">
                                Carregando dados...
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                            <CampoFormulario htmlFor="id_aluno" label="Aluno">
                                <select
                                    name="id_aluno"
                                    id="id_aluno"
                                    required
                                    value={formData.aluno.id_aluno || ''}
                                    onChange={handleChange}
                                    className={ui.select}
                                >
                                    <option value="">Selecione um aluno</option>
                                    {listaAlunos.map(aluno => (
                                        <option key={aluno.id_aluno} value={aluno.id_aluno}>
                                            {aluno.nome} {aluno.sobrenome}
                                            {aluno.ra ? ` - RA: ${aluno.ra}` : ''}
                                        </option>
                                    ))}
                                </select>
                            </CampoFormulario>

                            <CampoFormulario htmlFor="id_livro" label="Livro">
                                <select
                                    name="id_livro"
                                    id="id_livro"
                                    required
                                    value={formData.livro.id_livro || ''}
                                    onChange={handleChange}
                                    className={ui.select}
                                >
                                    <option value="">Selecione um livro</option>
                                    {listaLivros.map(livro => (
                                        <option key={livro.id_livro} value={livro.id_livro}>
                                            {livro.titulo} - {livro.autor}
                                        </option>
                                    ))}
                                </select>
                            </CampoFormulario>

                            <CampoFormulario htmlFor="data_emprestimo" label="Data de Emprestimo">
                                <input
                                    type="date"
                                    name="data_emprestimo"
                                    id="data_emprestimo"
                                    required
                                    readOnly
                                    value={hojeStr}
                                    className={ui.readonlyInput}
                                />
                            </CampoFormulario>

                            <CampoFormulario htmlFor="data_devolucao" label="Data de Devolucao">
                                <input
                                    type="date"
                                    name="data_devolucao"
                                    id="data_devolucao"
                                    min={hojeStr}
                                    onChange={handleChange}
                                    className={ui.input}
                                />
                            </CampoFormulario>
                        </div>
                    )}

                    <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <button
                            type="submit"
                            disabled={carregando}
                            className={ui.primaryButton}
                        >
                            <i className="pi pi-check-circle"></i>
                            Cadastrar Emprestimo
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/emprestimos')}
                            className={ui.secondaryButton}
                        >
                            <i className="pi pi-arrow-left"></i>
                            Voltar para Listagem
                        </button>
                    </div>
                </CardConteudo>
            </form>
        </PaginaConteudo>
    );
}

export default FormEmprestimo;
