import type { JSX } from "react";
import Navegacao from "../../components/Navegacao/Navegacao";
import Rodape from "../../components/Rodape/Rodape";

function PEmprestimos(): JSX.Element {
    return (
        <>
            <Navegacao/>
            <p>Emprestimos</p>
            <Rodape />
        </>
    );
}

export default PEmprestimos;