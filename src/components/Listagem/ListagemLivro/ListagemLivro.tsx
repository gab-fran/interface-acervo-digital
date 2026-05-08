import { type JSX } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type LivroDTO from "../../../dto/LivroDTO";
import LivroRequests from "../../../fetch/LivroRequests";

const REGISTROS_POR_PAGINA = 10;

function ListagemLivro(): JSX.Element {
    const [livros, setLivros] = useState<LivroDTO[]>([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLivros = async () => {
            try {
                const listaDeLivros = await LivroRequests.obterListaDeLivros();
                setLivros(Array.isArray(listaDeLivros) ? listaDeLivros : []);
            } catch (error) {
                console.error(`Erro ao buscar livros. ${error}`);
                alert("Erro ao criar listagem de livros");
            }
        };

        fetchLivros();
    }, []);

    const handleRemoverLivro = async (id_livro: number, titulo: string) => {
        if (window.confirm(`Tem certeza que deseja remover o livro: "${titulo}"?`)) {
            const sucesso = await LivroRequests.removerLivro(id_livro);
            if (sucesso) {
                alert("Livro removido com sucesso!");
                const novoTotal = livros.length - 1;
                const novaTotalPaginas = Math.ceil(novoTotal / REGISTROS_POR_PAGINA);
                if (paginaAtual > novaTotalPaginas && novaTotalPaginas > 0) {
                    setPaginaAtual(novaTotalPaginas);
                }
                setLivros(prev => prev.filter(livro => livro.id_livro !== id_livro));
            } else {
                alert("Não foi possível remover o livro.");
            }
        }
    };

    // Cálculos de paginação
    const totalPaginas = Math.max(1, Math.ceil(livros.length / REGISTROS_POR_PAGINA));
    const inicio = (paginaAtual - 1) * REGISTROS_POR_PAGINA;
    const livrosDaPagina = livros.slice(inicio, inicio + REGISTROS_POR_PAGINA);

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
        <main className="bg-gray-200 pb-6 min-h-screen">
            {/* Cabeçalho */}
            <div className="max-w-[100rem] mx-auto grid grid-cols-1 sm:grid-cols-3 items-end pt-[1.5rem] px-4 mb-4 gap-4 sm:gap-0">
                <div className="sm:hidden text-center">
                    <h1 className="text-[2rem] sm:text-[3rem]">Livros</h1>
                    <p className="text-[1.25rem] sm:text-[1.75rem] text-gray-600">Lista de livros</p>
                </div>
                <div /> {/* Spacer para centralizar o título */}
                <div className="text-center hidden sm:block">
                    <h1 className="text-[2rem] sm:text-[3rem]">Livros</h1>
                    <p className="text-[1.25rem] sm:text-[1.75rem] text-gray-600">Lista de livros</p>
                </div>
                <div className="flex justify-center sm:justify-end">
                    <button
                        onClick={() => navigate("/cadastro/livro")}
                        className="bg-slate-700 hover:bg-slate-800 text-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 font-semibold text-base sm:text-lg mb-2 w-full sm:w-auto min-h-[48px]"
                    >
                        <i className="pi pi-plus-circle"></i>
                        <span className="hidden xs:inline">Novo Livro</span>
                        <span className="xs:hidden">Novo</span>
                    </button>
                </div>
            </div>

            <div className="flex justify-center mb-4 px-4">
                <input 
                    type="text" 
                    name="busca-livro" 
                    id="busca-livro" 
                    placeholder="Buscar livro" 
                    className="w-full max-w-6xl mx-auto p-3 sm:p-2 md:mb-4 border-b-2 border-slate-700 rounded-sm bg-white min-h-[48px] text-base"
                />
            </div>

            {/* Tabela Responsiva */}
            <div className="table-responsive max-w-[100rem] mx-auto bg-white mb-4 shadow-md">
                <table className="w-full border-collapse bg-white">
                    <thead className="bg-slate-700 sticky top-0 z-10">
                        <tr>
                            <th className="bg-slate-700 text-white p-2 sm:p-3 text-left font-semibold text-xs sm:text-sm">Título</th>
                            <th className="bg-slate-700 text-white p-2 sm:p-3 text-left font-semibold text-xs sm:text-sm hide-on-mobile">Autor</th>
                            <th className="bg-slate-700 text-white p-2 sm:p-3 text-left font-semibold text-xs sm:text-sm hide-on-tablet">Editora</th>
                            <th className="bg-slate-700 text-white p-2 sm:p-3 text-left font-semibold text-xs sm:text-sm hide-on-tablet">Ano</th>
                            <th className="bg-slate-700 text-white p-2 sm:p-3 text-left font-semibold text-xs sm:text-sm hide-on-mobile">ISBN</th>
                            <th className="bg-slate-700 text-white p-2 sm:p-3 text-left font-semibold text-xs sm:text-sm hide-on-tablet">Qtd. Total</th>
                            <th className="bg-slate-700 text-white p-2 sm:p-3 text-left font-semibold text-xs sm:text-sm hide-on-tablet">Disponível</th>
                            <th className="bg-slate-700 text-white p-2 sm:p-3 text-left font-semibold text-xs sm:text-sm hide-on-mobile">Valor</th>
                            <th className="bg-slate-700 text-white p-2 sm:p-3 text-left font-semibold text-xs sm:text-sm">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {livrosDaPagina.length === 0 ? (
                            <tr>
                                <td colSpan={9} className="p-6 text-center text-gray-400">
                                    Nenhum livro encontrado.
                                </td>
                            </tr>
                        ) : (
                            livrosDaPagina.map((livro) => (
                                <tr
                                    key={livro.id_livro ?? livro.isbn}
                                    className="hover:bg-blue-50 transition-colors duration-200 even:bg-gray-50"
                                >
                                    <td className="p-2 sm:p-3 text-gray-700 font-medium text-xs sm:text-sm max-w-[150px] sm:max-w-none truncate">{livro.titulo}</td>
                                    <td className="p-2 sm:p-3 text-gray-700 text-xs sm:text-sm hide-on-mobile max-w-[120px] sm:max-w-none truncate">{livro.autor}</td>
                                    <td className="p-2 sm:p-3 text-gray-700 text-xs sm:text-sm hide-on-tablet max-w-[100px] sm:max-w-none truncate">{livro.editora}</td>
                                    <td className="p-2 sm:p-3 text-gray-700 text-xs sm:text-sm hide-on-tablet">{livro.ano_publicacao}</td>
                                    <td className="p-2 sm:p-3 text-gray-700 text-xs sm:text-sm hide-on-mobile">{livro.isbn}</td>
                                    <td className="p-2 sm:p-3 text-gray-700 text-xs sm:text-sm hide-on-tablet">{livro.quant_total}</td>
                                    <td className="p-2 sm:p-3 text-gray-700 text-xs sm:text-sm hide-on-tablet">{livro.quant_disponivel}</td>
                                    <td className="p-2 sm:p-3 text-gray-700 text-xs sm:text-sm hide-on-mobile">{livro.valor_aquisicao}</td>
                                    <td className="p-2 sm:p-3 text-gray-700">
                                        <div className="flex flex-wrap gap-1 sm:gap-2">
                                            <button
                                                onClick={() => navigate(`/livro/detalhes/${livro.id_livro}`)}
                                                className="bg-sky-500 hover:bg-sky-600 text-white px-2 sm:px-3 py-1.5 sm:py-1 rounded shadow-sm transition-colors text-xs sm:text-sm font-medium min-h-[44px] sm:min-h-auto"
                                                title="Detalhes"
                                            >
                                                <i className="pi pi-eye"></i>
                                                <span className="hidden sm:inline ml-1">Detalhes</span>
                                            </button>
                                            <button
                                                onClick={() => navigate(`/atualizar/livro/${livro.id_livro}`)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-2 sm:px-3 py-1.5 sm:py-1 rounded shadow-sm transition-colors text-xs sm:text-sm font-medium min-h-[44px] sm:min-h-auto"
                                                title="Atualizar"
                                            >
                                                <i className="pi pi-pencil"></i>
                                                <span className="hidden sm:inline ml-1">Atualizar</span>
                                            </button>
                                            <button
                                                onClick={() => handleRemoverLivro(livro.id_livro!, livro.titulo)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 py-1.5 sm:py-1 rounded shadow-sm transition-colors text-xs sm:text-sm font-medium min-h-[44px] sm:min-h-auto"
                                                title="Remover"
                                            >
                                                <i className="pi pi-trash"></i>
                                                <span className="hidden sm:inline ml-1">Remover</span>
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
            <div className="max-w-[100rem] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                {/* Contador de registros */}
                <p className="text-gray-600 text-xs sm:text-sm text-center sm:text-left">
                    Exibindo{" "}
                    <span className="font-semibold text-slate-700">
                        {livros.length === 0 ? 0 : inicio + 1}–{Math.min(inicio + REGISTROS_POR_PAGINA, livros.length)}
                    </span>{" "}
                    de <span className="font-semibold text-slate-700">{livros.length}</span> livros
                </p>

                {/* Controles de navegação */}
                <nav className="flex items-center gap-1 flex-wrap justify-center" aria-label="Paginação">
                    {/* Primeira página */}
                    <button
                        onClick={() => setPaginaAtual(1)}
                        disabled={paginaAtual === 1}
                        title="Primeira página"
                        className="px-2 py-1.5 rounded text-xs sm:text-sm text-slate-700 disabled:opacity-40 hover:bg-slate-200 transition-colors min-h-[44px] sm:min-h-auto"
                    >«</button>

                    {/* Página anterior */}
                    <button
                        onClick={() => setPaginaAtual(p => p - 1)}
                        disabled={paginaAtual === 1}
                        title="Página anterior"
                        className="px-3 py-1.5 rounded text-xs sm:text-sm text-slate-700 disabled:opacity-40 hover:bg-slate-200 transition-colors min-h-[44px] sm:min-h-auto"
                    >‹</button>

                    {/* Números de página */}
                    {gerarPaginas().map((pagina, idx) =>
                        pagina === "..." ? (
                            <span key={`ellipsis-${idx}`} className="px-2 py-1.5 text-gray-400 select-none min-h-[44px] sm:min-h-auto flex items-center">…</span>
                        ) : (
                            <button
                                key={pagina}
                                onClick={() => setPaginaAtual(pagina as number)}
                                className={`px-3 py-1.5 rounded text-xs sm:text-sm font-medium transition-colors min-h-[44px] sm:min-h-auto ${
                                    paginaAtual === pagina
                                        ? "bg-slate-700 text-white shadow"
                                        : "text-slate-700 hover:bg-slate-200"
                                }`}
                            >
                                {pagina}
                            </button>
                        )
                    )}

                    {/* Próxima página */}
                    <button
                        onClick={() => setPaginaAtual(p => p + 1)}
                        disabled={paginaAtual === totalPaginas}
                        title="Próxima página"
                        className="px-3 py-1.5 rounded text-xs sm:text-sm text-slate-700 disabled:opacity-40 hover:bg-slate-200 transition-colors min-h-[44px] sm:min-h-auto"
                    >›</button>

                    {/* Última página */}
                    <button
                        onClick={() => setPaginaAtual(totalPaginas)}
                        disabled={paginaAtual === totalPaginas}
                        title="Última página"
                        className="px-2 py-1.5 rounded text-xs sm:text-sm text-slate-700 disabled:opacity-40 hover:bg-slate-200 transition-colors min-h-[44px] sm:min-h-auto"
                    >»</button>
                </nav>
            </div>
        </main>
    );
}

export default ListagemLivro;