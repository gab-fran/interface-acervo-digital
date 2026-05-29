import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlunoRequests from '../../../fetch/AlunoRequests';
import type AlunoDTO from '../../../dto/AlunoDTO';
import Utilitario from '../../../utils/Utilitario';
import PaginaConteudo from '../../Comuns/PaginaConteudo';
import CabecalhoPagina from '../../Comuns/CabecalhoPagina';
import CardConteudo from '../../Comuns/CardConteudo';
import CampoFormulario from '../../Comuns/CampoFormulario';
import { ui } from '../../Comuns/styles';

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'celular') {
            const celularFormatado = Utilitario.formatarTelefone(value);
            setFormData(prev => ({ ...prev, [name]: celularFormatado }));
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!Utilitario.validarEmail(formData.email)) {
            alert("E-mail invalido");
            return;
        }

        const resposta = await AlunoRequests.enviarFormularioAluno(formData);
        if (resposta) {
            alert("Aluno cadastrado com sucesso");
        } else {
            alert("Erro ao cadastrar aluno");
        }
    };

    return (
        <PaginaConteudo formLayout>
            <CabecalhoPagina
                titulo="Cadastro de Aluno"
                subtitulo="Preencha os dados para incluir um novo aluno no acervo"
            />

            <form onSubmit={handleSubmit}>
                <CardConteudo asForm>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                        <CampoFormulario htmlFor="nome" label="Nome">
                            <input
                                type="text"
                                name="nome"
                                id="nome"
                                required
                                minLength={3}
                                onChange={handleChange}
                                placeholder="Digite o nome"
                                className={ui.input}
                            />
                        </CampoFormulario>

                        <CampoFormulario htmlFor="sobrenome" label="Sobrenome">
                            <input
                                type="text"
                                name="sobrenome"
                                id="sobrenome"
                                required
                                minLength={3}
                                onChange={handleChange}
                                placeholder="Digite o sobrenome"
                                className={ui.input}
                            />
                        </CampoFormulario>

                        <CampoFormulario htmlFor="data_nascimento" label="Data de Nascimento">
                            <input
                                type="date"
                                name="data_nascimento"
                                id="data_nascimento"
                                onChange={handleChange}
                                className={ui.input}
                            />
                        </CampoFormulario>

                        <CampoFormulario htmlFor="celular" label="Celular">
                            <input
                                type="tel"
                                name="celular"
                                id="celular"
                                value={formData.celular}
                                onChange={handleChange}
                                placeholder="(xx) x xxxx-xxxx"
                                className={ui.input}
                            />
                        </CampoFormulario>

                        <CampoFormulario htmlFor="endereco" label="Endereco">
                            <input
                                type="text"
                                name="endereco"
                                id="endereco"
                                minLength={6}
                                onChange={handleChange}
                                placeholder="Rua, numero, bairro..."
                                className={ui.input}
                            />
                        </CampoFormulario>

                        <CampoFormulario htmlFor="email" label="E-mail">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleChange}
                                placeholder="exemplo@email.com"
                                className={ui.input}
                            />
                        </CampoFormulario>
                    </div>

                    <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <button type="submit" className={ui.primaryButton}>
                            <i className="pi pi-check-circle"></i>
                            Cadastrar Aluno
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/alunos')}
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

export default FormAluno;
