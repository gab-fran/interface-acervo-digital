import { type JSX } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type AlunoDTO from "../../../dto/AlunoDTO";
import AlunoRequests from "../../../fetch/AlunoRequests";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Utilitario from "../../../utils/Utilitario";

function ListagemAluno(): JSX.Element {
    const [alunos, setAlunos] = useState<AlunoDTO[]>([]);
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
        }

        fetchAlunos();
    }, []);

    const handleRemoverAluno = async (id_aluno: number, nome: string) => {
        if (window.confirm(`Tem certeza que deseja remover o aluno "${nome}"?`)) {
            const sucesso = await AlunoRequests.removerAluno(id_aluno);
            if (sucesso) {
                alert("Aluno removido com sucesso!");
                setAlunos(prev => prev.filter(aluno => aluno.id_aluno !== id_aluno));
            } else {
                alert("Não foi possível remover o aluno.");
            }
        }
    };

    return (
        <main className="bg-gray-200 h-[76vh]">
            <div className="max-w-[100rem] mx-auto grid grid-cols-3 items-end pt-[1.5rem] px-4 mb-4">
                <div /> {/* Spacer para centralizar o título */}
                <div className="text-center">
                    <h1 className="text-[3rem]">Alunos</h1>
                    <p className="text-[1.75rem] text-gray-600">Lista de alunos</p>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={() => navigate("/cadastro/aluno")}
                        className="bg-slate-700 hover:bg-slate-800 text-white px-8 py-3 rounded-lg shadow-lg transition-all flex items-center gap-2 font-semibold text-lg mb-2"
                    >
                        <i className="pi pi-plus-circle"></i>
                        Novo Aluno
                    </button>
                </div>
            </div>

            <div className="overflow-auto h-[60vh]">
                {/* Exemplo de código utilizando tags de tabela */}
                {/* <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border border-gray-400 p-2">Nome</th>
                            <th className="border border-gray-400 p-2">Email</th>
                            <th className="border border-gray-400 p-2">Endereço</th>
                            <th className="border border-gray-400 p-2">Nascimento</th>
                            <th className="border border-gray-400 p-2">RA</th>
                            <th className="border border-gray-400 p-2">Celular</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alunos.map((aluno) => (
                            <tr key={aluno.id_aluno ?? aluno.ra}>
                                <td className="border border-gray-400 p-2">{aluno.nome} {aluno.sobrenome}</td>
                                <td className="border border-gray-400 p-2">{aluno.email}</td>
                                <td className="border border-gray-400 p-2">{aluno.endereco}</td>
                                <td className="border border-gray-400 p-2">{Utilitario.formatarData(aluno.data_nascimento)}</td>
                                <td className="border border-gray-400 p-2">{aluno.ra ?? "-"}</td>
                                <td className="border border-gray-400 p-2">{aluno.celular ? Utilitario.formatarTelefone(aluno.celular) : "-"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table> */}

                {/* Exemplo de código utilizando componente DataTable do PrimeReact */}
                <DataTable
                    value={alunos}
                    paginator
                    rows={7}
                    rowsPerPageOptions={[7, 14, 28, 58]}
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
                    <Column field="id_aluno" header="ID" hidden style={{ width: '5%' }}
                        pt={{
                            headerCell: { className: "bg-slate-700 text-white p-3 text-left font-semibold" },
                            bodyCell: { className: "p-3 text-gray-700" }
                        }}
                    />
                    <Column field="ra" header="RA" style={{ width: '5%' }}
                        pt={{
                            headerCell: { className: "bg-slate-700 text-white p-3 text-left font-semibold" },
                            bodyCell: { className: "p-3 text-gray-700" }
                        }}
                    />
                    <Column field="nome" header="Nome" style={{ width: '15%' }}
                        pt={{
                            headerCell: { className: "bg-slate-700 text-white p-3 text-left font-semibold" },
                            bodyCell: { className: "p-3 text-gray-700 font-medium" }
                        }}
                    />
                    <Column field="sobrenome" header="Sobrenome" style={{ width: '15%' }}
                        pt={{
                            headerCell: { className: "bg-slate-700 text-white p-3 text-left font-semibold" },
                            bodyCell: { className: "p-3 text-gray-700" }
                        }}
                    />
                    <Column field="data_nascimento" header="Data de Nascimento" style={{ width: '15%' }}
                        body={(aluno: AlunoDTO) => Utilitario.formatarData(aluno.data_nascimento)}
                        pt={{
                            headerCell: { className: "bg-slate-700 text-white p-3 text-left font-semibold" },
                            bodyCell: { className: "p-3 text-gray-700" }
                        }}
                    />
                    <Column field="endereco" header="Endereço" style={{ width: '15%' }}
                        pt={{
                            headerCell: { className: "bg-slate-700 text-white p-3 text-left font-semibold" },
                            bodyCell: { className: "p-3 text-gray-700" }
                        }}
                    />
                    <Column field="email" header="E-mail" style={{ width: '15%' }}
                        pt={{
                            headerCell: { className: "bg-slate-700 text-white p-3 text-left font-semibold" },
                            bodyCell: { className: "p-3 text-gray-700" }
                        }}
                    />
                    <Column field="celular" header="Celular" style={{ width: '15%' }}
                        body={(aluno: AlunoDTO) => Utilitario.formatarTelefone(aluno.celular ?? '')}
                        pt={{
                            headerCell: { className: "bg-slate-700 text-white p-3 text-left font-semibold" },
                            bodyCell: { className: "p-3 text-gray-700" }
                        }}
                    />
                    <Column header="Ações" style={{ width: '15%' }}
                        body={(aluno: AlunoDTO) => (
                            <div className="flex gap-2">
                                <button
                                    onClick={() => navigate(`/atualizar/aluno/${aluno.id_aluno}`)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow-sm transition-colors text-sm font-medium"
                                >
                                    Atualizar
                                </button>
                                <button
                                    onClick={() => handleRemoverAluno(aluno.id_aluno!, aluno.nome)}
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

export default ListagemAluno;