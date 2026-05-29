import { useEffect, useState, type JSX } from "react";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import { Message } from "primereact/message";
import LivroRequests from "../../../fetch/LivroRequests";
import type LivroDTO from "../../../dto/LivroDTO";
import { useNavigate } from "react-router-dom";
import { ui } from "../../Comuns/styles";

interface DetalhesLivroProps {
    id_livro: number;
}

/**
 * Componente que exibe os detalhes de um livro.
 * Faz a consulta à API com base no ID fornecido e monta a visualização.
 */
function DetalhesLivro({ id_livro }: DetalhesLivroProps): JSX.Element {
    const [livro, setLivro] = useState<LivroDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function buscarDados() {
            setLoading(true);
            setError(null);

            try {
                const dados = await LivroRequests.obterLivroPorId(id_livro);
                if (dados) {
                    setLivro(dados);
                } else {
                    setError("Livro não encontrado.");
                }
            } catch (err) {
                console.error("Erro ao carregar detalhes do livro:", err);
                setError("Ocorreu um erro ao buscar as informações do livro.");
            } finally {
                setLoading(false);
            }
        }

        buscarDados();
    }, [id_livro]);

    // Renderização do estado de carregamento (Skeleton)
    if (loading) {
        return (
            <Card className="shadow-4">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <Skeleton shape="circle" size="4rem"></Skeleton>
                        <div className="flex-1">
                            <Skeleton width="60%" height="2rem" className="mb-2"></Skeleton>
                            <Skeleton width="40%"></Skeleton>
                        </div>
                    </div>
                    <Divider />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i}>
                                <Skeleton width="30%" className="mb-2"></Skeleton>
                                <Skeleton width="80%" height="1.5rem"></Skeleton>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        );
    }

    // Renderização do estado de erro
    if (error || !livro) {
        return (
            <div className="flex justify-center p-4">
                <Message severity="error" text={error || "Erro desconhecido."} />
            </div>
        );
    }

    // Renderização dos detalhes do livro
    return (
        <main className="bg-gray-200 flex-1 py-6 sm:py-10 px-3 sm:px-4 overflow-x-hidden">
            <Card 
                title={
                    <div className="flex flex-col gap-1">
                        <span className="text-2xl md:text-3xl font-bold text-slate-800">{livro.titulo}</span>
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">Detalhes do Livro</span>
                    </div>
                } 
                className="shadow-xl animate-fade-in transition-all duration-300 w-full max-w-4xl px-2 sm:px-6 py-4 mx-auto rounded-xl overflow-hidden"
            >
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                        <span className="text-slate-600 font-semibold tracking-tight">ISBN</span>
                        <Tag value={livro.isbn} severity="info" className="px-4 py-2 text-base font-bold shadow-sm" />
                    </div>
 
                    <Divider className="!my-2" />
 
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-1">
                        {/* Seção de Informações do Livro */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl font-bold text-slate-700 flex items-center gap-2 border-b-2 border-blue-500 pb-2 w-fit">
                                <i className="pi pi-book text-blue-500 text-xl"></i> Informações do Livro
                            </h3>
                            <div className="flex flex-col gap-4 pl-1">
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-black tracking-widest mb-1">Autor</span>
                                    <span className="text-slate-700 font-bold text-lg">{livro.autor}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-black tracking-widest mb-1">Editora</span>
                                    <span className="text-slate-700 font-bold text-lg break-all">{livro.editora}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-black tracking-widest mb-1">Ano de Publicação</span>
                                    <span className="text-slate-700 font-bold text-lg">{livro.ano_publicacao}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-black tracking-widest mb-1">Status do Livro</span>
                                    <Tag
                                        value={livro.status_livro ? "Ativo" : "Inativo"}
                                        severity={livro.status_livro ? "success" : "danger"}
                                        className="w-fit mt-1 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm"
                                    />
                                </div>
                            </div>
                        </div>
 
                        {/* Seção de Acervo e Valores */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl font-bold text-slate-700 flex items-center gap-2 border-b-2 border-orange-500 pb-2 w-fit">
                                <i className="pi pi-box text-orange-500 text-xl"></i> Acervo e Valores
                            </h3>
                            <div className="flex flex-col gap-4 pl-1">
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-black tracking-widest mb-1">Quantidade Total</span>
                                    <span className="text-slate-700 font-bold text-lg">{livro.quant_total}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-black tracking-widest mb-1">Quantidade Disponível</span>
                                    <span className="text-slate-700 font-bold text-lg">{livro.quant_disponivel}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-black tracking-widest mb-1">Valor de Aquisição</span>
                                    <span className="text-slate-700 font-bold text-lg">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(livro.valor_aquisicao)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
 
                <style>{`
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
            </Card>
            <div className="w-full max-w-4xl mx-auto mt-8 flex flex-col gap-3 px-2 sm:px-0">
                <button
                    className={ui.primaryButton}
                    onClick={() => navigate(`/atualizar/livro/${livro.id_livro}`)}
                >
                    <i className="pi pi-pencil"></i>
                    Editar Livro
                </button>
                <button
                    className={ui.secondaryButton}
                    onClick={() => navigate(`/livros`)}
                >
                    <i className="pi pi-arrow-left"></i>
                    Voltar para Listagem
                </button>
            </div>
        </main>
    );
}

export default DetalhesLivro;
