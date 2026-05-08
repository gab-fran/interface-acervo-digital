import { type JSX } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type AlunoDTO from "../../../dto/AlunoDTO";
import AlunoRequests from "../../../fetch/AlunoRequests";
import Utilitario from "../../../utils/Utilitario";

const REGISTROS_POR_PAGINA = 10;

function ListagemAluno(): JSX.Element {
    const [alunos, setAlunos] = useState<AlunoDTO[]>([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAlunos = async () => {
            try {
                const listaDeAlunos = await AlunoRequests.obterListaDeAlunos();
                setAlunos(Array.isArray(listaDeAlunos) ? listaDeAlunos : []);
            } catch (error) {
                console.error(`Erro ao buscar alunos. ${error}`);
                alert("Erro ao criar listagem de alunos");
            }
        };

        fetchAlunos();
    }, []);

    const handleRemoverAluno = async (id_aluno: number, nome: string) => {
        if (window.confirm(`Tem certeza que deseja remover o aluno "${nome}"?`)) {
            const sucesso = await AlunoRequests.removerAluno(id_aluno);
            if (sucesso) {
                alert("Aluno removido com sucesso!");
                const novoTotal = alunos.length - 1;
                const novaTotalPaginas = Math.ceil(novoTotal / REGISTROS_POR_PAGINA);
                if (paginaAtual > novaTotalPaginas && novaTotalPaginas > 0) {
                    setPaginaAtual(novaTotalPaginas);
                }
                setAlunos(prev => prev.filter(aluno => aluno.id_aluno !== id_aluno));
            } else {
                alert("Não foi possível remover o aluno.");
            }
        }
    };

    // Cálculos de paginação
    const totalPaginas = Math.max(1, Math.ceil(alunos.length / REGISTROS_POR_PAGINA));
    const inicio = (paginaAtual - 1) * REGISTROS_POR_PAGINA;
    const alunosDaPagina = alunos.slice(inicio, inicio + REGISTROS_POR_PAGINA);

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
                <div className="hidden md:block w-1/4" /> {/* Spacer para ajudar no alinhamento se necessário, ou apenas ocultar */}
                <div className="text-center flex-1">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-800">Alunos</h1>
                    <p className="text-lg md:text-xl text-gray-600">Lista de alunos cadastrados</p>
                </div>
                <div className="w-full md:w-auto flex justify-center md:justify-end">
                    <button
                        onClick={() => navigate("/cadastro/aluno")}
                        className="w-full md:w-auto bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 font-semibold text-base md:text-lg mb-2"
                    >
                        <i className="pi pi-plus-circle"></i>
                        Novo Aluno
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto mb-6 px-4">
                <div className="relative group">
                    <i className="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-slate-700 transition-colors"></i>
                    <input 
                        type="text" 
                        name="busca-aluno" 
                        id="busca-aluno" 
                        placeholder="Buscar por nome, email ou RA..." 
                        className="w-full pl-12 pr-4 py-3 md:py-4 border-2 border-transparent bg-white rounded-xl shadow-sm focus:border-slate-700 focus:ring-0 transition-all outline-none text-slate-700" 
                    />
                </div>
            </div>

            <div className="overflow-auto rounded-lg shadow-md max-w-[100rem] mx-auto bg-white mb-4">
                <table className="w-full min-w-full md:min-w-[50rem] border-collapse bg-white">
                    <thead className="bg-slate-700 sticky top-0">
                        <tr>
                            <th className="bg-slate-700 text-white p-3 text-left font-semibold">Nome</th>
                            <th className="hidden md:table-cell bg-slate-700 text-white p-3 text-left font-semibold">Email</th>
                            <th className="hidden lg:table-cell bg-slate-700 text-white p-3 text-left font-semibold">Endereço</th>
                            <th className="hidden xl:table-cell bg-slate-700 text-white p-3 text-left font-semibold">Nascimento</th>
                            <th className="hidden md:table-cell bg-slate-700 text-white p-3 text-left font-semibold">RA</th>
                            <th className="hidden lg:table-cell bg-slate-700 text-white p-3 text-left font-semibold">Celular</th>
                            <th className="bg-slate-700 text-white p-3 text-center font-semibold">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {alunosDaPagina.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="p-6 text-center text-gray-400">
                                    Nenhum aluno encontrado.
                                </td>
                            </tr>
                        ) : (
                            alunosDaPagina.map((aluno) => (
                                <tr
                                    key={aluno.id_aluno ?? aluno.ra}
                                    className="hover:bg-blue-50 transition-colors duration-200 even:bg-gray-50"
                                >
                                    <td className="p-3 text-gray-700 font-bold md:font-medium">{aluno.nome} {aluno.sobrenome}</td>
                                    <td className="hidden md:table-cell p-3 text-gray-700">{aluno.email}</td>
                                    <td className="hidden lg:table-cell p-3 text-gray-700">{aluno.endereco}</td>
                                    <td className="hidden xl:table-cell p-3 text-gray-700">{Utilitario.formatarData(aluno.data_nascimento)}</td>
                                    <td className="hidden md:table-cell p-3 text-gray-700">{aluno.ra ?? "-"}</td>
                                    <td className="hidden lg:table-cell p-3 text-gray-700">{aluno.celular ? Utilitario.formatarTelefone(aluno.celular) : "-"}</td>
                                    <td className="p-3">
                                        <div className="flex flex-wrap justify-center gap-2">
                                            <button
                                                onClick={() => navigate(`/aluno/detalhes/${aluno.id_aluno}`)}
                                                className="flex-1 md:flex-none bg-sky-500 hover:bg-sky-600 text-white px-3 py-2 rounded-md shadow-sm transition-colors text-xs font-semibold flex items-center justify-center gap-1"
                                                title="Visualizar Detalhes"
                                            >
                                                <i className="pi pi-eye"></i>
                                                <span className="hidden lg:inline">Detalhes</span>
                                            </button>
                                            <button
                                                onClick={() => navigate(`/atualizar/aluno/${aluno.id_aluno}`)}
                                                className="flex-1 md:flex-none bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md shadow-sm transition-colors text-xs font-semibold flex items-center justify-center gap-1"
                                                title="Atualizar Aluno"
                                            >
                                                <i className="pi pi-pencil"></i>
                                                <span className="hidden lg:inline">Atualizar</span>
                                            </button>
                                            <button
                                                onClick={() => handleRemoverAluno(aluno.id_aluno!, aluno.nome)}
                                                className="flex-1 md:flex-none bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md shadow-sm transition-colors text-xs font-semibold flex items-center justify-center gap-1"
                                                title="Remover Aluno"
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
                        {alunos.length === 0 ? 0 : inicio + 1}–{Math.min(inicio + REGISTROS_POR_PAGINA, alunos.length)}
                    </span>{" "}
                    de <span className="font-semibold text-slate-700">{alunos.length}</span> alunos
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

export default ListagemAluno;