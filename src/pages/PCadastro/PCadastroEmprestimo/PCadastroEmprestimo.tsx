import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import FormEmprestimo from "../../../components/Formularios/FormEmprestimo/FormEmprestimo";

function PCadastroEmprestimo(): JSX.Element {
    return(
        <>
            <Navegacao />
            <FormEmprestimo />
            <Rodape />
        </>
    );
}

export default PCadastroEmprestimo;
