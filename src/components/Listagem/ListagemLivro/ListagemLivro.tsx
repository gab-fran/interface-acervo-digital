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
        <main className="bg-gray-200 pb-6">
            {/* Cabeçalho */}
            <div className="max-w-[100rem] mx-auto flex flex-col md:flex-row items-center md:items-end justify-between pt-6 px-4 mb-6 gap-4">
                <div className="hidden md:block w-1/4" />
                <div className="text-center flex-1">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-800">Livros</h1>
                    <p className="text-lg md:text-xl text-gray-600">Catálogo de livros disponíveis</p>
                </div>
                <div className="w-full md:w-auto flex justify-center md:justify-end">
                    <button
                        onClick={() => navigate("/cadastro/livro")}
                        className="w-full md:w-auto bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 font-semibold text-base md:text-lg mb-2"
                    >
                        <i className="pi pi-plus-circle"></i>
                        Novo Livro
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto mb-6 px-4">
                <div className="relative group">
                    <i className="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-slate-700 transition-colors"></i>
                    <input 
                        type="text" 
                        name="busca-livro" 
                        id="busca-livro" 
                        placeholder="Buscar por título, autor, editora ou ISBN..." 
                        className="w-full pl-12 pr-4 py-3 md:py-4 border-2 border-transparent bg-white rounded-xl shadow-sm focus:border-slate-700 focus:ring-0 transition-all outline-none text-slate-700" 
                    />
                </div>
            </div>

            <div className="overflow-auto rounded-lg shadow-md max-w-[100rem] mx-auto bg-white mb-4">
                <table className="w-full min-w-full md:min-w-[50rem] border-collapse bg-white">
                    <thead className="bg-slate-700 sticky top-0">
                        <tr>
                            <th className="bg-slate-700 text-white p-3 text-left font-semibold">Título</th>
                            <th className="hidden md:table-cell bg-slate-700 text-white p-3 text-left font-semibold">Autor</th>
                            <th className="hidden lg:table-cell bg-slate-700 text-white p-3 text-left font-semibold">Editora</th>
                            <th className="hidden xl:table-cell bg-slate-700 text-white p-3 text-left font-semibold">Ano de Publicação</th>
                            <th className="hidden md:table-cell bg-slate-700 text-white p-3 text-left font-semibold">ISBN</th>
                            <th className="hidden lg:table-cell bg-slate-700 text-white p-3 text-left font-semibold">Qtd. Total</th>
                            <th className="hidden xl:table-cell bg-slate-700 text-white p-3 text-left font-semibold">Qtd. Disponível</th>
                            <th className="hidden lg:table-cell bg-slate-700 text-white p-3 text-left font-semibold">Valor de Aquisição</th>
                            <th className="bg-slate-700 text-white p-3 text-center font-semibold">Ações</th>
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
                                    <td className="p-3 text-gray-700 font-bold md:font-medium">{livro.titulo}</td>
                                    <td className="hidden md:table-cell p-3 text-gray-700">{livro.autor}</td>
                                    <td className="hidden lg:table-cell p-3 text-gray-700">{livro.editora}</td>
                                    <td className="hidden xl:table-cell p-3 text-gray-700">{livro.ano_publicacao}</td>
                                    <td className="hidden md:table-cell p-3 text-gray-700">{livro.isbn}</td>
                                    <td className="hidden lg:table-cell p-3 text-gray-700">{livro.quant_total}</td>
                                    <td className="hidden xl:table-cell p-3 text-gray-700">{livro.quant_disponivel}</td>
                                    <td className="hidden lg:table-cell p-3 text-gray-700">{livro.valor_aquisicao}</td>
                                    <td className="p-3">
                                        <div className="flex flex-wrap justify-center gap-2">
                                            <button
                                                onClick={() => navigate(`/livro/detalhes/${livro.id_livro}`)}
                                                className="flex-1 md:flex-none bg-sky-500 hover:bg-sky-600 text-white px-3 py-2 rounded-md shadow-sm transition-colors text-xs font-semibold flex items-center justify-center gap-1"
                                                title="Visualizar Detalhes"
                                            >
                                                <i className="pi pi-eye"></i>
                                                <span className="hidden lg:inline">Detalhes</span>
                                            </button>
                                            <button
                                                onClick={() => navigate(`/atualizar/livro/${livro.id_livro}`)}
                                                className="flex-1 md:flex-none bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md shadow-sm transition-colors text-xs font-semibold flex items-center justify-center gap-1"
                                                title="Atualizar Livro"
                                            >
                                                <i className="pi pi-pencil"></i>
                                                <span className="hidden lg:inline">Atualizar</span>
                                            </button>
                                            <button
                                                onClick={() => handleRemoverLivro(livro.id_livro!, livro.titulo)}
                                                className="flex-1 md:flex-none bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md shadow-sm transition-colors text-xs font-semibold flex items-center justify-center gap-1"
                                                title="Remover Livro"
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
                        {livros.length === 0 ? 0 : inicio + 1}–{Math.min(inicio + REGISTROS_POR_PAGINA, livros.length)}
                    </span>{" "}
                    de <span className="font-semibold text-slate-700">{livros.length}</span> livros
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

export default ListagemLivro;