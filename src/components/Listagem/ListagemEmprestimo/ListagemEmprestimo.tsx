import { type JSX } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type EmprestimoDTO from "../../../dto/EmprestimoDTO";
import EmprestimoRequests from "../../../fetch/EmprestimoRequests";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Utilitario from "../../../utils/Utilitario";

function ListagemEmprestimo(): JSX.Element {
    const [emprestimos, setEmprestimos] = useState<EmprestimoDTO[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmprestimos = async () => {
            try {
                const listaDeEmprestimos = await EmprestimoRequests.obterListaDeEmprestimos();
                setEmprestimos(Array.isArray(listaDeEmprestimos) ? listaDeEmprestimos : []);
            } catch (error) {
                console.error(`Erro ao buscar empréstimos. ${error}`);
                alert("Erro ao criar listagem de empréstimos.");
            }
        }

        fetchEmprestimos();
    }, []);

    const handleRemoverEmprestimo = async (id_emprestimo: number) => {
        if (window.confirm(`Tem certeza que deseja remover o empréstimo de ID "${id_emprestimo}"?`)) {
            const sucesso = await EmprestimoRequests.removerEmprestimo(id_emprestimo);
            if (sucesso) {
                alert("Empréstimo removido com sucesso!");
                setEmprestimos(prev => prev.filter(emprestimo => emprestimo.id_emprestimo !== id_emprestimo));
            } else {
                alert("Não foi possível remover o empréstimo.");
            }
        }
    };

    return (
        <main className="bg-gray-200 h-[76vh]">
            <div className="max-w-[100rem] mx-auto grid grid-cols-3 items-end pt-[1.5rem] px-4 mb-4">
                <div /> {/* Spacer para centralizar o título */}
                <div className="text-center">
                    <h1 className="text-[3rem]">Empréstimos</h1>
                    <p className="text-[1.75rem] text-gray-600">Lista de empréstimos registrados</p>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={() => navigate("/cadastro/emprestimo")}
                        className="bg-slate-700 hover:bg-slate-800 text-white px-8 py-3 rounded-lg shadow-lg transition-all flex items-center gap-2 font-semibold text-lg mb-2"
                    >
                        <i className="pi pi-plus-circle"></i>
                        Novo Empréstimo
                    </button>
                </div>
            </div>

            <div className="overflow-auto h-[60vh]">
                <DataTable
                    value={emprestimos}
                    paginator
                    rows={7}
                    rowsPerPageOptions={[7, 14, 28, 56]}
                    tableStyle={{ minWidth: '60rem' }}
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
                    {/* Coluna Aluno - Apenas o Nome */}
                    <Column
                        header="Aluno"
                        body={(rowData: EmprestimoDTO) => rowData.aluno.nome}
                        style={{ width: '15%' }}
                        pt={{
                            headerCell: { className: "bg-slate-700 text-white p-3 text-left font-semibold" },
                            bodyCell: { className: "p-3 text-gray-700 font-medium" }
                        }}
                    />

                    {/* Coluna Livro - Apenas o Título */}
                    <Column
                        header="Livro"
                        body={(rowData: EmprestimoDTO) => rowData.livro.titulo}
                        style={{ width: '20%' }}
                        pt={{
                            headerCell: { className: "bg-slate-700 text-white p-3 text-left font-semibold" },
                            bodyCell: { className: "p-3 text-gray-700" }
                        }}
                    />

                    <Column
                        header="Data Empréstimo"
                        body={(rowData: EmprestimoDTO) => Utilitario.formatarData(rowData.data_emprestimo)}
                        style={{ width: '12%' }}
                        pt={{
                            headerCell: { className: "bg-slate-700 text-white p-3 text-left font-semibold" },
                            bodyCell: { className: "p-3 text-gray-700" }
                        }}
                    />

                    <Column
                        header="Data Devolução"
                        body={(rowData: EmprestimoDTO) => Utilitario.formatarData(rowData.data_devolucao ?? '')}
                        style={{ width: '12%' }}
                        pt={{
                            headerCell: { className: "bg-slate-700 text-white p-3 text-left font-semibold" },
                            bodyCell: { className: "p-3 text-gray-700" }
                        }}
                    />

                    <Column
                        field="status_emprestimo"
                        header="Status"
                        style={{ width: '12%' }}
                        pt={{
                            headerCell: { className: "bg-slate-700 text-white p-3 text-left font-semibold" },
                            bodyCell: { className: "p-3 text-gray-700 text-center" }
                        }}
                    />

                    {/* Coluna de Valor do Livro (usando sua função de utilitário) */}
                    <Column
                        header="Vlr. Livro"
                        body={(rowData: EmprestimoDTO) => Utilitario.formatarParaReal(rowData.livro.valor_aquisicao ?? 0)}
                        style={{ width: '10%' }}
                        pt={{
                            headerCell: { className: "bg-slate-700 text-white p-3 text-left font-semibold" },
                            bodyCell: { className: "p-3 text-gray-700" }
                        }}
                    />
                    <Column header="Ações" style={{ width: '15%' }}
                        body={(emprestimo: EmprestimoDTO) => (
                            <div className="flex gap-2">
                                <button
                                    onClick={() => navigate(`/atualizar/emprestimo/${emprestimo.id_emprestimo}`)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow-sm transition-colors text-sm font-medium"
                                >
                                    Atualizar
                                </button>
                                <button 
                                    onClick={() => handleRemoverEmprestimo(emprestimo.id_emprestimo)}
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

export default ListagemEmprestimo;