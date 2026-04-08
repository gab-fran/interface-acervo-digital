import type { JSX } from "react";
import Navegacao from "../../components/Navegacao/Navegacao";
import Rodape from "../../components/Rodape/Rodape";

function PAlunos(): JSX.Element {
    return (
        <>
            <Navegacao/>
            <p>Alunos</p>
            <Rodape />
        </>
    );
}

export default PAlunos;