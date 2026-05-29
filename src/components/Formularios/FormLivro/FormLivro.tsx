import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LivroRequests from '../../../fetch/LivroRequests';
import type LivroDTO from '../../../dto/LivroDTO';
import PaginaConteudo from '../../Comuns/PaginaConteudo';
import CabecalhoPagina from '../../Comuns/CabecalhoPagina';
import CardConteudo from '../../Comuns/CardConteudo';
import CampoFormulario from '../../Comuns/CampoFormulario';
import { ui } from '../../Comuns/styles';

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const resposta = await LivroRequests.enviarFormularioLivro(formData);
        if (resposta) {
            alert("Livro cadastrado com sucesso");
            navigate('/livros');
        } else {
            alert("Erro ao cadastrar livro");
        }
    };

    return (
        <PaginaConteudo formLayout>
            <CabecalhoPagina
                titulo="Cadastro de Livro"
                subtitulo="Cadastre livros, estoque e disponibilidade do acervo"
            />

            <form onSubmit={handleSubmit}>
                <CardConteudo asForm>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                        <CampoFormulario htmlFor="titulo" label="Titulo">
                            <input
                                type="text"
                                name="titulo"
                                id="titulo"
                                required
                                value={formData.titulo}
                                onChange={handleChange}
                                placeholder="Digite o titulo do livro"
                                className={ui.input}
                            />
                        </CampoFormulario>

                        <CampoFormulario htmlFor="autor" label="Autor">
                            <input
                                type="text"
                                name="autor"
                                id="autor"
                                required
                                value={formData.autor}
                                onChange={handleChange}
                                placeholder="Digite o nome do autor"
                                className={ui.input}
                            />
                        </CampoFormulario>

                        <CampoFormulario htmlFor="editora" label="Editora">
                            <input
                                type="text"
                                name="editora"
                                id="editora"
                                required
                                value={formData.editora}
                                onChange={handleChange}
                                placeholder="Digite a editora"
                                className={ui.input}
                            />
                        </CampoFormulario>

                        <CampoFormulario htmlFor="ano_publicacao" label="Ano de Publicacao">
                            <input
                                type="text"
                                name="ano_publicacao"
                                id="ano_publicacao"
                                required
                                value={formData.ano_publicacao}
                                onChange={handleChange}
                                placeholder="Ex: 2024"
                                className={ui.input}
                            />
                        </CampoFormulario>

                        <CampoFormulario htmlFor="isbn" label="ISBN">
                            <input
                                type="text"
                                name="isbn"
                                id="isbn"
                                required
                                value={formData.isbn}
                                onChange={handleChange}
                                placeholder="Digite o ISBN"
                                className={ui.input}
                            />
                        </CampoFormulario>

                        <CampoFormulario htmlFor="valor_aquisicao" label="Valor de Aquisicao">
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
                                className={ui.input}
                            />
                        </CampoFormulario>

                        <CampoFormulario htmlFor="quant_total" label="Quantidade Total">
                            <input
                                type="number"
                                name="quant_total"
                                id="quant_total"
                                required
                                min="0"
                                value={formData.quant_total || ''}
                                onChange={handleChange}
                                placeholder="Ex: 10"
                                className={ui.input}
                            />
                        </CampoFormulario>

                        <CampoFormulario htmlFor="quant_disponivel" label="Quantidade Disponivel">
                            <input
                                type="number"
                                name="quant_disponivel"
                                id="quant_disponivel"
                                required
                                min="0"
                                value={formData.quant_disponivel || ''}
                                onChange={handleChange}
                                placeholder="Ex: 10"
                                className={ui.input}
                            />
                        </CampoFormulario>
                    </div>

                    <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <button type="submit" className={ui.primaryButton}>
                            <i className="pi pi-check-circle"></i>
                            Cadastrar Livro
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/livros')}
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

export default FormLivro;
