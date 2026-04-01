import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LivroRequests from '../../../fetch/LivroRequests';
import type LivroDTO from '../../../dto/LivroDTO';

function FormAtualizarLivro() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [formData, setFormData] = useState<LivroDTO>({
        titulo: '',
        autor: '',
        editora: '',
        ano_publicacao: '',
        isbn: '',
        quant_total: 0,
        quant_disponivel: 0,
        quant_aquisicao: 0,
        valor_aquisicao: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const carregarLivro = async () => {
            if (id) {
                const livro = await LivroRequests.obterLivroPorId(Number(id));
                if (livro) {
                    setFormData(livro);
                } else {
                    alert("Livro não encontrado.");
                    navigate('/livro');
                }
                setLoading(false);
            }
        };
        carregarLivro();
    }, [id, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;

        let parsedValue: string | number = value;
        if (type === 'number') {
            parsedValue = Number(value);
        }

        setFormData(prev => ({ ...prev, [name]: parsedValue }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (id) {
            const resposta = await LivroRequests.atualizarLivro(Number(id), formData);
            if (resposta) {
                alert('Livro atualizado com sucesso.');
                navigate('/livro');
            } else {
                alert('Erro ao atualizar livro.');
            }
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-[76vh]">Processando...</div>;
    }

    return (
        <section className='bg-gray-200 h-[76vh] flex items-center justify-center overflow-auto'>
            <form onSubmit={handleSubmit} className="py-8">
                <h1 className="text-[3rem] text-center pt-[1.5rem]">Atualizar Livro</h1>

                <div className='flex justify-center'>
                    <label htmlFor="titulo" className='text-xl m-4'>
                        Título <br />
                        <input
                            type="text"
                            name="titulo"
                            id="titulo"
                            required
                            minLength={3}
                            value={formData.titulo}
                            onChange={handleChange}
                            placeholder='Título'
                            className='w-2xs border-2 border-slate-500 rounded-md p-1'
                        />
                    </label>

                    <label htmlFor="autor" className='text-xl m-4'>
                        Autor <br />
                        <input
                            type="text"
                            name="autor"
                            id="autor"
                            required
                            minLength={3}
                            value={formData.autor}
                            onChange={handleChange}
                            placeholder='Autor'
                            className='w-2xs border-2 border-slate-500 rounded-md p-1'
                        />
                    </label>
                </div>

                <div className='flex justify-center'>
                    <label htmlFor="editora" className='text-xl m-4'>
                        Editora <br />
                        <input
                            type="text"
                            name="editora"
                            id="editora"
                            required
                            value={formData.editora}
                            onChange={handleChange}
                            placeholder='Editora'
                            className='w-2xs border-2 border-slate-500 rounded-md p-1'
                        />
                    </label>

                    <label htmlFor="ano_publicacao" className='text-xl m-4'>
                        Ano de Publicação <br />
                        <input
                            type="number"
                            name="ano_publicacao"
                            id="ano_publicacao"
                            required
                            value={formData.ano_publicacao}
                            onChange={handleChange}
                            placeholder='Ano de Publicação'
                            className='w-2xs border-2 border-slate-500 rounded-md p-1'
                        />
                    </label>
                </div>

                <div className='flex justify-center'>
                    <label htmlFor="isbn" className='text-xl m-4'>
                        ISBN <br />
                        <input
                            type="text"
                            name="isbn"
                            id="isbn"
                            required
                            pattern="^(?:(?:\d[\ |-]?){9}[\d|X]|(?:\d[\ |-]?){13})$"
                            maxLength={14}
                            title="O ISBN deve ser um formato válido de 10 ou 13 dígitos (ex: 8535902775 ou 978-8535902777)"
                            value={formData.isbn}
                            onChange={handleChange}
                            placeholder='ISBN-10 ou ISBN-13'
                            className='w-2xs border-2 border-slate-500 rounded-md p-1'
                        />
                    </label>

                    <label htmlFor="valor_aquisicao" className='text-xl m-4'>
                        Valor de Aquisição <br />
                        <input
                            type="number"
                            name="valor_aquisicao"
                            id="valor_aquisicao"
                            required
                            min={0}
                            step={0.01}
                            value={formData.valor_aquisicao}
                            onChange={handleChange}
                            placeholder='0.00'
                            className='w-2xs border-2 border-slate-500 rounded-md p-1'
                        />
                    </label>
                </div>

                <div className='flex justify-center'>
                    <label htmlFor="quant_total" className='text-xl m-4'>
                        Quant. Total <br />
                        <input
                            type="number"
                            name="quant_total"
                            id="quant_total"
                            required
                            min={0}
                            value={formData.quant_total}
                            onChange={handleChange}
                            placeholder='0'
                            className='w-[8rem] border-2 border-slate-500 rounded-md p-1'
                        />
                    </label>

                    <label htmlFor="quant_disponivel" className='text-xl m-4'>
                        Quant. Disponível <br />
                        <input
                            type="number"
                            name="quant_disponivel"
                            id="quant_disponivel"
                            required
                            min={0}
                            value={formData.quant_disponivel}
                            onChange={handleChange}
                            placeholder='0'
                            className='w-[8rem] border-2 border-slate-500 rounded-md p-1'
                        />
                    </label>
                    <label htmlFor="quant_aquisicao" className='text-xl m-4'>
                        Quant. Aquisição <br />
                        <input
                            type="number"
                            name="quant_aquisicao"
                            id="quant_aquisicao"
                            required
                            min={0}
                            value={formData.quant_aquisicao}
                            onChange={handleChange}
                            placeholder='0'
                            className='w-[8rem] border-2 border-slate-500 rounded-md p-1'
                        />
                    </label>
                </div>

                <input type="submit" value="ATUALIZAR" className=' block mx-auto mt-12 bg-slate-500 min-w-3xs min-h-[2.5rem] rounded-md text-white cursor-pointer hover:bg-slate-600 shadow-md transition-all' />
                <button
                    type="button"
                    onClick={() => navigate('/livro')}
                    className=' block mx-auto mt-4 bg-white border-2 border-slate-500 text-slate-500 min-w-3xs min-h-[2.5rem] rounded-md font-semibold hover:bg-slate-50 transition-all shadow-sm'
                >
                    VOLTAR
                </button>
            </form>
        </section>
    );
}

export default FormAtualizarLivro;
