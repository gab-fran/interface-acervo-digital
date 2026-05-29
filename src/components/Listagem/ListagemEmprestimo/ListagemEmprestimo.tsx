import { type JSX } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import EmprestimoRequests from "../../../fetch/EmprestimoRequests";
import type EmprestimoDTO from "../../../dto/EmprestimoDTO";
import { ui } from "../../Comuns/styles";

const REGISTROS_POR_PAGINA = 10;

function ListagemEmprestimo(): JSX.Element {
    const [emprestimos, setEmprestimos] = useState<EmprestimoDTO[]>([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmprestimos = async () => {
            try {
                const listaDeEmprestimos = await EmprestimoRequests.obterListaDeEmprestimos();
                setEmprestimos(Array.isArray(listaDeEmprestimos) ? listaDeEmprestimos : []);
            } catch (error) {
                console.error(`Erro ao buscar emprestimos. ${error}`);
                alert("Erro ao criar listagem de emprestimos");
            }
        };

        fetchEmprestimos();
    }, []);

    const handleRemoverEmprestimo = async (id_emprestimo: number, titulo: string) => {
        if (window.confirm(`Tem certeza que deseja remover o emprestimo: "${titulo}"?`)) {
            const sucesso = await EmprestimoRequests.removerEmprestimo(id_emprestimo);
            if (sucesso) {
                alert("Emprestimo removido com sucesso!");
                const novoTotal = emprestimos.length - 1;
                const novaTotalPaginas = Math.ceil(novoTotal / REGISTROS_POR_PAGINA);
                if (paginaAtual > novaTotalPaginas && novaTotalPaginas > 0) {
                    setPaginaAtual(novaTotalPaginas);
                }
                setEmprestimos(prev => prev.filter(emprestimo => emprestimo.id_emprestimo !== id_emprestimo));
            } else {
                alert("Não foi possível remover o emprestimo.");
            }
        }
    };

    // Cálculos de paginação
    const totalPaginas = Math.max(1, Math.ceil(emprestimos.length / REGISTROS_POR_PAGINA));
    const inicio = (paginaAtual - 1) * REGISTROS_POR_PAGINA;
    const emprestimosDaPagina = emprestimos.slice(inicio, inicio + REGISTROS_POR_PAGINA);

    // Gera os números de página a exibir (com reticências quando há muitas páginas)
    const gerarPaginas = (): (number | "...")[] => {
        if (totalPaginas <= 7) {
            return Array.from({ length: totalPaginas }, (_, i) => i + 1);
        }
        const paginas: (number | "...")[] = [1];
        if (paginaAtual > 3) paginas.push("...");
        for (let i = Math.max(2, paginaAtual - 1); i <= Math.min(totalPaginas - 1, paginaAtual + 1); i++) {
            paginas.push(i);
        }
        if (paginaAtual < totalPaginas - 2) paginas.push("...");
        paginas.push(totalPaginas);
        return paginas;
    };

    return (
        <main className="bg-gray-200 flex-1 py-6 px-3 sm:px-4 overflow-x-hidden">
            {/* Cabeçalho */}
            <div className="max-w-[100rem] mx-auto flex flex-col md:flex-row items-center md:items-end justify-between pt-6 px-4 mb-6 gap-4">
                <div className="hidden md:block w-1/4" />
                <div className="text-center flex-1">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-800">Empréstimos</h1>
                    <p className="text-lg md:text-xl text-gray-600">Gestão de empréstimos e devoluções</p>
                </div>
                <div className="w-full md:w-auto flex justify-center md:justify-end">
                    <button
                        onClick={() => navigate("/cadastro/emprestimo")}
                        className={ui.headerActionButton}
                    >
                        <i className="pi pi-plus-circle"></i>
                        Novo Empréstimo
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto mb-6 px-4">
                <div className="relative group">
                    <i className="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-slate-700 transition-colors"></i>
                    <input 
                        type="text" 
                        name="busca-emprestimo" 
                        id="busca-emprestimo" 
                        placeholder="Buscar por aluno, livro ou status..." 
                        className="w-full pl-12 pr-4 py-3 md:py-4 border-2 border-transparent bg-white rounded-xl shadow-sm focus:border-slate-700 focus:ring-0 transition-all outline-none text-slate-700" 
                    />
                </div>
            </div>

            <div className={ui.tableWrapper}>
                <table className={ui.table}>
                    <thead className="bg-slate-700 sticky top-0">
                        <tr>
                            <th className="bg-slate-700 text-white p-3 text-left font-semibold">Aluno / Livro</th>
                            <th className="hidden md:table-cell bg-slate-700 text-white p-3 text-left font-semibold">Data Empréstimo</th>
                            <th className="hidden lg:table-cell bg-slate-700 text-white p-3 text-left font-semibold">Data Devolução</th>
                            <th className="hidden md:table-cell bg-slate-700 text-white p-3 text-left font-semibold">Status</th>
                            <th className="hidden xl:table-cell bg-slate-700 text-white p-3 text-left font-semibold">Valor Livro</th>
                            <th className="bg-slate-700 text-white p-3 text-center font-semibold">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {emprestimosDaPagina.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="p-6 text-center text-gray-400">
                                    Nenhum empréstimo encontrado.
                                </td>
                            </tr>
                        ) : (
                            emprestimosDaPagina.map((emprestimo) => (
                                <tr
                                    key={emprestimo.id_emprestimo}
                                    className="hover:bg-blue-50 transition-colors duration-200 even:bg-gray-50"
                                >
                                    <td className="p-3 text-gray-700 font-bold md:font-medium">
                                        <div className="flex flex-col">
                                            <span>{emprestimo.aluno.nome}</span>
                                            <span className="text-xs text-gray-500 md:hidden italic">{emprestimo.livro.titulo}</span>
                                        </div>
                                    </td>
                                    <td className="hidden md:table-cell p-3 text-gray-700">{new Date(emprestimo.data_emprestimo).toLocaleDateString()}</td>
                                    <td className="hidden lg:table-cell p-3 text-gray-700">{emprestimo.data_devolucao ? new Date(emprestimo.data_devolucao).toLocaleDateString() : "-"}</td>
                                    <td className="hidden md:table-cell p-3 text-gray-700">{emprestimo.status_emprestimo}</td>
                                    <td className="hidden xl:table-cell p-3 text-gray-700">{emprestimo.livro.valor_aquisicao}</td>
                                    <td className="p-3">
                                        <div className="flex flex-wrap justify-center gap-2">
                                            <button
                                                onClick={() => navigate(`/emprestimo/detalhes/${emprestimo.id_emprestimo}`)}
                                                className="flex-1 md:flex-none bg-sky-500 hover:bg-sky-600 text-white px-3 py-2 rounded-md shadow-sm transition-colors text-xs font-semibold flex items-center justify-center gap-1"
                                                title="Visualizar Detalhes"
                                            >
                                                <i className="pi pi-eye"></i>
                                                <span className="hidden lg:inline">Detalhes</span>
                                            </button>
                                            <button
                                                onClick={() => navigate(`/atualizar/emprestimo/${emprestimo.id_emprestimo}`)}
                                                className="flex-1 md:flex-none bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md shadow-sm transition-colors text-xs font-semibold flex items-center justify-center gap-1"
                                                title="Atualizar Empréstimo"
                                            >
                                                <i className="pi pi-pencil"></i>
                                                <span className="hidden lg:inline">Atualizar</span>
                                            </button>
                                            <button
                                                onClick={() => handleRemoverEmprestimo(emprestimo.id_emprestimo!, emprestimo.livro.titulo!)}
                                                className="flex-1 md:flex-none bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md shadow-sm transition-colors text-xs font-semibold flex items-center justify-center gap-1"
                                                title="Remover Empréstimo"
                                            >
                                                <i className="pi pi-trash"></i>
                                                <span className="hidden lg:inline">Remover</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Paginação */}
            <div className="max-w-[100rem] mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Contador de registros */}
                <p className="text-gray-600 text-sm order-2 md:order-1">
                    Exibindo{" "}
                    <span className="font-semibold text-slate-700">
                        {emprestimos.length === 0 ? 0 : inicio + 1}–{Math.min(inicio + REGISTROS_POR_PAGINA, emprestimos.length)}
                    </span>{" "}
                    de <span className="font-semibold text-slate-700">{emprestimos.length}</span> empréstimos
                </p>
 
                {/* Controles de navegação */}
                <nav className="flex items-center gap-1 order-1 md:order-2" aria-label="Paginação">
                    {/* Primeira página */}
                    <button
                        onClick={() => setPaginaAtual(1)}
                        disabled={paginaAtual === 1}
                        title="Primeira página"
                        className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-700 disabled:opacity-40 hover:bg-slate-200 transition-colors border border-gray-300 md:border-transparent"
                    >«</button>
 
                    {/* Página anterior */}
                    <button
                        onClick={() => setPaginaAtual(p => p - 1)}
                        disabled={paginaAtual === 1}
                        title="Página anterior"
                        className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-700 disabled:opacity-40 hover:bg-slate-200 transition-colors border border-gray-300 md:border-transparent"
                    >‹</button>
 
                    {/* Números de página */}
                    <div className="flex items-center gap-1 overflow-x-auto max-w-[200px] sm:max-w-none px-1">
                        {gerarPaginas().map((pagina, idx) =>
                            pagina === "..." ? (
                                <span key={`ellipsis-${idx}`} className="px-2 py-1.5 text-gray-400 select-none">…</span>
                            ) : (
                                <button
                                    key={pagina}
                                    onClick={() => setPaginaAtual(pagina as number)}
                                    className={`min-w-[40px] h-10 px-2 rounded-lg text-sm font-bold transition-all ${
                                        paginaAtual === pagina
                                            ? "bg-slate-700 text-white shadow-lg transform scale-105"
                                            : "text-slate-700 hover:bg-slate-200 border border-gray-300 md:border-transparent"
                                    }`}
                                >
                                    {pagina}
                                </button>
                            )
                        )}
                    </div>
 
                    {/* Próxima página */}
                    <button
                        onClick={() => setPaginaAtual(p => p + 1)}
                        disabled={paginaAtual === totalPaginas}
                        title="Próxima página"
                        className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-700 disabled:opacity-40 hover:bg-slate-200 transition-colors border border-gray-300 md:border-transparent"
                    >›</button>
 
                    {/* Última página */}
                    <button
                        onClick={() => setPaginaAtual(totalPaginas)}
                        disabled={paginaAtual === totalPaginas}
                        title="Última página"
                        className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-700 disabled:opacity-40 hover:bg-slate-200 transition-colors border border-gray-300 md:border-transparent"
                    >»</button>
                </nav>
            </div>
        </main>
    );
}

export default ListagemEmprestimo;
