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

            <div className="overflow-auto h-[60vh] rounded-lg shadow-md max-w-[100rem] mx-auto bg-white mb-8">
                {/* Exemplo de código utilizando tags de tabela */}
                <table className="w-full min-w-[50rem] border-collapse bg-white">
                    <thead className="bg-slate-700">
                        <tr>
                            <th className="bg-slate-700 text-white p-3 text-left font-semibold">Nome</th>
                            <th className="bg-slate-700 text-white p-3 text-left font-semibold">Email</th>
                            <th className="bg-slate-700 text-white p-3 text-left font-semibold">Endereço</th>
                            <th className="bg-slate-700 text-white p-3 text-left font-semibold">Nascimento</th>
                            <th className="bg-slate-700 text-white p-3 text-left font-semibold">RA</th>
                            <th className="bg-slate-700 text-white p-3 text-left font-semibold">Celular</th>
                            <th className="bg-slate-700 text-white p-3 text-left font-semibold">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {alunos.map((aluno) => (
                            <tr key={aluno.id_aluno ?? aluno.ra} className="hover:bg-blue-50 transition-colors duration-200 even:bg-gray-50">
                                <td className="p-3 text-gray-700 font-medium">{aluno.nome} {aluno.sobrenome}</td>
                                <td className="p-3 text-gray-700">{aluno.email}</td>
                                <td className="p-3 text-gray-700">{aluno.endereco}</td>
                                <td className="p-3 text-gray-700">{Utilitario.formatarData(aluno.data_nascimento)}</td>
                                <td className="p-3 text-gray-700">{aluno.ra ?? "-"}</td>
                                <td className="p-3 text-gray-700">{aluno.celular ? Utilitario.formatarTelefone(aluno.celular) : "-"}</td>
                                <td className="p-3 text-gray-700">
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </main>
    );
}

export default ListagemAluno;