import type { JSX } from "react";
import Navegacao from "../../components/Navegacao/Navegacao";
import Rodape from "../../components/Rodape/Rodape";

function PEmprestimos(): JSX.Element {
    return (
        <div className="pagina">
            <Navegacao/>
            <div className="pagina-conteudo">
                <p>Emprestimos</p>
            </div>
            <Rodape />
        </div>
    );
}

export default PEmprestimos;