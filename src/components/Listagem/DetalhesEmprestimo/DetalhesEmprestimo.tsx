import { useEffect, useState, type JSX } from "react";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import { Message } from "primereact/message";
import EmprestimoRequests from "../../../fetch/EmprestimoRequests";
import type EmprestimoDTO from "../../../dto/EmprestimoDTO";
import { useNavigate } from "react-router-dom";

interface DetalhesEmprestimoProps {
    id_emprestimo: number;
}

/**
 * Componente que exibe os detalhes de um empréstimo.
 * Faz a consulta à API com base no ID fornecido e monta a visualização.
 */
function DetalhesEmprestimo({ id_emprestimo }: DetalhesEmprestimoProps): JSX.Element {
    const [emprestimo, setEmprestimo] = useState<EmprestimoDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function buscarDados() {
            setLoading(true);
            setError(null);

            try {
                const dados = await EmprestimoRequests.obterEmprestimoPorId(id_emprestimo);
                if (dados) {
                    setEmprestimo(dados);
                } else {
                    setError("Empréstimo não encontrado.");
                }
            } catch (err) {
                console.error("Erro ao carregar detalhes do empréstimo:", err);
                setError("Ocorreu um erro ao buscar as informações do empréstimo.");
            } finally {
                setLoading(false);
            }
        }

        buscarDados();
    }, [id_emprestimo]);

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
    if (error || !emprestimo) {
        return (
            <div className="flex justify-center p-4">
                <Message severity="error" text={error || "Erro desconhecido."} />
            </div>
        );
    }

    // Renderização dos detalhes do empréstimo
    return (
        <main className="bg-gray-200 flex-1 py-4 sm:py-10 px-2 sm:px-4 overflow-y-auto">
            <Card 
                title={
                    <div className="flex flex-col gap-1">
                        <span className="text-2xl md:text-3xl font-bold text-slate-800">Empréstimo #{emprestimo.id_emprestimo}</span>
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">Detalhes da Transação</span>
                    </div>
                } 
                className="shadow-xl animate-fade-in transition-all duration-300 w-full max-w-4xl px-2 sm:px-6 py-4 mx-auto rounded-xl overflow-hidden"
            >
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                        <span className="text-slate-600 font-semibold tracking-tight">Status do Empréstimo</span>
                        <Tag 
                            value={emprestimo.status_emprestimo} 
                            severity={emprestimo.status_emprestimo === "Devolvido" ? "success" : "warning"} 
                            className="px-4 py-2 text-base font-bold shadow-sm" 
                        />
                    </div>
 
                    <Divider className="!my-2" />
 
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-1">
                        {/* Seção de Informações do Aluno */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl font-bold text-slate-700 flex items-center gap-2 border-b-2 border-blue-500 pb-2 w-fit">
                                <i className="pi pi-user text-blue-500 text-xl"></i> Informações do Aluno
                            </h3>
                            <div className="flex flex-col gap-4 pl-1">
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-black tracking-widest mb-1">Nome</span>
                                    <span className="text-slate-700 font-bold text-lg">{emprestimo.aluno.nome} {emprestimo.aluno.sobrenome}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-black tracking-widest mb-1">RA</span>
                                    <span className="text-slate-700 font-bold text-lg">{emprestimo.aluno.ra}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-black tracking-widest mb-1">E-mail</span>
                                    <span className="text-slate-700 font-bold text-lg break-all">{emprestimo.aluno.email}</span>
                                </div>
                            </div>
                        </div>
 
                        {/* Seção de Informações do Livro */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl font-bold text-slate-700 flex items-center gap-2 border-b-2 border-orange-500 pb-2 w-fit">
                                <i className="pi pi-book text-orange-500 text-xl"></i> Informações do Livro
                            </h3>
                            <div className="flex flex-col gap-4 pl-1">
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-black tracking-widest mb-1">Título</span>
                                    <span className="text-slate-700 font-bold text-lg">{emprestimo.livro.titulo}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-black tracking-widest mb-1">Autor</span>
                                    <span className="text-slate-700 font-bold text-lg">{emprestimo.livro.autor}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-black tracking-widest mb-1">ISBN</span>
                                    <span className="text-slate-700 font-bold text-lg">{emprestimo.livro.isbn}</span>
                                </div>
                            </div>
                        </div>
 
                        {/* Seção de Datas */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl font-bold text-slate-700 flex items-center gap-2 border-b-2 border-green-500 pb-2 w-fit">
                                <i className="pi pi-calendar text-green-500 text-xl"></i> Datas do Empréstimo
                            </h3>
                            <div className="flex flex-col gap-4 pl-1">
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-black tracking-widest mb-1">Data de Empréstimo</span>
                                    <span className="text-slate-700 font-bold text-lg">{new Date(emprestimo.data_emprestimo).toLocaleDateString('pt-BR')}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-black tracking-widest mb-1">Previsão de Devolução</span>
                                    <span className="text-slate-700 font-bold text-lg">
                                        {emprestimo.data_devolucao ? new Date(emprestimo.data_devolucao).toLocaleDateString('pt-BR') : "Não definida"}
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
                    className="w-full bg-slate-700 hover:bg-slate-800 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 text-lg"
                    onClick={() => navigate(`/atualizar/emprestimo/${emprestimo.id_emprestimo}`)}
                >
                    <i className="pi pi-sync"></i>
                    Atualizar Empréstimo
                </button>
                <button
                    className="w-full bg-white text-slate-700 hover:bg-gray-50 border-2 border-slate-700 px-6 py-4 rounded-xl font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 text-lg"
                    onClick={() => navigate(`/emprestimos`)}
                >
                    <i className="pi pi-arrow-left"></i>
                    Voltar para Listagem
                </button>
            </div>
        </main>
    );
}

export default DetalhesEmprestimo;
