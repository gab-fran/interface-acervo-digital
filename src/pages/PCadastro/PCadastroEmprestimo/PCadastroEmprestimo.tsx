import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import FormEmprestimo from "../../../components/Formularios/FormEmprestimo/FormEmprestimo";

function PCadastroEmprestimo(): JSX.Element {
    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />
            <FormEmprestimo />
            <Rodape />
        </div>
    );
}

export default PCadastroEmprestimo;