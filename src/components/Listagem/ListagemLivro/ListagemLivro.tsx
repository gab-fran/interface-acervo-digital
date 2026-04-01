import { type JSX } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type LivroDTO from "../../../dto/LivroDTO";
import LivroRequests from "../../../fetch/LivroRequests";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Utilitario from "../../../utils/Utilitario";

function ListagemLivro(): JSX.Element {
    const [livros, setLivros] = useState<LivroDTO[]>([]);
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
        }

        fetchLivros();
    }, []);

    const handleRemoverLivro = async (id_livro: number, titulo: string) => {
        if (window.confirm(`Tem certeza que deseja remover o livro "${titulo}"?`)) {
            const sucesso = await LivroRequests.removerLivro(id_livro);
            if (sucesso) {
                alert("Livro removido com sucesso!");
                setLivros(prev => prev.filter(livro => livro.id_livro !== id_livro));
            } else {
                alert("Não foi possível remover o livro.");
            }
        }
    };

    return (
        <main className="bg-gray-200 h-[76vh]">
            <div className="max-w-[100rem] mx-auto grid grid-cols-3 items-end pt-[1.5rem] px-4 mb-4">
                <div /> {/* Spacer para centralizar o título */}
                <div className="text-center">
                    <h1 className="text-[3rem]">Livros</h1>
                    <p className="text-[1.75rem] text-gray-600">Lista de livros</p>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={() => navigate("/cadastro/livro")}
                        className="bg-slate-700 hover:bg-slate-800 text-white px-8 py-3 rounded-lg shadow-lg transition-all flex items-center gap-2 font-semibold text-lg mb-2"
                    >
                        <i className="pi pi-plus-circle"></i>
                        Novo Livro
                    </button>
                </div>
            </div>

            <div className="overflow-auto h-[60vh]">
                <DataTable
                    value={livros}
                    paginator
                    rows={7}
                    rowsPerPageOptions={[7, 14, 28, 56]}
                    tableStyle={{ minWidth: '50rem' }}
                    rowClassName={() => "hover:bg-blue-50 transition-colors duration-200 even:bg-gray-50"}
                    pt={{
                        root: { className: "rounded-lg shadow-md overflow-hidden max-w-[100rem] mx-auto" },
                        thead: { className: "bg-slate-700" },
                        tbody: { className: "divide-y divide-gray-200" },
                        paginator: {
                            root: { className: "bg-white border-t border-gray-200" },
                            pageButton: { className: "px-3 py-1 rounded hover:bg-blue-100 text-blue-600" },
                        }
                    }}
                >
                    <Column field="titulo" header="Título" style={{ width: '20%' }}
                        pt={{
                            headerCell: { className: "bg-slate-700 text-white p-3 text-left font-semibold" },
                            bodyCell: { className: "p-3 text-gray-700 font-medium" }
                        }}
                    />
                    <Column field="autor" header="Autor" style={{ width: '15%' }}
                        pt={{
                            headerCell: { className: "bg-slate-700 text-white p-3 text-left font-semibold" },
                            bodyCell: { className: "p-3 text-gray-700" }
                        }}
                    />
                    <Column field="editora" header="Editora" style={{ width: '15%' }}
                        pt={{
                            headerCell: { className: "bg-slate-700 text-white p-3 text-left font-semibold" },
                            bodyCell: { className: "p-3 text-gray-700" }
                        }}
                    />
                    <Column field="ano_publicacao" header="Ano de Publicação" style={{ width: '10%' }}
                        pt={{
                            headerCell: { className: "bg-slate-700 text-white p-3 text-left font-semibold" },
                            bodyCell: { className: "p-3 text-gray-700" }
                        }}
                    />
                    <Column field="isbn" header="ISBN" style={{ width: '15%' }}
                        pt={{
                            headerCell: { className: "bg-slate-700 text-white p-3 text-left font-semibold" },
                            bodyCell: { className: "p-3 text-gray-700" }
                        }}
                    />
                    <Column field="quant_total" header="Qtd. Total" style={{ width: '8%' }}
                        pt={{
                            headerCell: { className: "bg-slate-700 text-white p-3 text-left font-semibold" },
                            bodyCell: { className: "p-3 text-gray-700 text-center" }
                        }}
                    />
                    <Column field="quant_disponivel" header="Qtd. Disponível" style={{ width: '8%' }}
                        pt={{
                            headerCell: { className: "bg-slate-700 text-white p-3 text-left font-semibold" },
                            bodyCell: { className: "p-3 text-gray-700 text-center" }
                        }}
                    />
                    <Column field="quant_aquisicao" header="Qtd. Aquisição" style={{ width: '8%' }}
                        pt={{
                            headerCell: { className: "bg-slate-700 text-white p-3 text-left font-semibold" },
                            bodyCell: { className: "p-3 text-gray-700 text-center" }
                        }}
                    />
                    <Column field="valor_aquisicao" header="Valor de Aquisição" style={{ width: '10%' }}
                        body={(livro: LivroDTO) => Utilitario.formatarParaReal(livro.valor_aquisicao)}
                        pt={{
                            headerCell: { className: "bg-slate-700 text-white p-3 text-left font-semibold" },
                            bodyCell: { className: "p-3 text-gray-700" }
                        }}
                    />
                    <Column header="Ações" style={{ width: '15%' }}
                        body={(livro: LivroDTO) => (
                            <div className="flex gap-2">
                                <button
                                    onClick={() => navigate(`/atualizar/livro/${livro.id_livro}`)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow-sm transition-colors text-sm font-medium"
                                >
                                    Atualizar
                                </button>
                                <button 
                                    onClick={() => handleRemoverLivro(livro.id_livro!, livro.titulo)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow-sm transition-colors text-sm font-medium"
                                >
                                    Remover
                                </button>
                            </div>
                        )}
                        pt={{
                            headerCell: { className: "bg-slate-700 text-white p-3 text-left font-semibold" },
                            bodyCell: { className: "p-3 text-gray-700" }
                        }}
                    />
                </DataTable>
            </div>
        </main>
    );
}

export default ListagemLivro;