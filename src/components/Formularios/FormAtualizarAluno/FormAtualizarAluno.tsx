import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AlunoRequests from '../../../fetch/AlunoRequests';
import type AlunoDTO from '../../../dto/AlunoDTO';
import Utilitario from '../../../utils/Utilitario';

function FormAtualizarAluno() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [formData, setFormData] = useState<AlunoDTO>({
        nome: '',
        sobrenome: '',
        data_nascimento: new Date(),
        endereco: '',
        email: '',
        celular: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const carregarAluno = async () => {
            if (id) {
                const aluno = await AlunoRequests.obterAlunoPorId(Number(id));
                if (aluno) {
                    setFormData(aluno);
                } else {
                    alert("Aluno não encontrado.");
                    navigate('/aluno');
                }
                setLoading(false);
            }
        };
        carregarAluno();
    }, [id, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'celular') {
            const celularFormatado = Utilitario.formatarTelefone(value);
            setFormData(prev => ({ ...prev, [name]: celularFormatado }));
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (id) {
            const resposta = await AlunoRequests.atualizarAluno(Number(id), formData);
            if (resposta) {
                alert('Aluno atualizado com sucesso.');
                navigate('/aluno');
            } else {
                alert('Erro ao atualizar aluno.');
            }
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-[76vh]">Processando...</div>;
    }

    return (
        <section className='bg-gray-200 h-[76vh] flex items-center justify-center overflow-auto'>
            <form onSubmit={handleSubmit} className="py-8">
                <h1 className="text-[3rem] text-center pt-[1.5rem]">Atualizar Aluno</h1>

                <div className='flex justify-center'>
                    <label htmlFor="nome" className='text-xl m-4'>
                        Nome <br />
                        <input
                            type="text"
                            name="nome"
                            id="nome"
                            required
                            minLength={3}
                            value={formData.nome}
                            onChange={handleChange}
                            placeholder='Nome'
                            className='w-2xs border-2 border-slate-500 rounded-md p-1'
                        />
                    </label>

                    <label htmlFor="sobrenome" className='text-xl m-4'>
                        Sobrenome <br />
                        <input
                            type="text"
                            name="sobrenome"
                            id="sobrenome"
                            required
                            minLength={3}
                            value={formData.sobrenome}
                            onChange={handleChange}
                            placeholder='Sobrenome'
                            className='w-2xs border-2 border-slate-500 rounded-md p-1'
                        />
                    </label>
                </div>

                <div className='flex justify-center'>
                    <label htmlFor="data_nascimento" className='text-xl m-4'>
                        Data de Nascimento <br />
                        <input
                            type="date"
                            name="data_nascimento"
                            id="data_nascimento"
                            value={Utilitario.formatarDataParaInput(formData.data_nascimento)}
                            onChange={handleChange}
                            className='w-2xs border-2 border-slate-500 rounded-md p-1'
                        />
                    </label>

                    <label htmlFor="celular" className='text-xl m-4'>
                        Celular <br />
                        <input
                            type="tel"
                            name="celular"
                            id="celular"
                            value={formData.celular}
                            onChange={handleChange}
                            placeholder='(xx) x xxxx-xxxx'
                            className='w-2xs border-2 border-slate-500 rounded-md p-1'
                        />
                    </label>
                </div>

                <div className='flex justify-center'>
                    <label htmlFor="endereco" className='text-xl m-4'>
                        Endereço <br />
                        <input
                            type="text"
                            name="endereco"
                            id="endereco"
                            minLength={6}
                            value={formData.endereco}
                            onChange={handleChange}
                            placeholder='Endereço'
                            className='w-2xs border-2 border-slate-500 rounded-md p-1'
                        />
                    </label>

                    <label htmlFor="email" className='text-xl m-4'>
                        E-mail <br />
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='exemplo@mail.com'
                            className='w-2xs border-2 border-slate-500 rounded-md p-1'
                        />
                    </label>
                </div>

                <input type="submit" value="ATUALIZAR" className=' block mx-auto mt-12 bg-slate-500 min-w-3xs min-h-[2.5rem] rounded-md text-white cursor-pointer hover:bg-slate-600 shadow-md transition-all' />
                <button 
                    type="button" 
                    onClick={() => navigate('/aluno')}
                    className=' block mx-auto mt-4 bg-white border-2 border-slate-500 text-slate-500 min-w-3xs min-h-[2.5rem] rounded-md font-semibold hover:bg-slate-50 transition-all shadow-sm'
                >
                    VOLTAR
                </button>
            </form>
        </section>
    );
}

export default FormAtualizarAluno;
