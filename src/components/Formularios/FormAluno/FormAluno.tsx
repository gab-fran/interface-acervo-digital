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

        if(name === 'celular') {
            const celularFormatado = Utilitario.formatarTelefone(value);
            setFormData(prev => ({ ...prev, [name]: celularFormatado }));
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Envia os dados para a requisição
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const resposta = await AlunoRequests.enviarFormularioAluno(formData);
        if (resposta) {
            alert('Aluno cadastrado com sucesso.');
        } else {
            alert('Erro ao cadastrar aluno.');
        }
    };

    return (
        <section className='bg-gray-200 h-[76vh] flex items-center justify-center'>
            <form onSubmit={handleSubmit}>
                <h1 className="text-[3rem] text-center pt-[1.5rem]">Cadastro Aluno</h1>

                <div className='flex justify-center'>
                    <label htmlFor="nome" className='text-xl m-4'>
                        Nome <br />
                        <input
                            type="text"
                            name="nome"
                            id="nome"
                            required
                            minLength={3}
                            onChange={handleChange}
                            placeholder='Nome'
                            className='w-2xs border-2 border-slate-500 rounded-md'
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
                            onChange={handleChange}
                            placeholder='Sobrenome'
                            className='w-2xs border-2 border-slate-500 rounded-md'
                        />
                    </label>
                </div>

                <div className='flex justify-center'>
                    <label htmlFor="dataNascimento" className='text-xl m-4'>
                        Data de Nascimento <br />
                        <input
                            type="date"
                            name="dataNascimento"
                            id="dataNascimento"
                            onChange={handleChange}
                            className='w-2xs border-2 border-slate-500 rounded-md'
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
                            className='w-2xs border-2 border-slate-500 rounded-md'
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
                            onChange={handleChange}
                            placeholder='Endereço'
                            className='w-2xs border-2 border-slate-500 rounded-md'
                        />
                    </label>

                    <label htmlFor="email" className='text-xl m-4'>
                        E-mail <br />
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={handleChange}
                            placeholder='exemplo@mail.com'
                            className='w-2xs border-2 border-slate-500 rounded-md'
                        />
                    </label>
                </div>

                <input type="submit" value="ENVIAR" className=' block mx-auto mt-12 bg-slate-500 min-w-3xs min-h-[2.5rem] rounded-md text-white cursor-pointer hover:bg-slate-600 shadow-md transition-all' />
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

export default FormAluno;