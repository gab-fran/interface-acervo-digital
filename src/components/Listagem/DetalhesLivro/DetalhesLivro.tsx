import { useEffect, useState, type JSX } from "react";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import { Message } from "primereact/message";
import LivroRequests from "../../../fetch/LivroRequests";
import type LivroDTO from "../../../dto/LivroDTO";
import { useNavigate } from "react-router-dom";

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
        <main className="bg-gray-200 flex-1 py-6 sm:py-10 px-4 overflow-y-auto">
            <Card title={`${livro.titulo}`} className="shadow-lg animate-fade-in transition-all duration-300 w-full max-w-4xl p-4 sm:p-6 md:p-8 mx-auto font-bold text-xl">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <span className="text-gray-500 font-medium tracking-tight">ISBN</span>
                        <Tag value={livro.isbn} severity="info" className="px-3 py-1" />
                    </div>

                    <Divider />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
                        {/* Seção de Informações do Livro */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-lg font-semibold text-primary-700 flex items-center gap-2">
                                <i className="pi pi-book text-blue-500"></i> Informações do Livro
                            </h3>
                            <div className="flex flex-col gap-3 ml-1 border-l-2 border-blue-50 relative pl-4">
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Autor</span>
                                    <span className="text-gray-700 font-medium">{livro.autor}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Editora</span>
                                    <span className="text-gray-700 font-medium break-all">{livro.editora}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Ano de Publicação</span>
                                    <span className="text-gray-700 font-medium">{livro.ano_publicacao}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Status do Livro</span>
                                    <Tag
                                        value={livro.status_livro ? "Ativo" : "Inativo"}
                                        severity={livro.status_livro ? "success" : "danger"}
                                        className="w-fit mt-1 rounded-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Seção de Acervo e Valores */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-lg font-semibold text-primary-700 flex items-center gap-2">
                                <i className="pi pi-box text-orange-500"></i> Acervo e Valores
                            </h3>
                            <div className="flex flex-col gap-3 ml-1 border-l-2 border-orange-50 relative pl-4">
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Quantidade Total</span>
                                    <span className="text-gray-700 font-medium">{livro.quant_total}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Quantidade Disponível</span>
                                    <span className="text-gray-700 font-medium">{livro.quant_disponivel}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Valor de Aquisição</span>
                                    <span className="text-gray-700 font-medium">
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
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
            </Card>
            <div className="w-full max-w-4xl mx-auto mt-6 sm:mt-8">
                <button
                    className="w-full bg-slate-700 hover:bg-slate-500 text-white px-4 py-3 md:mb-2 rounded-md font-bold transition-all shadow-md active:scale-95"
                    onClick={() => navigate(`/atualizar/livro/${livro.id_livro}`)}
                >
                    Editar Livro
                </button>
                <button
                    className="w-full bg-white text-black hover:bg-slate-500 px-4 py-3 rounded-md font-bold transition-all shadow-md active:scale-95"
                    onClick={() => navigate(`/livros`)}
                >
                    Voltar
                </button>
            </div>
        </main>
    );
}

export default DetalhesLivro;