import { type JSX } from "react";
import { useParams } from "react-router-dom";
import Navegacao from "../../components/Navegacao/Navegacao";
import DetalhesAluno from "../../components/Listagem/DetalhesAluno/DetalhesAluno";
import Rodape from "../../components/Rodape/Rodape";

function PDetalhesAluno(): JSX.Element {
    const { id_aluno } = useParams();  // Recebe o ID do registro acessado

    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />
            <DetalhesAluno id_aluno={Number(id_aluno)} />  {/* Envia o ID para o componente */}
            <Rodape />
        </div>
    );
}

export default PDetalhesAluno;