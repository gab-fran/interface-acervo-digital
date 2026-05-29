import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LivroRequests from '../../../fetch/LivroRequests';
import type LivroDTO from '../../../dto/LivroDTO';

function FormLivro() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LivroDTO>({
        titulo: '',
        autor: '',
        editora: '',
        ano_publicacao: '',
        isbn: '',
        quant_total: 0,
        quant_disponivel: 0,
        valor_aquisicao: 0,
        status_livro: true
    });

    // Atualiza o state a partir de qualquer input do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'number') {
            setFormData(prev => ({ ...prev, [name]: Number(value) }));
        } else if (name === 'status_livro') {
            setFormData(prev => ({ ...prev, [name]: value === 'true' }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    // Envia os dados para a requisição
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // evita o recarregamento da página

        // chama o método que irá fazer a requisição à API
        const resposta = await LivroRequests.enviarFormularioLivro(formData);
        if (resposta) {
            alert("Livro cadastrado com sucesso");
            navigate('/livros');
        } else {
            alert("Erro ao cadastrar livro");
        }
    };

    return (
        <main className="bg-gray-100 flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 border border-slate-200">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold text-slate-800 mb-8 sm:mb-12">
                        Cadastro de Livro
                    </h1>

                    <div className="space-y-6 sm:space-y-8">
                        {/* Linha 1: Título e Autor */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="titulo" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Título
                                </label>
                                <input
                                    type="text"
                                    name="titulo"
                                    id="titulo"
                                    required
                                    value={formData.titulo}
                                    onChange={handleChange}
                                    placeholder="Digite o título do livro"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-700"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="autor" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Autor
                                </label>
                                <input
                                    type="text"
                                    name="autor"
                                    id="autor"
                                    required
                                    value={formData.autor}
                                    onChange={handleChange}
                                    placeholder="Digite o nome do autor"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-700"
                                />
                            </div>
                        </div>

                        {/* Linha 2: Editora e Ano de Publicação */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="editora" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Editora
                                </label>
                                <input
                                    type="text"
                                    name="editora"
                                    id="editora"
                                    required
                                    value={formData.editora}
                                    onChange={handleChange}
                                    placeholder="Digite a editora"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-700"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="ano_publicacao" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Ano de Publicação
                                </label>
                                <input
                                    type="text"
                                    name="ano_publicacao"
                                    id="ano_publicacao"
                                    required
                                    value={formData.ano_publicacao}
                                    onChange={handleChange}
                                    placeholder="Ex: 2024"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-700"
                                />
                            </div>
                        </div>

                        {/* Linha 3: ISBN e Valor de Aquisição */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="isbn" className="block text-sm font-semibold text-slate-700 mb-2">
                                    ISBN
                                </label>
                                <input
                                    type="text"
                                    name="isbn"
                                    id="isbn"
                                    required
                                    value={formData.isbn}
                                    onChange={handleChange}
                                    placeholder="Digite o ISBN"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-700"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="valor_aquisicao" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Valor de Aquisição
                                </label>
                                <input
                                    type="number"
                                    name="valor_aquisicao"
                                    id="valor_aquisicao"
                                    required
                                    min="0"
                                    step="0.01"
                                    value={formData.valor_aquisicao || ''}
                                    onChange={handleChange}
                                    placeholder="Ex: 49.90"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-700"
                                />
                            </div>
                        </div>

                        {/* Linha 4: Qtd Total, Qtd Disponível e Status */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="quant_total" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Quantidade Total
                                </label>
                                <input
                                    type="number"
                                    name="quant_total"
                                    id="quant_total"
                                    required
                                    min="0"
                                    value={formData.quant_total || ''}
                                    onChange={handleChange}
                                    placeholder="Ex: 10"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-700"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="quant_disponivel" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Quantidade Disponível
                                </label>
                                <input
                                    type="number"
                                    name="quant_disponivel"
                                    id="quant_disponivel"
                                    required
                                    min="0"
                                    value={formData.quant_disponivel || ''}
                                    onChange={handleChange}
                                    placeholder="Ex: 10"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-700"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="status_livro" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Status
                                </label>
                                <select
                                    name="status_livro"
                                    id="status_livro"
                                    value={formData.status_livro ? 'true' : 'false'}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all bg-white text-slate-700"
                                >
                                    <option value="true">Ativo</option>
                                    <option value="false">Inativo</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 sm:mt-14 space-y-4">
                        <input
                            type="submit"
                            value="CADASTRAR LIVRO"
                            className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold text-lg cursor-pointer hover:bg-slate-700 shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                        />
                        <button
                            type="button"
                            onClick={() => navigate('/livros')}
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

export default FormLivro;